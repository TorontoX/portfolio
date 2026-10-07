import { profile, skills, strengths } from '../data/profile'
import { useLang } from '../i18n/context'
import { ArrowUpRight } from './Icons'
import { Label, Rich } from './Rich'

export function About() {
  const { t, l } = useLang()

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="split">
        <Label>{t('aboutLabel')}</Label>
        <h2 id="about-title" className="lead"><Rich text={l(profile.aboutIntro)} /></h2>
      </div>

      <div className="about-grid">
        <ul className="skill-cards">
          {skills.map((g, i) => (
            <li key={g.group.en} className={`s-card${i === 0 ? ' is-light' : ''}`}>
              <h3>{l(g.group)}</h3>
              <p className="mono slash-list">{g.items.join(' / ')}</p>
            </li>
          ))}
          <li className="s-note">
            <Rich text={t('skillsNote')} />
          </li>
          <li className="s-card s-strengths">
            <h3>{t('strengthsLabel')}</h3>
            <ul className="dash-list">
              {strengths.map((s) => <li key={s.en}>{l(s)}</li>)}
            </ul>
          </li>
        </ul>

        <div className="portrait">
          {profile.photo ? (
            <img src={profile.photo} alt={profile.name} loading="lazy" decoding="async" />
          ) : (
            <div className="portrait-art" aria-hidden="true">
              <span className="display">{profile.initials}</span>
            </div>
          )}
          <a href={profile.resumePdf} className="round-btn portrait-link" download aria-label={t('resume')}>
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  )
}
