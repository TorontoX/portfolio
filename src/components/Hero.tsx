import { profile } from '../data/profile'
import { useLang } from '../i18n/context'
import { ArrowRight, FileIcon, MailIcon, PhoneIcon } from './Icons'
import { Rich } from './Rich'

export function Hero() {
  const { t, l } = useLang()

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">
        {profile.name} — {t('heroLine1')} {t('heroLine2')}
      </h1>

      <p className="eyebrow">
        {t('applyingFor')} · <em>{profile.targetRole}</em>
      </p>

      <div className="hero-row">
        <span className="display hero-l1" aria-hidden="true">{t('heroLine1')}</span>
        <a href="#projects" className="pill-cta hero-cta">
          <span className="pill pill-light">{t('projects')}</span>
          <span className="pill-arrow"><ArrowRight /></span>
        </a>
      </div>
      <div className="hero-row">
        <p className="hero-tagline"><Rich text={l(profile.tagline)} /></p>
        <span className="display hero-l2" aria-hidden="true">{t('heroLine2')}</span>
      </div>

      <ul className="chips" aria-label={t('navContact')}>
        <li><a className="chip" href="#contact"><MailIcon /> {t('email')}</a></li>
        <li><a className="chip" href="#contact"><PhoneIcon /> {t('phone')}</a></li>
        <li><a className="chip" href={profile.resumePdf} download><FileIcon /> {t('resume')}</a></li>
      </ul>
    </section>
  )
}
