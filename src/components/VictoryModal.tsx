import type { Language, PokemonGameData } from '../types/pokemon'
import type { Messages } from '../i18n'
import { localName } from '../i18n'

interface ResultModalProps { pokemon: PokemonGameData; guesses: number; won: boolean; language: Language; messages: Messages; onPlayAgain: () => void }
export function VictoryModal({ pokemon, guesses, won, language, messages, onPlayAgain }: ResultModalProps) {
  return (
    <div className="modal-backdrop"><section className={`victory-card ${won ? '' : 'lost'}`} role="dialog" aria-modal="true" aria-labelledby="result-title">
      <div className="victory-rays" aria-hidden="true" /><div className="victory-content">
        <span className="eyebrow">{won ? messages.mysterySolved : messages.roundOver}</span>
        <h2 id="result-title">{won ? messages.found : messages.answerWas}<br /><strong>{localName(pokemon.names, language)}!</strong></h2>
        <div className="artwork-wrap"><span className="artwork-glow" /><img src={pokemon.artwork} alt={localName(pokemon.names, language)} /></div>
        <p className="guess-count"><b>{guesses}</b> {guesses === 1 ? messages.guess : messages.guessesWord}</p>
        <button className="primary-button" onClick={onPlayAgain} autoFocus><span className="mini-ball" aria-hidden="true" /> {messages.playAgain}</button>
      </div>
    </section></div>
  )
}
