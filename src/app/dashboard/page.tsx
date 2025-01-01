'use client'

import { Suspense } from 'react'
import Loading from '@/components/Loading'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import NavBar from '@/components/navigation/NavBar'

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <DashboardLayout />
    </>
  )
} 