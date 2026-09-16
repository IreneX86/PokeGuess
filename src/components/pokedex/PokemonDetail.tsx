import { useEffect, useState } from 'react'
import type { Language, PokemonGameData, StatKey } from '../../types/pokemon'
import type { PokedexEntry } from '../../types/pokedex'
import type { Messages } from '../../i18n'
import { generationLabel, localName, secondaryName, translatedCategory } from '../../i18n'
import { getPokemon } from '../../services/pokeApi'
import { statKeys } from '../../game/comparePokemon'
import { TypeBadge } from './TypeBadge'

interface Props { entry: PokedexEntry; language: Language; messages: Messages; canGuess: boolean; alreadyGuessed: boolean; onBack: () => void; onUseAsGuess: (identifier: string) => void }

export function PokemonDetail({ entry, language, messages, canGuess, alreadyGuessed, onBack, onUseAsGuess }: Props) {
  const [pokemon, setPokemon] = useState<PokemonGameData | null>(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    let cancelled = false
    getPokemon(entry.identifier).then((data) => { if (!cancelled) setPokemon(data) }).catch(() => { if (!cancelled) setFailed(true) })
    return () => { cancelled = true }
  }, [entry.identifier])
  const statLabels: Record<StatKey, string> = { hp: messages.hp, attack: messages.attack, defense: messages.defense, specialAttack: messages.specialAttack, specialDefense: messages.specialDefense, speed: messages.speed }
  const descriptionUsesEnglishFallback = pokemon && ((language === 'zh' && pokemon.description.zhUsesEnglishFallback) || (language === 'ja' && pokemon.description.jaUsesEnglishFallback))
  return (
    <div className="pokedex-detail">
      <button className="detail-back" onClick={onBack}>← {messages.backToPokedex}</button>
      {failed && <div className="drawer-state error"><p>{messages.detailError}</p><button onClick={onBack}>{messages.backToPokedex}</button></div>}
      {!failed && !pokemon && <div className="drawer-state"><span className="spinner" /><p>{messages.detailLoading}</p></div>}
      {pokemon && <>
        <div className="detail-hero"><span>#{String(pokemon.id).padStart(4, '0')}</span><img src={pokemon.artwork} alt={localName(pokemon.names, language)} /><h2>{localName(pokemon.names, language)}</h2>{language !== 'en' && <p>{secondaryName(pokemon.names, language)}</p>}<div>{pokemon.types.map((type) => <TypeBadge key={type} type={type} language={language} />)}</div></div>
        <div className="detail-facts"><section><h3>{messages.generation}</h3><strong>{generationLabel(pokemon.generation, language)}</strong></section><section><h3>{messages.height}</h3><strong>{(pokemon.height / 10).toFixed(1)} m</strong></section><section><h3>{messages.weight}</h3><strong>{(pokemon.weight / 10).toFixed(1)} kg</strong></section></div>
        <section className="detail-section description-section"><h3>{messages.description}</h3>
          {descriptionUsesEnglishFallback && <small className="description-fallback">{messages.descriptionEnglishFallback}</small>}
          <p>{pokemon.description[language] ?? messages.unknown}</p>
          <div className="description-facts">
            <span><small>{messages.color}</small><strong>{pokemon.color ? translatedCategory(pokemon.color, language) : messages.unknown}</strong></span>
            <span><small>{messages.habitat}</small><strong>{pokemon.habitat ? translatedCategory(pokemon.habitat, language) : messages.unknown}</strong></span>
          </div></section>
        <section className="detail-section"><div className="detail-section-heading"><h3>{messages.stats}</h3><strong>{messages.total}: {pokemon.totalStats}</strong></div><div className="detail-stats">{statKeys.map((key) => <span key={key}><small>{statLabels[key]}</small><b>{pokemon.stats[key]}</b><i><em style={{ width: `${Math.min(100, pokemon.stats[key] / 2.55)}%` }} /></i></span>)}</div></section>
        <section className="detail-section"><h3>{messages.abilities}</h3><div className="detail-abilities">{pokemon.abilities.map((ability) => <span key={ability.id}><b>{localName(ability.names, language)}</b>{ability.isHidden && <small>{messages.hidden}</small>}</span>)}</div></section>
        <section className="detail-section"><h3>{messages.evolution}</h3><div className="detail-facts evolution"><section><h3>{messages.stage}</h3><strong>{pokemon.evolution.stage}</strong></section><section><h3>{messages.canEvolve}</h3><strong>{pokemon.evolution.canEvolve ? messages.yes : messages.no}</strong></section><section><h3>{messages.hasPreEvolution}</h3><strong>{pokemon.evolution.hasPreEvolution ? messages.yes : messages.no}</strong></section></div></section>
        <section className="detail-section"><h3>{messages.special}</h3><div className="special-status"><span className={pokemon.isLegendary ? 'active' : ''}>{messages.legendary}</span><span className={pokemon.isMythical ? 'active' : ''}>{messages.mythical}</span><span className={pokemon.isBaby ? 'active' : ''}>{messages.baby}</span></div></section>
        <button className="use-as-guess" disabled={!canGuess || alreadyGuessed} onClick={() => onUseAsGuess(pokemon.identifier)}>{messages.useAsGuess}</button>
        {(!canGuess || alreadyGuessed) && <p className="guess-disabled-note">{alreadyGuessed ? messages.alreadyGuessed : messages.unavailableDuringRoundEnd}</p>}
      </>}
    </div>
  )
}
