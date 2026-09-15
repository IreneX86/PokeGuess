import type { LocalizedText, PokemonAbility, PokemonGameData, PokemonListItem, PokemonStats } from '../types/pokemon'
import { selectOfficialDescriptions } from './flavorText'
import type { FlavorTextEntry } from './flavorText'

const API_BASE = 'https://pokeapi.co/api/v2'
const POKEMON_COUNT = 1025
const INDEX_CACHE_KEY = 'pokeguess-search-index-v2'
const NAME_CSV = 'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/pokemon_species_names.csv'
const SPRITE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

const detailCache = new Map<string, PokemonGameData>()
const abilityCache = new Map<string, Promise<PokemonAbility['names']>>()
let listPromise: Promise<PokemonListItem[]> | null = null

interface NamedResource { name: string; url: string }
interface LocalizedName { name: string; language: NamedResource }
interface PokemonResponse {
  id: number; name: string; height: number; weight: number; species: NamedResource
  abilities: Array<{ ability: NamedResource; is_hidden: boolean; slot: number }>
  stats: Array<{ base_stat: number; stat: NamedResource }>
  types: Array<{ slot: number; type: NamedResource }>
  sprites: { front_default: string | null; other?: { 'official-artwork'?: { front_default: string | null } } }
}
interface SpeciesResponse {
  name: string; names: LocalizedName[]; generation: NamedResource; evolution_chain: { url: string }
  is_legendary: boolean; is_mythical: boolean; is_baby: boolean
  color: NamedResource; shape: NamedResource | null; habitat: NamedResource | null
  flavor_text_entries: FlavorTextEntry[]
}
interface AbilityResponse { names: LocalizedName[] }
interface EvolutionNode { species: NamedResource; evolves_to: EvolutionNode[] }
interface EvolutionResponse { chain: EvolutionNode }

function idFromUrl(url: string): number { return Number(url.split('/').filter(Boolean).at(-1)) }
async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(response.status === 404 ? 'not-found' : 'api-unavailable')
  return response.json() as Promise<T>
}
function englishFallback(identifier: string): string {
  return identifier.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
}
function localizedNames(names: LocalizedName[], fallback: string): LocalizedText {
  const find = (language: string) => names.find((item) => item.language.name === language)?.name
  return { en: find('en') ?? englishFallback(fallback), zh: find('zh-hans') ?? find('zh-hant') ?? find('en') ?? englishFallback(fallback) }
}
function parseCsvRow(row: string): string[] {
  const fields: string[] = []
  let value = ''
  let quoted = false
  for (let index = 0; index < row.length; index += 1) {
    const character = row[index]
    if (character === '"' && quoted && row[index + 1] === '"') { value += '"'; index += 1 }
    else if (character === '"') quoted = !quoted
    else if (character === ',' && !quoted) { fields.push(value); value = '' }
    else value += character
  }
  fields.push(value)
  return fields
}
async function getBulkNames(): Promise<Map<number, LocalizedText>> {
  const response = await fetch(NAME_CSV)
  if (!response.ok) throw new Error('name-index-unavailable')
  const entries = new Map<number, Partial<LocalizedText>>()
  for (const row of (await response.text()).split(/\r?\n/).slice(1)) {
    if (!row) continue
    const [speciesIdText, languageId, name] = parseCsvRow(row)
    const speciesId = Number(speciesIdText)
    if (speciesId > POKEMON_COUNT || (languageId !== '9' && languageId !== '12')) continue
    const current = entries.get(speciesId) ?? {}
    if (languageId === '9') current.en = name
    if (languageId === '12') current.zh = name
    entries.set(speciesId, current)
  }
  return new Map([...entries].map(([id, names]) => [id, { en: names.en ?? '', zh: names.zh ?? names.en ?? '' }]))
}

export function spriteForId(id: number): string { return `${SPRITE_BASE}/${id}.png` }

export async function getPokemonList(): Promise<PokemonListItem[]> {
  if (listPromise) return listPromise
  listPromise = (async () => {
    try {
      const cached = localStorage.getItem(INDEX_CACHE_KEY)
      if (cached) return JSON.parse(cached) as PokemonListItem[]
    } catch { /* Continue without persistent storage. */ }
    const [data, bulkNames] = await Promise.all([
      fetchJson<{ results: NamedResource[] }>(`${API_BASE}/pokemon?limit=${POKEMON_COUNT}`),
      getBulkNames().catch(() => new Map<number, LocalizedText>()),
    ])
    const list = data.results.map(({ name: identifier, url }) => {
      const id = idFromUrl(url)
      const names = bulkNames.get(id) ?? { en: englishFallback(identifier), zh: englishFallback(identifier) }
      return { id, identifier, names, sprite: spriteForId(id), searchTerms: [identifier, names.en.toLowerCase(), names.zh] }
    })
    try { localStorage.setItem(INDEX_CACHE_KEY, JSON.stringify(list)) } catch { /* Cache is optional. */ }
    return list
  })().catch((error) => { listPromise = null; throw error })
  return listPromise
}

function evolutionFacts(node: EvolutionNode, speciesName: string, stage = 1): PokemonGameData['evolution'] | null {
  if (node.species.name === speciesName) return { stage, canEvolve: node.evolves_to.length > 0, hasPreEvolution: stage > 1 }
  for (const child of node.evolves_to) {
    const found = evolutionFacts(child, speciesName, stage + 1)
    if (found) return found
  }
  return null
}
async function getAbilityNames(resource: NamedResource): Promise<LocalizedText> {
  let promise = abilityCache.get(resource.name)
  if (!promise) {
    promise = fetchJson<AbilityResponse>(resource.url).then((response) => localizedNames(response.names, resource.name))
    abilityCache.set(resource.name, promise)
  }
  return promise
}

export async function getPokemon(identifier: string): Promise<PokemonGameData> {
  const normalized = identifier.toLowerCase()
  const cached = detailCache.get(normalized)
  if (cached) return cached
  const pokemon = await fetchJson<PokemonResponse>(`${API_BASE}/pokemon/${encodeURIComponent(normalized)}`)
  const species = await fetchJson<SpeciesResponse>(pokemon.species.url)
  const [evolution, abilities] = await Promise.all([
    fetchJson<EvolutionResponse>(species.evolution_chain.url),
    Promise.all([...pokemon.abilities].sort((a, b) => a.slot - b.slot).map(async ({ ability, is_hidden }) => ({
      id: ability.name, names: await getAbilityNames(ability), isHidden: is_hidden,
    }))),
  ])
  const stat = (name: string) => pokemon.stats.find((item) => item.stat.name === name)?.base_stat ?? 0
  const stats: PokemonStats = {
    hp: stat('hp'), attack: stat('attack'), defense: stat('defense'),
    specialAttack: stat('special-attack'), specialDefense: stat('special-defense'), speed: stat('speed'),
  }
  const sprite = pokemon.sprites.front_default ?? spriteForId(pokemon.id)
  const result: PokemonGameData = {
    id: pokemon.id, identifier: pokemon.name, names: localizedNames(species.names, pokemon.name), sprite,
    artwork: pokemon.sprites.other?.['official-artwork']?.front_default ?? sprite,
    types: [...pokemon.types].sort((a, b) => a.slot - b.slot).map((item) => item.type.name),
    stats, totalStats: Object.values(stats).reduce<number>((total, value) => total + value, 0), generation: idFromUrl(species.generation.url), abilities,
    evolution: evolutionFacts(evolution.chain, species.name) ?? { stage: 1, canEvolve: false, hasPreEvolution: false },
    height: pokemon.height, weight: pokemon.weight, isLegendary: species.is_legendary, isMythical: species.is_mythical, isBaby: species.is_baby,
    color: species.color.name, shape: species.shape?.name ?? null, habitat: species.habitat?.name ?? null,
    description: selectOfficialDescriptions(species.flavor_text_entries),
  }
  detailCache.set(normalized, result)
  return result
}
