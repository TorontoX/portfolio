/**
 * localStorage can throw (private mode, blocked storage), so every access is
 * guarded. Only non-sensitive UI preferences are ever stored.
 */
const PREFIX = 'portfolio:'

export function readPref(key: string): string | null {
  try {
    return localStorage.getItem(PREFIX + key)
  } catch {
    return null
  }
}

export function writePref(key: string, value: string): void {
  try {
    localStorage.setItem(PREFIX + key, value)
  } catch {
    /* ignore — preference just won't persist */
  }
}
