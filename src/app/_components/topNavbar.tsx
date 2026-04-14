"use client"
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import {  FaGift, FaPhone, FaRegEnvelope, FaTruck, FaUserPlus } from 'react-icons/fa6'
import { FiUser } from 'react-icons/fi'

export default function TopNavbar() {
 function handleSignOut (){
signOut({redirect:true, callbackUrl: "/login"})
  
}

const { data: session , status } = useSession();
const isLoggedIn = !!session;
  if (status === "loading") return null;
  const user = session?.user;

  return (
<div className="hidden lg:block text-sm border-b border-gray-100  font-medium">
  <div className="container mx-auto px-4">
    <div className="flex justify-between items-center h-10">
      <div className="flex items-center gap-6 text-gray-500">
        <span className="flex items-center gap-2 ">
        <FaTruck className='text-green-600'/>
          <span>Free Shipping on Orders 500 EGP</span>
        </span>
        <span className="flex items-center gap-2">
          <FaGift className='text-green-600 w-3 h-3' />
          <span>New Arrivals Daily</span>
        </span>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-gray-500">
          <Link href="tel:+18001234567" className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
        <FaPhone className='w-3 h-3'/>
            <span>+1 (800) 123-4567</span>
          </Link>
          <Link href="mailto:support@freshcart.com" className="flex items-center gap-1.5 hover:text-green-600 transition-colors">
         <FaRegEnvelope className='w-3.5 h-3' />
            <span>support@freshcart.com</span>
          </Link>
        </div>
        <span className="w-px h-4 bg-gray-200" />



<div className="flex items-center gap-4">
  {isLoggedIn ? (
    <>  <Link  className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors"
        href="/profile" > <FiUser /> <span>{user?.name}</span>  </Link>

      <button onClick={handleSignOut}
        className="flex items-center gap-1.5 text-gray-600 hover:text-red-600 transition-colors cursor-pointer" > 
         <FaSignOutAlt /> <span >Sign Out</span>  </button> </>  ) : (

    <> <Link className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors"
        href="/login"  > <FiUser /> <span>Sign In</span>  </Link>

      <Link className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors"
        href="/signup" > <FaUserPlus /> <span>Sign Up</span> </Link> </> )} </div>
      </div>
      
    </div>
  </div>
</div>

  )
}

