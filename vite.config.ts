import { readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/** Single source of truth for security headers (see README › Security). */
const headers: Record<string, string> = JSON.parse(
  readFileSync(new URL('./security-headers.json', import.meta.url), 'utf8'),
)

/**
 * Emits a `_headers` file for Netlify / Cloudflare Pages (Vercel reads vercel.json),
 * and adds the CSP as a <meta> fallback for hosts that cannot set headers
 * (e.g. GitHub Pages). Build-only: Vite's dev server injects inline scripts for HMR.
 */
function securityHeaders(): Plugin {
  // frame-ancestors is ignored in <meta>, so drop it there (X-Frame-Options covers it on real headers)
  const metaCsp = headers['Content-Security-Policy']
    .split(';')
    .map((d) => d.trim())
    .filter((d) => d && !d.startsWith('frame-ancestors'))
    .join('; ')

  return {
    name: 'security-headers',
    apply: 'build',
    transformIndexHtml: () => [
      { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: metaCsp }, injectTo: 'head-prepend' },
    ],
    generateBundle() {
      const lines = Object.entries(headers).map(([k, v]) => `  ${k}: ${v}`)
      this.emitFile({ type: 'asset', fileName: '_headers', source: `/*\n${lines.join('\n')}\n` })
    },
  }
}

export default defineConfig({
  plugins: [react(), securityHeaders()],
  build: {
    sourcemap: false,
    // Never inline assets as data: URIs — keeps font-src/img-src locked to 'self'
    assetsInlineLimit: 0,
    target: 'es2022',
  },
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },
  preview: {
    headers,
    // Allow sharing the local preview through an ngrok tunnel (Vite rejects unknown Host headers by default)
    allowedHosts: ['.ngrok-free.app', '.ngrok.app', '.ngrok.io'],
  },
})
