import { Fragment } from 'react'

/**
 * Renders `*text*` as <em>. Output is built from React nodes only — no
 * dangerouslySetInnerHTML — so content can never inject markup.
 */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split('*').map((part, i) =>
        i % 2 === 1 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  )
}

/** Section label in the "... /About me ..." style */
export function Label({ children }: { children: string }) {
  return <p className="label" aria-hidden="true">… /{children} …</p>
}
