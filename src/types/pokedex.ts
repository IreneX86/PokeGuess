import type { LocalizedText } from './pokemon'

export interface PokedexEntry {
  id: number
  identifier: string
  names: LocalizedText
  sprite: string
  searchTerms: string[]
  types: string[]
  generation: number
  isLegendary: boolean
  isMythical: boolean
  isBaby: boolean
}

export type PokedexTypeCount = 'single' | 'dual' | null

export interface PokedexFilters {
  query: string
  generations: number[]
  types: string[]
  isLegendary: boolean
  isMythical: boolean
  isBaby: boolean
  typeCount: PokedexTypeCount
}

export const emptyPokedexFilters: PokedexFilters = {
  query: '',
  generations: [],
  types: [],
  isLegendary: false,
  isMythical: false,
  isBaby: false,
  typeCount: null,
}
