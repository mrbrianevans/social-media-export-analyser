import { writable } from 'svelte/store'

const getFromStorage = () => {
  const value = localStorage.getItem('darkTheme')
  console.log('Got', value, 'from localStorage for theme')
  if (value === 'true') return true
  else if (value === 'false') return false
  else return null
}
const getMediaQuery = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (prefersDark) console.log('Media query prefers dark mode')
  return prefersDark
}

function themeStore() {
  const darkTheme = getFromStorage() ?? getMediaQuery()
  const { subscribe, set, update } = writable(darkTheme ? 'dark' : 'light')
  subscribe((newTheme) =>
    localStorage.setItem('darkTheme', String(newTheme === 'dark'))
  )
  const toggle = () => {
    update((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }
  return { subscribe, set, update, toggle }
}

export const theme = themeStore()
