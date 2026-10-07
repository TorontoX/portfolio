import { education, experience } from '../data/profile'
import { useLang } from '../i18n/context'

export function Work() {
  const { t, l } = useLang()

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <h2 id="work-title" className="display section-title">{t('workTitle')}</h2>

      <ul className="rows">
        {experience.map((e) => (
          <li key={e.company} className="row work-row">
            <div className="row-meta">
              <span>{l(e.period)}</span>
              <small>{l(e.duration)}</small>
            </div>
            <h3 className="row-main">{e.company}</h3>
            <p className="row-detail mono">{l(e.role)} <span className="sep">|</span> {e.focus}</p>
          </li>
        ))}
      </ul>
      <p className="rows-total">
        {t('workTotal')}<br /><em>{l(experience[0].duration)}</em>
      </p>

      <h3 className="sub-title">{t('educationTitle')}</h3>
      <ul className="rows">
        {education.map((e) => (
          <li key={e.school.en} className="row work-row">
            <div className="row-meta"><span>{e.period || '—'}</span></div>
            <h4 className="row-main">{l(e.school)}</h4>
            <p className="row-detail mono">{l(e.degree)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
