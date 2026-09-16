import { useEffect, useMemo, useRef, useState } from 'react'
import type { Language } from '../../types/pokemon'
import type { PokedexEntry, PokedexFilters as FilterState } from '../../types/pokedex'
import type { Messages } from '../../i18n'
import { emptyPokedexFilters } from '../../types/pokedex'
import { filterPokedex, hasActivePokedexFilters } from '../../game/filterPokedex'
import { getPokedexEntries } from '../../services/pokedexService'
import { PokedexFilters } from './PokedexFilters'
import { PokedexGrid } from './PokedexGrid'
import { PokemonDetail } from './PokemonDetail'

interface Props {
  open: boolean
  language: Language
  messages: Messages
  canGuess: boolean
  guessedIds: Set<number>
  onClose: () => void
  onToggleLanguage: () => void
  onUseAsGuess: (identifier: string) => void
}

export function PokedexDrawer({ open, language, messages, canGuess, guessedIds, onClose, onToggleLanguage, onUseAsGuess }: Props) {
  const [entries, setEntries] = useState<PokedexEntry[]>([])
  const [filters, setFilters] = useState<FilterState>(emptyPokedexFilters)
  const [selected, setSelected] = useState<PokedexEntry | null>(null)
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [retryKey, setRetryKey] = useState(0)
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open || entries.length) return
    let cancelled = false
    getPokedexEntries().then((data) => { if (!cancelled) { setEntries(data); setFailed(false) } })
      .catch(() => { if (!cancelled) setFailed(true) })
    return () => { cancelled = true }
  }, [open, entries.length, retryKey])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    requestAnimationFrame(() => closeButton.current?.focus())
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', handleKey) }
  }, [open, onClose])

  const filtered = useMemo(() => filterPokedex(entries, filters), [entries, filters])
  const hasActive = hasActivePokedexFilters(filters)
  const reset = () => setFilters(emptyPokedexFilters)
  const retry = () => { setFailed(false); setRetryKey((key) => key + 1) }

  return (
    <div className={`pokedex-layer ${open ? 'open' : ''}`} aria-hidden={!open}>
      <button className="drawer-backdrop" aria-label={messages.closePokedex} tabIndex={open ? 0 : -1} onClick={onClose} />
      <aside className="pokedex-drawer" role="dialog" aria-modal="true" aria-labelledby="pokedex-title">
        <header className="pokedex-header">
          <div><span className="eyebrow">PokéGuess</span><h2 id="pokedex-title">📖 {messages.pokedexTitle}</h2><p>{messages.pokedexSubtitle}</p></div>
          <div className="drawer-header-actions">
            <button className="drawer-language" onClick={onToggleLanguage} aria-label={messages.switchLanguage}>{messages.language}</button>
            <button ref={closeButton} className="drawer-close" onClick={onClose} aria-label={messages.closePokedex}>×</button>
          </div>
        </header>
        {selected ? <PokemonDetail key={selected.id} entry={selected} language={language} messages={messages}
          canGuess={canGuess} alreadyGuessed={guessedIds.has(selected.id)} onBack={() => setSelected(null)}
          onUseAsGuess={(identifier) => { onUseAsGuess(identifier); onClose() }} /> : <>
          <div className="pokedex-tools">
            <label className="pokedex-search"><span className="search-icon" aria-hidden="true" /><input value={filters.query} onChange={(event) => setFilters({ ...filters, query: event.target.value })} placeholder={messages.pokedexSearch} aria-label={messages.pokedexSearch} /></label>
            <PokedexFilters filters={filters} language={language} messages={messages} expanded={filtersExpanded}
              onExpandedChange={() => setFiltersExpanded((value) => !value)} onChange={setFilters} onReset={reset} hasActive={hasActive} />
            <div className="pokedex-result-count"><strong>{filtered.length}</strong> {messages.pokemonFound}{hasActive && <button onClick={reset}>× {messages.resetFilters}</button>}</div>
          </div>
          <div className="pokedex-scroll">
            {!entries.length && !failed && <div className="drawer-state"><span className="spinner" /><p>{messages.loadingPokedex}</p></div>}
            {failed && <div className="drawer-state error"><p>{messages.pokedexError}</p><button onClick={retry}>{messages.retry}</button></div>}
            {!!entries.length && <PokedexGrid entries={filtered} language={language} messages={messages} onSelect={setSelected} />}
          </div>
        </>}
      </aside>
    </div>
  )
}
