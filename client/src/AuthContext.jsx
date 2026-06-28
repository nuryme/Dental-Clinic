import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider } from './firebase.js'
import { api } from './api.js'

const AuthCtx = createContext(null)
export const useAuth = () => useContext(AuthCtx)

const SESSION_MAX_MS = 5 * 60 * 60 * 1000 // every role is logged out 5h after sign-in

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // DB user (incl. role); null when logged out
  const [loading, setLoading] = useState(true)

  const doLogout = async () => {
    await signOut(auth)
    await api('/logout').catch(() => {})
    setUser(null)
  }

  // On every Firebase auth change: exchange the ID token for our cookie, then
  // load the DB user (role lives there). Also hard-cap the session at 5h.
  useEffect(() => {
    let logoutTimer
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      clearTimeout(logoutTimer)
      try {
        if (fbUser) {
          // Firebase keeps its own session alive past our cookie, so enforce the
          // 5h cap client-side too, measured from the last sign-in.
          const signInAt = new Date(fbUser.metadata?.lastSignInTime || Date.now()).getTime()
          const remaining = SESSION_MAX_MS - (Date.now() - signInAt)
          if (remaining <= 0) {
            await doLogout()
            return
          }
          logoutTimer = setTimeout(doLogout, remaining)

          const idToken = await fbUser.getIdToken()
          await api('/jwt', { method: 'POST', body: { idToken } })
          setUser(await api('/users/me'))
        } else {
          setUser(null)
        }
      } catch (e) {
        console.error('auth sync failed', e)
        setUser(null)
      } finally {
        setLoading(false)
      }
    })
    return () => {
      clearTimeout(logoutTimer)
      unsub()
    }
  }, [])

  const register = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (name) {
      await updateProfile(cred.user, { displayName: name })
      // onAuthStateChanged already fired during account creation with a nameless
      // token. Re-sync with a force-refreshed token so the server gets the name.
      const idToken = await cred.user.getIdToken(true)
      await api('/jwt', { method: 'POST', body: { idToken } })
      setUser(await api('/users/me'))
    }
  }
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const loginGoogle = () => signInWithPopup(auth, googleProvider)
  const logout = doLogout

  const refresh = async () => setUser(await api('/users/me'))

  return (
    <AuthCtx.Provider value={{ user, role: user?.role, loading, register, login, loginGoogle, logout, refresh }}>
      {children}
    </AuthCtx.Provider>
  )
}
