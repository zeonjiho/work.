'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import styles from '@/styles/dashboard/ProfileSection.module.css'
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi'

export default function ProfileSection({ user, profile }: { user: any; profile: any }) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  const getInitials = (username: string) => {
    return username?.charAt(0).toUpperCase() || 'U'
  }

  return (
    <div className={styles.profileContainer}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={styles.profileButton}
      >
        <div className={styles.avatar}>
          {getInitials(profile?.username)}
        </div>
        <span className="font-medium">{profile?.username}</span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button
            onClick={() => router.push('/profile/settings')}
            className={styles.dropdownItem}
          >
            <FiSettings className="w-5 h-5" />
            <span>계정 설정</span>
          </button>
          <button
            onClick={handleLogout}
            className={`${styles.dropdownItem} ${styles.logoutButton}`}
          >
            <FiLogOut className="w-5 h-5" />
            <span>로그아웃</span>
          </button>
        </div>
      )}
    </div>
  )
} 