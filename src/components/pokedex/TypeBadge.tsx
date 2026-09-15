import type { Language } from '../../types/pokemon'
import { translatedType } from '../../i18n'

export function TypeBadge({ type, language }: { type: string; language: Language }) {
  return <span className={`type-badge type-${type}`}>{translatedType(type, language)}</span>
}
