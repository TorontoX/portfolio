import { useState, type ReactNode } from 'react'
import { profile } from '../data/profile'
import { useLang } from '../i18n/context'
import { ArrowUpRight, FileIcon, MailIcon, PhoneIcon, PinIcon } from './Icons'
import { Rich } from './Rich'

/**
 * Email and phone are stored split and only assembled after a click, so they
 * never appear verbatim in the built HTML/JS for scrapers to harvest.
 */
function useReveal(build: () => string) {
  const [value, setValue] = useState<string | null>(null)
  return [value, () => setValue(build())] as const
}

function CopyButton({ text }: { text: string }) {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* Clipboard unavailable (insecure context / permission) — value is still visible to copy manually */
    }
  }

  return (
    <button type="button" className="chip" onClick={copy} aria-live="polite">
      {copied ? t('copied') : t('copy')}
    </button>
  )
}

function ContactRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="row contact-row">
      <div className="row-meta">{icon}<span>{label}</span></div>
      <div className="row-main contact-value">{children}</div>
    </li>
  )
}

export function Contact() {
  const { t, l } = useLang()
  const { emailUser, emailDomain, phoneParts, location } = profile.contact
  const [email, revealEmail] = useReveal(() => `${emailUser}@${emailDomain}`)
  const [phone, revealPhone] = useReveal(() => phoneParts.join('-'))

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <h2 id="contact-title" className="display section-title">{t('contactTitle')}</h2>
      <p className="lead contact-lead"><Rich text={t('contactLead')} /></p>

      <ul className="rows">
        <ContactRow icon={<MailIcon />} label={t('email')}>
          {email ? (
            <>
              <a className="mono" href={`mailto:${email}`}>{email}</a>
              <CopyButton text={email} />
            </>
          ) : (
            <button type="button" className="pill-cta" onClick={revealEmail}>
              <span className="pill pill-light">{t('showEmail')}</span>
              <span className="pill-arrow"><ArrowUpRight /></span>
            </button>
          )}
        </ContactRow>
        <ContactRow icon={<PhoneIcon />} label={t('phone')}>
          {phone ? (
            <>
              <a className="mono" href={`tel:${phoneParts.join('')}`}>{phone}</a>
              <CopyButton text={phone} />
            </>
          ) : (
            <button type="button" className="chip" onClick={revealPhone}>{t('showPhone')}</button>
          )}
        </ContactRow>
        <ContactRow icon={<PinIcon />} label={t('location')}>
          <span className="mono">{l(location)}</span>
        </ContactRow>
        <ContactRow icon={<FileIcon />} label={t('resume')}>
          <a className="chip" href={profile.resumePdf} download>{t('resume')} <ArrowUpRight /></a>
        </ContactRow>
      </ul>
    </section>
  )
}
