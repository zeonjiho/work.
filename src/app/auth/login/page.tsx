'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import '@/styles/Auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push('/dashboard')
    } catch (error) {
      alert('로그인 에러가 발생했습니다!')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error) {
      alert('Google 로그인 중 에러가 발생했습니다!')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Login</h1>
        <button onClick={handleGoogleLogin} className="google-auth-button">
          <img src="/google-icon.svg" alt="Google" className="google-icon" />
          Continue with Google
        </button>
        <div className="auth-divider">
          <span>or</span>
        </div>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
                {loading ? 'Login...' : 'Login'}
            </button>
            </form>
            <div className="auth-links">
            <Link href="/auth/signup" className="auth-link">
                Don't have an account? Sign up
          </Link>
          <Link href="/auth/reset-password" className="auth-link">
            Forgot your password?
          </Link>
          <div className="auth-links">
            <Link href="/" className="auth-link">
                Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 