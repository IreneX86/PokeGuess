import type { Language } from '../../types/pokemon'
import type { PokedexFilters as FilterState, PokedexTypeCount } from '../../types/pokedex'
import type { Messages } from '../../i18n'
import { translatedType } from '../../i18n'

const standardTypes = ['normal','fire','water','electric','grass','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy']
const romanGenerations = ['I','II','III','IV','V','VI','VII','VIII','IX']

interface Props { filters: FilterState; language: Language; messages: Messages; expanded: boolean; onExpandedChange: () => void; onChange: (filters: FilterState) => void; onReset: () => void; hasActive: boolean }

export function PokedexFilters({ filters, language, messages, expanded, onExpandedChange, onChange, onReset, hasActive }: Props) {
  const toggleGeneration = (generation: number) => onChange({
    ...filters,
    generations: filters.generations.includes(generation)
      ? filters.generations.filter((item) => item !== generation)
      : [...filters.generations, generation],
  })
  const toggleType = (type: string) => onChange({ ...filters, types: filters.types.includes(type) ? filters.types.filter((item) => item !== type) : [...filters.types, type] })
  const setTypeCount = (value: PokedexTypeCount) => onChange({ ...filters, typeCount: filters.typeCount === value ? null : value })
  return (
    <div className="pokedex-filters-wrap">
      <button className="mobile-filter-toggle" onClick={onExpandedChange} aria-expanded={expanded}>☰ {messages.filters}<span>{expanded ? '−' : '+'}</span></button>
      <div className={`pokedex-filters ${expanded ? 'is-open' : ''}`}>
        <section><div className="filter-heading"><span>{messages.generation}</span></div><div className="generation-filters">
          <button className={filters.generations.length === 0 ? 'selected' : ''} aria-pressed={filters.generations.length === 0} onClick={() => onChange({ ...filters, generations: [] })}>{messages.all}</button>
          {romanGenerations.map((roman, index) => {
            const generation = index + 1
            const selected = filters.generations.includes(generation)
            return <button key={roman} className={selected ? 'selected' : ''} aria-pressed={selected} onClick={() => toggleGeneration(generation)}>{roman}</button>
          })}
        </div></section>
        <section><div className="filter-heading"><span>{messages.types}</span></div><div className="type-filters">
          {standardTypes.map((type) => <button key={type} className={`type-filter type-${type} ${filters.types.includes(type) ? 'selected' : ''}`} aria-pressed={filters.types.includes(type)} onClick={() => toggleType(type)}>{translatedType(type, language)}</button>)}
        </div></section>
        <section><div className="filter-heading"><span>{messages.special}</span></div><div className="special-filters">
          <button className={filters.isLegendary ? 'selected' : ''} aria-pressed={filters.isLegendary} onClick={() => onChange({ ...filters, isLegendary: !filters.isLegendary })}>{messages.legendary}</button>
          <button className={filters.isMythical ? 'selected' : ''} aria-pressed={filters.isMythical} onClick={() => onChange({ ...filters, isMythical: !filters.isMythical })}>{messages.mythical}</button>
          <button className={filters.isBaby ? 'selected' : ''} aria-pressed={filters.isBaby} onClick={() => onChange({ ...filters, isBaby: !filters.isBaby })}>{messages.baby}</button>
          <button className={filters.typeCount === 'single' ? 'selected' : ''} aria-pressed={filters.typeCount === 'single'} onClick={() => setTypeCount('single')}>{messages.singleType}</button>
          <button className={filters.typeCount === 'dual' ? 'selected' : ''} aria-pressed={filters.typeCount === 'dual'} onClick={() => setTypeCount('dual')}>{messages.dualType}</button>
        </div></section>
        <button className="reset-filters" onClick={onReset} disabled={!hasActive}>{messages.resetFilters}</button>
      </div>
    </div>
  )
}
