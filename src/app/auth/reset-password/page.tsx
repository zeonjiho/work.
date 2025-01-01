'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import '@/styles/Auth.css'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })
      if (error) throw error
      setSent(true)
    } catch (error) {
      alert('비밀번호 재설정 이메일 발송 중 에러가 발생했습니다!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Reset Password</h1>
        {sent ? (
          <div className="auth-message">
            <p>Reset password email has been sent.</p>
            <p>Please check your email.</p>
            <Link href="/auth/login" className="auth-link">
              Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="auth-form">
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
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Email'}
            </button>
          </form>
        )}
        <div className="auth-links">
          <Link href="/" className="auth-link">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
} 