'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiHome, FiCalendar, FiInbox, FiSettings } from 'react-icons/fi'
import styles from '@/styles/navigation/NavBar.module.css'

export default function NavBar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiHome },
    { name: 'Calendar', path: '/calendar', icon: FiCalendar },
    { name: 'Inbox', path: '/inbox', icon: FiInbox },
    { name: 'Settings', path: '/settings', icon: FiSettings },
  ]

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoText}>work.</span>
        </div>
        <div className={styles.navItems}>
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path}
              className={`${styles.navItem} ${pathname === item.path ? styles.active : ''}`}
            >
              <item.icon className={styles.navIcon} />
              <span className={styles.navText}>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
} 