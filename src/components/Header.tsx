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
  const next = lang === 'th' ? 'en' : 'th'

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

      {/* One toggle: shows the language you'll switch to */}
      <button
        type="button"
        className="lang-toggle"
        onClick={() => setLang(next)}
        aria-label={t('langSwitch')}
        lang={next}
      >
        {next === 'en' ? 'EN' : 'TH'}
      </button>
    </header>
  )
}
