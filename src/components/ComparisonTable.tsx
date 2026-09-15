import type { CategoricalComparison, ComparisonDirection, GuessResult, Language, NumericComparison, StatKey } from '../types/pokemon'
import type { Messages } from '../i18n'
import { generationLabel, localName, translatedCategory, translatedType } from '../i18n'
import { directionSymbol, statKeys } from '../game/comparePokemon'

function Direction({ direction, messages }: { direction: ComparisonDirection; messages: Messages }) {
  const label = direction === 'exact' ? messages.exactLabel : direction === 'higher' ? messages.secretHigher : messages.secretLower
  return <b className="direction" aria-label={label}>{directionSymbol(direction)}</b>
}
function NumericChip({ label, comparison, messages, display }: { label: string; comparison: NumericComparison; messages: Messages; display?: string }) {
  return <span className={`clue-chip numeric ${comparison.direction}`}><small>{label}</small><span>{display ?? comparison.value}</span><Direction direction={comparison.direction} messages={messages} /></span>
}
function CategoryChip({ label, comparison, messages, display }: { label: string; comparison: CategoricalComparison<unknown>; messages: Messages; display?: string }) {
  const value = typeof comparison.value === 'boolean' ? (comparison.value ? messages.yes : messages.no) : String(comparison.value ?? '—')
  return <span className={`clue-chip categorical ${comparison.exact ? 'exact' : 'wrong'}`}><small>{label}</small><span>{display ?? value}</span><b>{comparison.exact ? '✓' : '✕'}</b></span>
}
function Category({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return <section className={`guess-category ${className}`}><h3>{title}</h3><div className="clue-grid">{children}</div></section>
}

function GuessCard({ result, language, messages }: { result: GuessResult; language: Language; messages: Messages }) {
  const { pokemon, comparison } = result
  const statLabels: Record<StatKey, string> = {
    hp: messages.hp, attack: messages.attack, defense: messages.defense,
    specialAttack: messages.specialAttack, specialDefense: messages.specialDefense, speed: messages.speed,
  }
  return (
    <article className="guess-card">
      <section className="pokemon-profile">
        <span className="card-number">#{String(pokemon.id).padStart(4, '0')}</span>
        <img src={pokemon.artwork} alt={localName(pokemon.names, language)} />
        <h3>{localName(pokemon.names, language)}</h3>
        <small>{language === 'zh' ? pokemon.names.en : pokemon.names.zh}</small>
      </section>
      <Category title={messages.types} className="types-category">
        {comparison.types.map((item) => <CategoryChip key={item.value} label="" comparison={item} messages={messages} display={translatedType(item.value, language)} />)}
      </Category>
      <Category title={messages.stats} className="stats-category">
        <NumericChip label={messages.total} comparison={comparison.totalStats} messages={messages} />
        {statKeys.map((key) => <NumericChip key={key} label={statLabels[key]} comparison={comparison.stats[key]} messages={messages} />)}
      </Category>
      <Category title={messages.generation}>
        <NumericChip label="" comparison={comparison.generation} messages={messages} display={generationLabel(pokemon.generation, language)} />
      </Category>
      <Category title={messages.abilities} className="abilities-category">
        {comparison.abilities.map(({ value, exact }) => <CategoryChip key={value.id} label={value.isHidden ? messages.hidden : ''}
          comparison={{ value, exact }} messages={messages} display={localName(value.names, language)} />)}
      </Category>
      <Category title={messages.evolution}>
        <NumericChip label={messages.stage} comparison={comparison.evolution.stage} messages={messages} />
        <CategoryChip label={messages.canEvolve} comparison={comparison.evolution.canEvolve} messages={messages} />
        <CategoryChip label={messages.hasPreEvolution} comparison={comparison.evolution.hasPreEvolution} messages={messages} />
      </Category>
      <Category title={messages.other} className="other-category">
        <NumericChip label={messages.height} comparison={comparison.other.height} messages={messages} display={`${(pokemon.height / 10).toFixed(1)} m`} />
        <NumericChip label={messages.weight} comparison={comparison.other.weight} messages={messages} display={`${(pokemon.weight / 10).toFixed(1)} kg`} />
        <CategoryChip label={messages.legendary} comparison={comparison.other.isLegendary} messages={messages} />
        <CategoryChip label={messages.mythical} comparison={comparison.other.isMythical} messages={messages} />
        <CategoryChip label={messages.baby} comparison={comparison.other.isBaby} messages={messages} />
        <CategoryChip label={messages.color} comparison={comparison.other.color} messages={messages} display={translatedCategory(pokemon.color, language)} />
        {pokemon.shape && <CategoryChip label={messages.shape} comparison={comparison.other.shape} messages={messages} display={translatedCategory(pokemon.shape, language)} />}
        {pokemon.habitat && <CategoryChip label={messages.habitat} comparison={comparison.other.habitat} messages={messages} display={translatedCategory(pokemon.habitat, language)} />}
      </Category>
    </article>
  )
}

export function ComparisonTable({ guesses, language, messages }: { guesses: GuessResult[]; language: Language; messages: Messages }) {
  if (!guesses.length) return <section className="empty-state"><div className="empty-pokeball" aria-hidden="true"><span /></div><h2>{messages.emptyTitle}</h2><p>{messages.emptyText}</p></section>
  return (
    <section className="history" aria-labelledby="history-title">
      <div className="history-heading"><div><span className="eyebrow">{messages.log}</span><h2 id="history-title">{messages.history}</h2></div>
        <div className="legend"><span><i className="legend-dot exact" /> {messages.match}</span><span><i className="legend-dot wrong" /> {messages.noMatch}</span><span><b>↑</b> {messages.higher}</span><span><b>↓</b> {messages.lower}</span></div>
      </div>
      <div className="guess-list">{guesses.map((result) => <GuessCard key={result.pokemon.id} result={result} language={language} messages={messages} />)}</div>
    </section>
  )
}
