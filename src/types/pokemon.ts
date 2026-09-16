export type Language = 'en' | 'zh' | 'ja'

export interface LocalizedText { en: string; zh: string; ja: string }

export interface PokemonListItem {
  id: number
  identifier: string
  names: LocalizedText
  sprite: string
  searchTerms: string[]
}

export type StatKey = 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed'
export type PokemonStats = Record<StatKey, number>

export interface PokemonAbility { id: string; names: LocalizedText; isHidden: boolean }
export interface PokemonEvolution { stage: number; canEvolve: boolean; hasPreEvolution: boolean }
export interface PokemonDescription {
  en: string | null
  zh: string | null
  ja: string | null
  zhUsesEnglishFallback: boolean
  jaUsesEnglishFallback: boolean
}

export interface PokemonGameData {
  id: number
  identifier: string
  names: LocalizedText
  sprite: string
  artwork: string
  types: string[]
  stats: PokemonStats
  totalStats: number
  generation: number
  abilities: PokemonAbility[]
  evolution: PokemonEvolution
  height: number
  weight: number
  isLegendary: boolean
  isMythical: boolean
  isBaby: boolean
  color: string
  shape: string | null
  habitat: string | null
  description: PokemonDescription
}

export type ComparisonDirection = 'exact' | 'higher' | 'lower'
export interface NumericComparison { value: number; direction: ComparisonDirection }
export interface CategoricalComparison<T = string> { value: T; exact: boolean }

export interface PokemonComparison {
  pokemonId: number
  types: Array<CategoricalComparison>
  stats: Record<StatKey, NumericComparison>
  totalStats: NumericComparison
  generation: NumericComparison
  abilities: Array<CategoricalComparison<PokemonAbility>>
  evolution: {
    stage: NumericComparison
    canEvolve: CategoricalComparison<boolean>
    hasPreEvolution: CategoricalComparison<boolean>
  }
  other: {
    height: NumericComparison
    weight: NumericComparison
    isLegendary: CategoricalComparison<boolean>
    isMythical: CategoricalComparison<boolean>
    isBaby: CategoricalComparison<boolean>
    color: CategoricalComparison
    shape: CategoricalComparison<string | null>
    habitat: CategoricalComparison<string | null>
  }
}

export interface GuessResult { pokemon: PokemonGameData; comparison: PokemonComparison }
