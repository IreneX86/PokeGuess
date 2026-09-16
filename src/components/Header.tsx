import type { Language } from '../types/pokemon'
import type { Messages } from '../i18n'

interface HeaderProps { language: Language; messages: Messages; guesses: number; maxGuesses: number; streak: number; onToggleLanguage: () => void; onOpenPokedex: () => void }

export function Header({ language, messages, guesses, maxGuesses, streak, onToggleLanguage, onOpenPokedex }: HeaderProps) {
  return (
    <header className="hero">
      <button className="pokedex-open" onClick={onOpenPokedex}>📖 {messages.openPokedex}</button>
      <button className="language-toggle" onClick={onToggleLanguage} aria-label={messages.switchLanguage}>
        <span className={language === 'en' ? 'active' : ''}>English</span><i />
        <span className={language === 'zh' ? 'active' : ''}>中文</span><i />
        <span className={language === 'ja' ? 'active' : ''}>日本語</span>
      </button>
      <div className="brand" aria-label="PokéGuess"><span>Poké</span><span>Guess</span></div>
      <p className="tagline">{messages.tagline}</p>
      <div className="round-stats">
        <span><small>{messages.guesses}</small><strong>{guesses} / {maxGuesses}</strong></span>
        <span title={messages.streakHint}><small>{messages.streak}</small><strong>🔥 {streak}</strong></span>
      </div>
      <div className="hero-divider" aria-hidden="true"><span /></div>
    </header>
  )
}
