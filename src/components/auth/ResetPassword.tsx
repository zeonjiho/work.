'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import '@/styles/Auth.css'

interface ResetPasswordProps {
  onChangeMode: (mode: 'login' | 'signup' | 'reset-password') => void
}

export default function ResetPassword({ onChangeMode }: ResetPasswordProps) {
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
        <h1 className="auth-title">비밀번호 재설정</h1>
        {sent ? (
          <div className="auth-message">
            <p>비밀번호 재설정 이메일을 발송했습니다.</p>
            <p>이메일을 확인해주세요.</p>
            <button 
              onClick={() => onChangeMode('login')} 
              className="auth-link"
            >
              로그인으로 돌아가기
            </button>
          </div>
        ) : (
          <form onSubmit={handleReset} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">이메일</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? '발송 중...' : '재설정 이메일 발송'}
            </button>
            <div className="auth-links">
              <button 
                onClick={() => onChangeMode('login')} 
                className="auth-link"
              >
                로그인으로 돌아가기
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
} 