import type { PokedexEntry, PokedexFilters } from '../types/pokedex'

export function filterPokedex(entries: PokedexEntry[], filters: PokedexFilters): PokedexEntry[] {
  const query = filters.query.trim().toLowerCase()
  const numericQuery = /^\d+$/.test(query) ? Number(query) : null

  return entries.filter((entry) => {
    const matchesQuery = !query
      || (numericQuery !== null ? entry.id === numericQuery : entry.searchTerms.some((term) => term.includes(query)))
    const matchesGeneration = filters.generations.length === 0 || filters.generations.includes(entry.generation)
    const matchesTypes = filters.types.every((type) => entry.types.includes(type))
    const matchesLegendary = !filters.isLegendary || entry.isLegendary
    const matchesMythical = !filters.isMythical || entry.isMythical
    const matchesBaby = !filters.isBaby || entry.isBaby
    const matchesTypeCount = filters.typeCount === null
      || (filters.typeCount === 'single' ? entry.types.length === 1 : entry.types.length === 2)

    return matchesQuery && matchesGeneration && matchesTypes && matchesLegendary
      && matchesMythical && matchesBaby && matchesTypeCount
  })
}

export function hasActivePokedexFilters(filters: PokedexFilters): boolean {
  return Boolean(
    filters.query.trim() || filters.generations.length || filters.types.length
    || filters.isLegendary || filters.isMythical || filters.isBaby || filters.typeCount,
  )
}
