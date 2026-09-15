import { useCallback, useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { SearchBox } from './components/SearchBox'
import { ComparisonTable } from './components/ComparisonTable'
import { VictoryModal } from './components/VictoryModal'
import { getPokemon, getPokemonList } from './services/pokeApi'
import { comparePokemon } from './game/comparePokemon'
import { ui } from './i18n'
import type { GuessResult, Language, PokemonGameData, PokemonListItem } from './types/pokemon'

const MAX_GUESSES = 10
type GameStatus = 'loading' | 'playing' | 'won' | 'lost' | 'error'

function App() {
  const [language, setLanguage] = useState<Language>('en')
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([])
  const [secret, setSecret] = useState<PokemonGameData | null>(null)
  const [guesses, setGuesses] = useState<GuessResult[]>([])
  const [streak, setStreak] = useState(0)
  const [status, setStatus] = useState<GameStatus>('loading')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messages = ui[language]

  const startGame = useCallback(async (knownList?: PokemonListItem[]) => {
    setStatus('loading'); setError(null); setGuesses([]); setSecret(null)
    try {
      const list = knownList?.length ? knownList : await getPokemonList()
      const answer = await getPokemon(list[Math.floor(Math.random() * list.length)].identifier)
      setPokemonList(list); setSecret(answer); setStatus('playing')
    } catch { setError('load'); setStatus('error') }
  }, [])

  useEffect(() => {
    let cancelled = false
    getPokemonList().then(async (list) => ({ list, answer: await getPokemon(list[Math.floor(Math.random() * list.length)].identifier) }))
      .then(({ list, answer }) => { if (!cancelled) { setPokemonList(list); setSecret(answer); setStatus('playing') } })
      .catch(() => { if (!cancelled) { setError('load'); setStatus('error') } })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    document.title = language === 'zh' ? 'PokéGuess · 猜宝可梦' : 'PokéGuess · Pokémon guessing game'
  }, [language])

  const guessedIds = useMemo(() => new Set(guesses.map(({ pokemon }) => pokemon.id)), [guesses])
  const makeGuess = async (identifier: string) => {
    if (!secret || isSubmitting || status !== 'playing') return
    setIsSubmitting(true); setError(null)
    try {
      const pokemon = await getPokemon(identifier)
      if (guessedIds.has(pokemon.id)) return
      const nextGuesses = [{ pokemon, comparison: comparePokemon(pokemon, secret) }, ...guesses]
      setGuesses(nextGuesses)
      if (pokemon.id === secret.id) { setStreak((current) => current + 1); setStatus('won') }
      else if (nextGuesses.length >= MAX_GUESSES) { setStreak(0); setStatus('lost') }
    } catch { setError('guess') }
    finally { setIsSubmitting(false) }
  }

  return (
    <div className="app-shell">
      <Header language={language} messages={messages} guesses={guesses.length} maxGuesses={MAX_GUESSES} streak={streak}
        onToggleLanguage={() => setLanguage((current) => current === 'en' ? 'zh' : 'en')} />
      <main>
        <section className="game-intro"><span className="eyebrow">{messages.newPokemon}</span><h1>{messages.title}</h1><p>{messages.instructions}</p>
          <SearchBox pokemon={pokemonList} guessedIds={guessedIds} disabled={status !== 'playing'} isSubmitting={isSubmitting}
            language={language} messages={messages} onGuess={makeGuess} />
          {status === 'loading' && <div className="status-message"><span className="spinner" /> {messages.loading}</div>}
          {error && <div className="error-message" role="alert"><span>!</span><p>{error === 'guess' ? messages.guessError : messages.loadError}</p>
            {status === 'error' && <button onClick={() => void startGame()}>{messages.retry}</button>}</div>}
        </section>
        <ComparisonTable guesses={guesses} language={language} messages={messages} />
      </main>
      <footer><span className="mini-ball" /> {messages.data}</footer>
      {(status === 'won' || status === 'lost') && secret && <VictoryModal pokemon={secret} guesses={guesses.length} won={status === 'won'} language={language} messages={messages} onPlayAgain={() => void startGame(pokemonList)} />}
    </div>
  )
}
export default App
