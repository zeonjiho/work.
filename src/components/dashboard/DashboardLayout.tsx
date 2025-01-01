'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Greeting from './Greeting'
import ProfileSection from './ProfileSection'
import DashboardCards from './DashboardCards'
import styles from '@/styles/dashboard/DashboardLayout.module.css'
import Loading from '../Loading'

export default function DashboardLayout() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        
        if (userError || !user) {
          console.log('No user found, redirecting to login')
          router.push('/auth/login')
          return
        }

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('email, username')
          .eq('id', user.id)
          .single()
        
        if (profileError) throw profileError
        
        setUser(user)
        setProfile(profileData)
      } catch (error: any) {
        console.error('Error in getUser:', error.message)
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [router])

  if (loading) return <Loading />
  if (!user || !profile) return null

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <Greeting user={user} profile={profile} />
              <ProfileSection user={user} profile={profile} />   
            </div>
          </div>
          <DashboardCards />
        </div>
      </div>
    </div>
  )
} 