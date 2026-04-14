"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { ToastContainer } from 'react-toastify'

export default function MySessionProvider({ children}: { children: React.ReactNode}) {
  return (
    <SessionProvider>
   {children}
   <ToastContainer />
   </SessionProvider>
  )
}
