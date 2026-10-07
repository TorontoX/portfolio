import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Lang } from '../data/profile'
import { ui } from './strings'
import { LangContext, type LangValue } from './context'
import { readPref, writePref } from '../hooks/storage'

function initialLang(): Lang {
  const saved = readPref('lang')
  if (saved === 'th' || saved === 'en') return saved
  return navigator.language?.toLowerCase().startsWith('th') ? 'th' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    writePref('lang', lang)
  }, [lang])


  const value = useMemo<LangValue>(
    () => ({
      lang,
      setLang,
      t: (key) => ui[key][lang],
      l: (v) => v[lang],
    }),
    [lang],
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
