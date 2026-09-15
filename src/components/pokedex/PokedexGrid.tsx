import type { Language } from '../../types/pokemon'
import type { PokedexEntry } from '../../types/pokedex'
import type { Messages } from '../../i18n'
import { PokedexCard } from './PokedexCard'

export function PokedexGrid({ entries, language, messages, onSelect }: { entries: PokedexEntry[]; language: Language; messages: Messages; onSelect: (entry: PokedexEntry) => void }) {
  if (!entries.length) return <div className="pokedex-empty"><span>⌕</span><p>{messages.pokedexEmpty}</p></div>
  return <div className="pokedex-grid">{entries.map((entry) => <PokedexCard key={entry.id} entry={entry} language={language} onSelect={() => onSelect(entry)} />)}</div>
}
