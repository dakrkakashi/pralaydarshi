import { useCallback, useSyncExternalStore } from 'react'

const STORAGE_KEY = 'pralaydarshi.demo-session'

const subscribers = new Set<() => void>()

function getSnapshot(): boolean {
  return typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY) === 'yes'
}

function subscribe(callback: () => void) {
  subscribers.add(callback)
  return () => subscribers.delete(callback)
}

function emit() {
  subscribers.forEach((callback) => callback())
}

function persist(value: boolean) {
  if (value) window.localStorage.setItem(STORAGE_KEY, 'yes')
  else window.localStorage.removeItem(STORAGE_KEY)
  emit()
}

export function useAuth() {
  const isAuthenticated = useSyncExternalStore(subscribe, getSnapshot)

  const signIn = useCallback(() => persist(true), [])
  const signOut = useCallback(() => persist(false), [])

  return { isAuthenticated, signIn, signOut }
}