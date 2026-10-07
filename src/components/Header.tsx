import { profile } from '../data/profile'
import { useLang } from '../i18n/context'

const sections = [
  { id: 'about', key: 'navAbout' },
  { id: 'fit', key: 'navFit' },
  { id: 'projects', key: 'navProjects' },
  { id: 'work', key: 'navWork' },
  { id: 'contact', key: 'navContact' },
] as const

export function Header() {
  const { t, lang, setLang } = useLang()
  const [first, ...rest] = profile.name.split(' ')

  return (
    <header className="topbar">
      <a href="#top" className="brand">
        {first}
        <br />
        {rest.join(' ')}
      </a>

      <nav aria-label="Primary" className="nav">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`}>{t(s.key)}</a>
        ))}
      </nav>

      <div className="lang" role="group" aria-label={t('langLabel')}>
        <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')} lang="en">En</button>
        <button type="button" aria-pressed={lang === 'th'} onClick={() => setLang('th')} lang="th">Th</button>
      </div>
    </header>
  )
}
