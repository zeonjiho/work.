'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import '@/styles/Auth.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [gender, setGender] = useState('')
  const [loading, setLoading] = useState(false)
  const [isUsernameValid, setIsUsernameValid] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [isPasswordMatch, setIsPasswordMatch] = useState(true)
  const [isEmailAvailable, setIsEmailAvailable] = useState(true)
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true)
  const router = useRouter()

  const handleGoogleSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error) {
      alert('Google signup error occurred!')
    }
  }

  const validateEmail = async (value: string) => {
    setEmail(value)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isValid = emailRegex.test(value)
    setIsEmailValid(isValid)

    if (isValid) {
      try {
        console.log('Checking email:', value)

        const response = await fetch('/api/check-email', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ email: value })
        })
        
        console.log('Response status:', response.status)
        
        const data = await response.json()
        console.log('Response data:', data)

        if (data.error) {
          console.error('API error:', data.error)
          setIsEmailAvailable(false)
          return
        }
        
        setIsEmailAvailable(!data.exists)
      } catch (error) {
        console.error('Error checking email:', error)
        setIsEmailAvailable(false)
      }
    } else {
      setIsEmailAvailable(true)
    }
  }

  const validateUsername = async (value: string) => {
    setUsername(value)
    const isValid = value.length >= 3 && value.length <= 20 && /^[a-zA-Z0-9_]+$/.test(value)
    setIsUsernameValid(isValid)

    if (isValid) {
      try {
        console.log('Checking username:', value)

        const response = await fetch('/api/check-username', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ username: value })
        })
        
        console.log('Response status:', response.status)
        
        const data = await response.json()
        console.log('Response data:', data)

        if (data.error) {
          console.error('API error:', data.error)
          setIsUsernameAvailable(false)
          return
        }
        
        setIsUsernameAvailable(!data.exists)
      } catch (error) {
        console.error('Error checking username:', error)
        setIsUsernameAvailable(false)
      }
    } else {
      setIsUsernameAvailable(true)
    }
  }

  const validatePassword = (value: string) => {
    setPassword(value)
    const isValid = value.length >= 8 && /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)
    setIsPasswordValid(isValid)
    setIsPasswordMatch(value === confirmPassword)
  }

  const validateConfirmPassword = (value: string) => {
    setConfirmPassword(value)
    setIsPasswordMatch(password === value)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isUsernameValid || !username || !isEmailValid || !isEmailAvailable || !isUsernameAvailable) {
      alert('모든 필드를 올바르게 입력해주세요.')
      return
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    setLoading(true)
    try {
      console.log('Starting signup process...')

      // 사용자 계정 생성만 수행 (프로필은 트리거가 자동으로 생성)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
            birth_date: birthDate,
            gender: gender
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      
      if (authError) {
        throw authError
      }

      if (!authData?.user?.id) {
        throw new Error('사용자 ID를 찾을 수 없습니다.')
      }

      // 트리거가 프로필을 생성할 때까지 잠시 대기
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 프로필이 생성되었는지 확인
      const { data: profile, error: checkError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (checkError) {
        console.log('Profile check warning:', checkError)
        // 프로필 확인 실패 시에도 계속 진행
      }

      console.log('Signup successful')
      alert('가입 확인 이메일을 발송했습니다. 이메일을 확인해주세요.')
      router.push('/auth/login')
    } catch (error: any) {
      console.error('Signup error:', error)
      
      let errorMessage = '회원가입 중 오류가 발생했습니다.'
      if (error.message) {
        if (error.message.includes('duplicate key')) {
          errorMessage = '이미 사용 중인 이메일 또는 사용자명입니다.'
        } else if (error.message.includes('User already registered')) {
          errorMessage = '이미 가입된 이메일입니다. 로그인을 시도해보세요.'
        } else {
          errorMessage = error.message
        }
      }
      
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Sign Up</h1>
        <button onClick={handleGoogleSignUp} className="google-auth-button">
          <img src="/google-icon.svg" alt="Google" className="google-icon" />
          Continue with Google
        </button>
        <div className="auth-divider">
          <span>Or</span>
        </div>
        <form onSubmit={handleSignUp} className="auth-form">
          <div className={`form-group ${!isEmailValid || !isEmailAvailable ? 'invalid' : ''}`}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => validateEmail(e.target.value)}
              required
            />
            {!isEmailValid && (
              <span className="error-message">Please enter a valid email address</span>
            )}
            {isEmailValid && !isEmailAvailable && (
              <span className="error-message">This email is already in use</span>
            )}
          </div>

          <div className={`form-group ${!isUsernameValid || !isUsernameAvailable ? 'invalid' : ''}`}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => validateUsername(e.target.value)}
              required
            />
            {!isUsernameValid && (
              <span className="error-message">
                Username must be 3-20 characters and contain only letters, numbers, and underscores
              </span>
            )}
            {isUsernameValid && !isUsernameAvailable && (
              <span className="error-message">This username is already taken</span>
            )}
          </div>

          <div className={`form-group ${!isPasswordValid ? 'invalid' : ''}`}>
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => validatePassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {!isPasswordValid && (
              <span className="error-message">
                Password must be at least 8 characters and include letters, numbers, and special characters
              </span>
            )}
          </div>

          <div className={`form-group ${!isPasswordMatch ? 'invalid' : ''}`}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => validateConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {!isPasswordMatch && (
              <span className="error-message">Passwords do not match</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">Date of Birth</label>
            <input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <div className="gender-buttons">
              <button
                type="button"
                className={`gender-button ${gender === 'male' ? 'active' : ''}`}
                onClick={() => setGender('male')}
              >
                Male
              </button>
              <button
                type="button"
                className={`gender-button ${gender === 'female' ? 'active' : ''}`}
                onClick={() => setGender('female')}
              >
                Female
              </button>
              <button
                type="button"
                className={`gender-button ${gender === 'other' ? 'active' : ''}`}
                onClick={() => setGender('other')}
              >
                Other
              </button>
            </div>
          </div>

          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>
        <div className="auth-links">
          <Link href="/auth/login" className="auth-link">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  )
} 