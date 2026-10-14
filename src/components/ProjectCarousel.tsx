import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { projects, type Project } from '../data/profile'
import { useLang } from '../i18n/context'
import { ArrowRight, CloseIcon } from './Icons'
import { Label } from './Rich'

const ordered = [...projects].sort((a, b) => b.year - a.year)
const n = ordered.length
/** The track holds three copies so it can slide forever in either direction;
 *  after each move it silently re-centres on the middle copy. */
const COPIES = 3
const track = Array.from({ length: n * COPIES }, (_, k) => ordered[k % n])
const mod = (i: number) => ((i % n) + n) % n

const AUTOPLAY_MS = 4500
const SWIPE_PX = 50

function useMedia(query: string) {
  const [match, setMatch] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatch(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return match
}

function ProjectCard({ project, art, active, onOpen }: {
  project: Project
  art: number
  active: boolean
  onOpen: () => void
}) {
  const { t, l } = useLang()

  return (
    <article className={`p-card${active ? ' is-active' : ''}`} aria-hidden={!active} inert={!active}>
      <div className={`p-art art-${art % 3}`} aria-hidden="true">
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
  const [pos, setPos] = useState(n)
  const [animate, setAnimate] = useState(true)
  const [paused, setPaused] = useState(false)
  const [open, setOpen] = useState<Project | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const swipeX = useRef<number | null>(null)

  const desktop = useMedia('(min-width: 761px)')
  const reducedMotion = useMedia('(prefers-reduced-motion: reduce)')
  const index = mod(pos)
  const autoplay = desktop && !reducedMotion && !paused && !open

  const go = useCallback((delta: number) => {
    setAnimate(true)
    // With reduced motion there is no transition (so no transitionend): stay on the middle copy
    setPos((p) => reducedMotion
      ? n + mod(p + delta)
      : Math.min(Math.max(p + delta, 0), n * COPIES - 1))
  }, [reducedMotion])

  const goTo = (i: number) => {
    setAnimate(true)
    setPos(n + i)
  }

  // Once a slide finishes on a copy, jump (without animation) to the same card in the middle copy
  const recentre = () => {
    if (pos >= n && pos < 2 * n) return
    setAnimate(false)
    setPos(n + mod(pos))
  }

  // Turn the transition back on after an instant re-centre has painted
  useEffect(() => {
    if (animate) return
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => setAnimate(true))
    })
    return () => cancelAnimationFrame(id)
  }, [animate])

  // Desktop autoplay — pauses on hover/focus, while the dialog is open, in background tabs,
  // and never runs for users who prefer reduced motion
  useEffect(() => {
    if (!autoplay) return
    const id = window.setInterval(() => {
      if (!document.hidden) go(1)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [autoplay, go, pos])

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  // Allow linking straight to a project, e.g. from the role-fit table (#project-pharma-bot)
  useEffect(() => {
    const sync = () => {
      const i = ordered.findIndex((p) => `#project-${p.id}` === location.hash)
      if (i >= 0) {
        setAnimate(true)
        setPos(n + i)
      }
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const onPointerDown = (e: PointerEvent) => { swipeX.current = e.clientX }
  const onPointerUp = (e: PointerEvent) => {
    if (swipeX.current === null) return
    const dx = e.clientX - swipeX.current
    swipeX.current = null
    if (Math.abs(dx) > SWIPE_PX) go(dx < 0 ? 1 : -1)
  }

  return (
    <section id="projects" className="section projects" aria-roledescription="carousel" aria-labelledby="projects-title">
      <Label>{t('projects')}</Label>
      <h2 id="projects-title" className="sr-only">{t('projects')}</h2>
      {ordered.map((p) => <span key={p.id} id={`project-${p.id}`} className="anchor" />)}

      <div
        className="carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false) }}
      >
        <div
          className="c-viewport"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => { swipeX.current = null }}
        >
          <div
            className={`c-track${animate ? ' is-animated' : ''}`}
            style={{ '--pos': pos } as CSSProperties}
            onTransitionEnd={(e) => { if (e.target === e.currentTarget) recentre() }}
          >
            {track.map((p, k) => (
              <ProjectCard key={k} project={p} art={k % n} active={k === pos} onOpen={() => setOpen(p)} />
            ))}
          </div>
        </div>
      </div>

      <div className="dots" role="group" aria-label={t('projects')}>
        {ordered.map((p, i) => (
          <button
            key={p.id}
            type="button"
            className={i === index ? 'on' : ''}
            aria-label={`${i + 1}. ${l(p.title)}`}
            aria-current={i === index}
            onClick={() => goTo(i)}
          >
            <span />
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live={autoplay ? 'off' : 'polite'}>
        {`${index + 1} / ${n}: ${l(ordered[index].title)}`}
      </p>

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
