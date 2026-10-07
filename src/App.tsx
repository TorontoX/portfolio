import { LangProvider } from './i18n/LangProvider'
import { useLang } from './i18n/context'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { RoleFit } from './components/RoleFit'
import { ProjectCarousel } from './components/ProjectCarousel'
import { Work } from './components/Work'
import { Contact } from './components/Contact'
import { profile } from './data/profile'

const YEAR = new Date().getFullYear()

function Page() {
  const { t } = useLang()

  return (
    <>
      <a href="#main" className="skip-link">{t('skip')}</a>
      {/* Decorative hairline circles from the reference design */}
      <div className="orbit orbit-1" aria-hidden="true" />
      <div className="frame">
        <div className="orbit orbit-2" aria-hidden="true" />
        <div className="orbit orbit-3" aria-hidden="true" />
        <Header />
        <main id="main">
          <Hero />
          <ProjectCarousel />
          <About />
          <RoleFit />
          <Work />
          <Contact />
        </main>
        <footer className="footer">
          <span>© {YEAR} {profile.name}</span>
          <span>{t('builtWith')}</span>
        </footer>
      </div>
    </>
  )
}

export default function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  )
}
