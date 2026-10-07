import { useEffect, useRef, useState } from 'react'
import { projects, type Project } from '../data/profile'
import { useLang } from '../i18n/context'
import { ArrowLeft, ArrowRight, CloseIcon } from './Icons'
import { Label } from './Rich'

const ordered = [...projects].sort((a, b) => b.year - a.year)
const wrap = (i: number) => (i + ordered.length) % ordered.length

function ProjectCard({ project, index, active, onOpen }: {
  project: Project
  index: number
  active: boolean
  onOpen: () => void
}) {
  const { t, l } = useLang()

  return (
    <article
      className={`p-card${active ? ' is-active' : ''}`}
      aria-hidden={!active}
      inert={!active}
    >
      <div className={`p-art art-${index % 3}`} aria-hidden="true">
        <span>{String(project.year)}</span>
      </div>
      <div className="p-body">
        <h3 className="mono">{l(project.title)}</h3>
        <p>{l(project.problem)}</p>
        <button type="button" className="pill-cta" onClick={onOpen}>
          <span className="pill pill-light">{t('readMore')}</span>
          <span className="pill-arrow"><ArrowRight /></span>
        </button>
      </div>
    </article>
  )
}

export function ProjectCarousel() {
  const { t, l } = useLang()
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState<Project | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  // Allow linking straight to a project, e.g. from the role-fit table (#project-pharma-bot)
  useEffect(() => {
    const sync = () => {
      const id = location.hash.replace('#project-', '')
      const i = ordered.findIndex((p) => p.id === id)
      if (i >= 0) setIndex(i)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const slots = [wrap(index - 1), index, wrap(index + 1)]

  return (
    <section id="projects" className="section projects" aria-roledescription="carousel" aria-labelledby="projects-title">
      <Label>{t('projects')}</Label>
      <h2 id="projects-title" className="sr-only">{t('projects')}</h2>
      {ordered.map((p) => <span key={p.id} id={`project-${p.id}`} className="anchor" />)}

      <div className="carousel">
        {slots.map((i, slot) => (
          <div key={`${slot}-${ordered[i].id}`} className={`slot slot-${slot}`}>
            <ProjectCard project={ordered[i]} index={i} active={slot === 1} onOpen={() => setOpen(ordered[i])} />
          </div>
        ))}
        <button type="button" className="round-btn nav-prev" onClick={() => setIndex(wrap(index - 1))} aria-label={t('prev')}>
          <ArrowLeft />
        </button>
        <button type="button" className="round-btn nav-next" onClick={() => setIndex(wrap(index + 1))} aria-label={t('next')}>
          <ArrowRight />
        </button>
      </div>

      <div className="dots" aria-hidden="true">
        {ordered.map((p, i) => <span key={p.id} className={i === index ? 'on' : ''} />)}
      </div>
      <p className="sr-only" aria-live="polite">{`${index + 1} / ${ordered.length}: ${l(ordered[index].title)}`}</p>

      <dialog
        ref={dialogRef}
        className="p-dialog"
        aria-labelledby="dialog-title"
        onClose={() => setOpen(null)}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(null) }}
      >
        {open && (
          <div className="p-dialog-inner">
            <button type="button" className="round-btn dialog-close" onClick={() => setOpen(null)} aria-label={t('close')} autoFocus>
              <CloseIcon />
            </button>
            <p className="mono muted">{open.year}</p>
            <h3 id="dialog-title" className="mono">{l(open.title)}</h3>

            <h4>{t('problem')}</h4>
            <p>{l(open.problem)}</p>

            <h4>{t('built')}</h4>
            <ul className="dash-list">
              {open.built.map((b) => <li key={b.en}>{l(b)}</li>)}
            </ul>

            <h4>{t('stack')}</h4>
            <p className="mono slash-list">{open.stack.join(' / ')}</p>
          </div>
        )}
      </dialog>
    </section>
  )
}
