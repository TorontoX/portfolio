import { createContext, useContext } from 'react'
import type { Lang, Localized } from '../data/profile'
import type { UiKey } from './strings'

export interface LangValue {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Translate a UI string key */
  t: (key: UiKey) => string
  /** Pick the current language from a content object */
  l: (value: Localized) => string
}

export const LangContext = createContext<LangValue | null>(null)

export function useLang(): LangValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}
