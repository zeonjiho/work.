'use client'

import { useEffect } from 'react'
import Login from '@/components/auth/Login'
import SignUp from '@/components/auth/SignUp'
import ResetPassword from '@/components/auth/ResetPassword'

interface AuthModalProps {
  mode: 'login' | 'signup' | 'reset-password'
  onClose: () => void
  onChangeMode: (mode: 'login' | 'signup' | 'reset-password') => void
}

export default function AuthModal({ mode, onClose, onChangeMode }: AuthModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md">
        {mode === 'login' && <Login onChangeMode={onChangeMode} />}
        {mode === 'signup' && <SignUp onChangeMode={onChangeMode} />}
        {mode === 'reset-password' && <ResetPassword onChangeMode={onChangeMode} />}
      </div>
    </div>
  )
} 