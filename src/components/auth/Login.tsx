'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import '../../styles/Auth.css'

interface LoginProps {
  onChangeMode: (mode: 'login' | 'signup' | 'reset-password') => void
}

export default function Login({ onChangeMode }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      
      // 세션이 설정될 때까지 잠시 대기
      await new Promise(resolve => setTimeout(resolve, 500));
      
      window.location.href = '/dashboard'
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
          <button 
            onClick={() => onChangeMode('signup')} 
            className="auth-link"
          >
            Don't have an account? Sign up
          </button>
          <button 
            onClick={() => onChangeMode('reset-password')} 
            className="auth-link"
          >
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  )
} 