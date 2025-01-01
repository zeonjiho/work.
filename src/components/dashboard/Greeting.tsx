'use client'

import { useEffect, useState } from 'react'
import styles from '@/styles/dashboard/Greeting.module.css'
import { FiSun, FiMoon, FiSunrise } from 'react-icons/fi'

export default function Greeting({ user, profile }: { user: any; profile: any }) {
  const [greeting, setGreeting] = useState('')
  const [icon, setIcon] = useState<any>(null)

  useEffect(() => {
    const getGreetingAndIcon = () => {
      const hour = new Date().getHours()
      if (hour >= 5 && hour < 12) {
        setIcon(<FiSunrise className="text-yellow-500" />)
        return '좋은 아침이에요'
      }
      if (hour >= 12 && hour < 17) {
        setIcon(<FiSun className="text-yellow-500" />)
        return '좋은 오후에요'
      }
      if (hour >= 17 && hour < 22) {
        setIcon(<FiMoon className="text-blue-500" />)
        return '좋은 저녁이에요'
      }
      setIcon(<FiMoon className="text-blue-500" />)
      return '안녕하세요'
    }
    setGreeting(getGreetingAndIcon())
  }, [])

  return (
    <div className={styles.greetingWrapper}>
      <h1 className={styles.greeting}>
        {icon && <span className="mr-2">{icon}</span>}
        {greeting}, <span className={styles.username}>{profile?.username}</span>
      </h1>
      <p className={styles.subtitle}>오늘도 좋은 하루 되세요!</p>
    </div>
  )
} 