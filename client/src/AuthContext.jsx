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

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // DB user (incl. role); null when logged out
  const [loading, setLoading] = useState(true)

  // On every Firebase auth change: exchange the ID token for our cookie, then
  // load the DB user (role lives there).
  useEffect(() => {
    return onAuthStateChanged(auth, async (fbUser) => {
      try {
        if (fbUser) {
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
  }, [])

  const register = async (name, email, password) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (name) await updateProfile(cred.user, { displayName: name })
    // onAuthStateChanged will sync the cookie + DB user
  }
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
  const loginGoogle = () => signInWithPopup(auth, googleProvider)
  const logout = async () => {
    await signOut(auth)
    await api('/logout').catch(() => {})
    setUser(null)
  }

  const refresh = async () => setUser(await api('/users/me'))

  return (
    <AuthCtx.Provider value={{ user, role: user?.role, loading, register, login, loginGoogle, logout, refresh }}>
      {children}
    </AuthCtx.Provider>
  )
}
