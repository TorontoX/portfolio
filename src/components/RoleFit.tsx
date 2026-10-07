import { fit, projects } from '../data/profile'
import { useLang } from '../i18n/context'
import { ArrowUpRight } from './Icons'
import { Label } from './Rich'

const projectTitle = new Map(projects.map((p) => [p.id, p.title]))

export function RoleFit() {
  const { t, l } = useLang()

  return (
    <section id="fit" className="section" aria-labelledby="fit-title">
      <div className="split">
        <Label>{t('fitLabel')}</Label>
      </div>

      <h2 id="fit-title" className="display section-title">{t('fitTitle')}</h2>

      <ul className="rows">
        {fit.map((item) => (
          <li key={item.requirement.en} className="row fit-row">
            <div className="row-meta">
              <span className={`level level-${item.level}`}>
                {item.level === 'strong' ? t('levelStrong') : t('levelHandsOn')}
              </span>
              {item.preferred && <small>{t('preferred')}</small>}
            </div>
            <h3 className="row-main">{l(item.requirement)}</h3>
            <div className="row-detail">
              <p className="mono">{l(item.evidence)}</p>
              {item.proof.length > 0 && (
                <p className="proof">
                  {item.proof.map((id) => {
                    const title = projectTitle.get(id)
                    return title ? (
                      <a key={id} href={`#project-${id}`}>{l(title)} <ArrowUpRight /></a>
                    ) : null
                  })}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
