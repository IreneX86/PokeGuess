import { getPokemonList } from './pokeApi'
import type { PokedexEntry } from '../types/pokedex'

const DATA_BASE = 'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv'
const CACHE_KEY = 'pokeguess-pokedex-index-v1'
const POKEMON_COUNT = 1025

const typeIds: Record<number, string> = {
  1: 'normal', 2: 'fighting', 3: 'flying', 4: 'poison', 5: 'ground', 6: 'rock',
  7: 'bug', 8: 'ghost', 9: 'steel', 10: 'fire', 11: 'water', 12: 'grass',
  13: 'electric', 14: 'psychic', 15: 'ice', 16: 'dragon', 17: 'dark', 18: 'fairy',
}

let entriesPromise: Promise<PokedexEntry[]> | null = null

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

async function fetchCsv(name: string): Promise<{ headers: string[]; rows: string[][] }> {
  const response = await fetch(`${DATA_BASE}/${name}.csv`)
  if (!response.ok) throw new Error('pokedex-unavailable')
  const lines = (await response.text()).split(/\r?\n/).filter(Boolean)
  return { headers: parseCsvRow(lines[0]), rows: lines.slice(1).map(parseCsvRow) }
}

function recordFromRow(headers: string[], row: string[]): Record<string, string> {
  return Object.fromEntries(headers.map((header, index) => [header, row[index] ?? '']))
}

function parseBoolean(value: string): boolean {
  return value === '1' || value.toLowerCase() === 'true'
}

export async function getPokedexEntries(): Promise<PokedexEntry[]> {
  if (entriesPromise) return entriesPromise
  entriesPromise = (async () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (cached) return JSON.parse(cached) as PokedexEntry[]
    } catch { /* Persistent caching is optional. */ }

    const [pokemon, typeData, speciesData] = await Promise.all([
      getPokemonList(), fetchCsv('pokemon_types'), fetchCsv('pokemon_species'),
    ])
    const typesById = new Map<number, string[]>()
    for (const row of typeData.rows) {
      const record = recordFromRow(typeData.headers, row)
      const pokemonId = Number(record.pokemon_id)
      const type = typeIds[Number(record.type_id)]
      if (!type || pokemonId > POKEMON_COUNT) continue
      const types = typesById.get(pokemonId) ?? []
      types[Number(record.slot) - 1] = type
      typesById.set(pokemonId, types)
    }
    const speciesById = new Map<number, Record<string, string>>()
    for (const row of speciesData.rows) {
      const record = recordFromRow(speciesData.headers, row)
      const id = Number(record.id)
      if (id <= POKEMON_COUNT) speciesById.set(id, record)
    }
    const entries = pokemon.map((item): PokedexEntry => {
      const species = speciesById.get(item.id)
      return {
        ...item,
        types: (typesById.get(item.id) ?? []).filter(Boolean),
        generation: Number(species?.generation_id ?? 0),
        isLegendary: parseBoolean(species?.is_legendary ?? ''),
        isMythical: parseBoolean(species?.is_mythical ?? ''),
        isBaby: parseBoolean(species?.is_baby ?? ''),
      }
    }).sort((a, b) => a.id - b.id)
    try { localStorage.setItem(CACHE_KEY, JSON.stringify(entries)) } catch { /* Cache is optional. */ }
    return entries
  })().catch((error) => { entriesPromise = null; throw error })
  return entriesPromise
}
