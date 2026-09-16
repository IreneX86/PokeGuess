import { useEffect, useMemo, useRef, useState } from 'react'
import type { Language, PokemonListItem } from '../types/pokemon'
import type { Messages } from '../i18n'
import { localName, secondaryName } from '../i18n'

interface SearchBoxProps {
  pokemon: PokemonListItem[]; guessedIds: Set<number>; disabled: boolean; isSubmitting: boolean
  language: Language; messages: Messages; onGuess: (identifier: string) => void
}

export function SearchBox({ pokemon, guessedIds, disabled, isSubmitting, language, messages, onGuess }: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const suggestions = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return []
    return pokemon.filter((item) => !guessedIds.has(item.id) && item.searchTerms.some((term) => term.includes(normalized)))
      .sort((a, b) => {
        const aStarts = a.searchTerms.some((term) => term.startsWith(normalized)) ? 0 : 1
        const bStarts = b.searchTerms.some((term) => term.startsWith(normalized)) ? 0 : 1
        return aStarts - bStarts || a.id - b.id
      }).slice(0, 7)
  }, [pokemon, query, guessedIds])

  useEffect(() => {
    const close = (event: MouseEvent) => { if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const select = (item: PokemonListItem) => { setQuery(''); setOpen(false); onGuess(item.identifier) }
  return (
    <div className="search-wrap" ref={wrapperRef}>
      <div className={`search-box ${open && suggestions.length ? 'is-open' : ''}`}>
        <span className="search-icon" aria-hidden="true" />
        <input aria-label={messages.search} aria-autocomplete="list" aria-controls="pokemon-suggestions" autoComplete="off" disabled={disabled}
          placeholder={disabled ? messages.loadingSearch : messages.search} value={query}
          onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); setOpen(true) }} onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (!suggestions.length) return
            if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((index) => (index + 1) % suggestions.length) }
            else if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((index) => (index - 1 + suggestions.length) % suggestions.length) }
            else if (event.key === 'Enter') { event.preventDefault(); select(suggestions[activeIndex]) }
            else if (event.key === 'Escape') setOpen(false)
          }} />
        {isSubmitting && <span className="spinner small" aria-label={messages.loading} />}
      </div>
      {open && query && (
        <ul className="suggestions" id="pokemon-suggestions" role="listbox">
          {suggestions.length ? suggestions.map((item, index) => (
            <li key={item.id}><button className={index === activeIndex ? 'active' : ''} onMouseDown={(event) => event.preventDefault()}
              onClick={() => select(item)} role="option" aria-selected={index === activeIndex}>
              <img src={item.sprite} alt="" /><span>{localName(item.names, language)}<em>{secondaryName(item.names, language)}</em></span>
              <small>#{String(item.id).padStart(4, '0')}</small>
            </button></li>
          )) : <li className="no-results">{messages.noResults}</li>}
        </ul>
      )}
    </div>
  )
}
