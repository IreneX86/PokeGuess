import type { Language } from '../../types/pokemon'
import type { PokedexEntry } from '../../types/pokedex'
import { localName } from '../../i18n'
import { TypeBadge } from './TypeBadge'

export function PokedexCard({ entry, language, onSelect }: { entry: PokedexEntry; language: Language; onSelect: () => void }) {
  const name = localName(entry.names, language)
  return (
    <button className="pokedex-card" onClick={onSelect} aria-label={`${name}, #${String(entry.id).padStart(4, '0')}`}>
      <span className="pokedex-number">#{String(entry.id).padStart(4, '0')}</span>
      <img src={entry.sprite} alt="" loading="lazy" />
      <strong>{name}</strong>
      {language === 'zh' && <small>{entry.names.en}</small>}
      <span className="pokedex-card-types">{entry.types.map((type) => <TypeBadge key={type} type={type} language={language} />)}</span>
    </button>
  )
}
