import type { PokemonDescription } from '../types/pokemon'

export interface FlavorTextEntry {
  flavor_text: string
  language: { name: string }
  version: { name: string }
}

const preferredVersions = [
  'violet', 'scarlet', 'legends-arceus', 'shining-pearl', 'brilliant-diamond',
  'shield', 'sword', 'ultra-moon', 'ultra-sun', 'moon', 'sun', 'omega-ruby',
  'alpha-sapphire', 'y', 'x', 'white-2', 'black-2', 'white', 'black',
  'soulsilver', 'heartgold', 'platinum', 'pearl', 'diamond', 'emerald',
  'leafgreen', 'firered', 'sapphire', 'ruby', 'crystal', 'silver', 'gold',
  'yellow', 'blue', 'red',
] as const

export function normalizeFlavorText(text: string): string {
  return text.replace(/[\n\r\f]+/g, ' ').replace(/\s+/g, ' ').trim()
}

function selectFlavorText(entries: FlavorTextEntry[], language: string): string | null {
  const candidates = entries.filter((entry) => entry.language.name.toLowerCase() === language.toLowerCase())
  if (!candidates.length) return null

  for (const version of preferredVersions) {
    const match = candidates.find((entry) => entry.version.name === version)
    if (match) return normalizeFlavorText(match.flavor_text)
  }

  const fallback = [...candidates].sort((a, b) => a.version.name.localeCompare(b.version.name))[0]
  return normalizeFlavorText(fallback.flavor_text)
}

export function selectOfficialDescriptions(entries: FlavorTextEntry[]): PokemonDescription {
  const en = selectFlavorText(entries, 'en')
  const simplifiedChinese = selectFlavorText(entries, 'zh-hans')
  const traditionalChinese = selectFlavorText(entries, 'zh-hant')
  const generalChinese = selectFlavorText(entries, 'zh')
  const officialChinese = simplifiedChinese ?? traditionalChinese ?? generalChinese
  const standardJapanese = selectFlavorText(entries, 'ja')
  const kanaJapanese = selectFlavorText(entries, 'ja-hrkt')
  const officialJapanese = standardJapanese ?? kanaJapanese

  return {
    en,
    zh: officialChinese ?? en,
    ja: officialJapanese ?? en,
    zhUsesEnglishFallback: !officialChinese && Boolean(en),
    jaUsesEnglishFallback: !officialJapanese && Boolean(en),
  }
}
