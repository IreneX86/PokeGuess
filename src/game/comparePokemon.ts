import type { CategoricalComparison, ComparisonDirection, NumericComparison, PokemonComparison, PokemonGameData, StatKey } from '../types/pokemon'

export const statKeys: StatKey[] = ['hp', 'attack', 'defense', 'specialAttack', 'specialDefense', 'speed']
export function compareNumber(value: number, secret: number): NumericComparison {
  const direction: ComparisonDirection = value === secret ? 'exact' : secret > value ? 'higher' : 'lower'
  return { value, direction }
}
function compareValue<T>(value: T, secret: T): CategoricalComparison<T> { return { value, exact: value === secret } }

export function comparePokemon(guess: PokemonGameData, secret: PokemonGameData): PokemonComparison {
  const secretTypes = new Set(secret.types)
  const secretAbilities = new Set(secret.abilities.map((ability) => ability.id))
  const stats = Object.fromEntries(statKeys.map((key) => [key, compareNumber(guess.stats[key], secret.stats[key])])) as PokemonComparison['stats']
  return {
    pokemonId: guess.id,
    types: guess.types.map((value) => ({ value, exact: secretTypes.has(value) })),
    stats, totalStats: compareNumber(guess.totalStats, secret.totalStats), generation: compareNumber(guess.generation, secret.generation),
    abilities: guess.abilities.map((value) => ({ value, exact: secretAbilities.has(value.id) })),
    evolution: {
      stage: compareNumber(guess.evolution.stage, secret.evolution.stage),
      canEvolve: compareValue(guess.evolution.canEvolve, secret.evolution.canEvolve),
      hasPreEvolution: compareValue(guess.evolution.hasPreEvolution, secret.evolution.hasPreEvolution),
    },
    other: {
      height: compareNumber(guess.height, secret.height), weight: compareNumber(guess.weight, secret.weight),
      isLegendary: compareValue(guess.isLegendary, secret.isLegendary), isMythical: compareValue(guess.isMythical, secret.isMythical), isBaby: compareValue(guess.isBaby, secret.isBaby),
      color: compareValue(guess.color, secret.color), shape: compareValue(guess.shape, secret.shape), habitat: compareValue(guess.habitat, secret.habitat),
    },
  }
}
export function directionSymbol(direction: ComparisonDirection): string { return direction === 'higher' ? '↑' : direction === 'lower' ? '↓' : '✓' }
