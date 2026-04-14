import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { FaCartShopping, FaHouse } from 'react-icons/fa6'

export default function notfound() {
  return (
    <>
  

<div className="  min-h-screen bg-[#fafbfc] flex items-center justify-center px-4 py-16 relative overflow-hidden">
  <div className="  relative z-10 max-w-xl w-full">
    <div className="  flex justify-center mb-10">
      <div className="  relative">
        <div className="  absolute inset-0 w-64 h-52 sm:w-72 sm:h-60 bg-green-100/50 rounded-4xl blur-2xl" />
        <div className="  relative w-64 h-52 sm:w-72 sm:h-60">
          <div className="  absolute inset-x-0 top-4 mx-auto w-52 h-40 sm:w-60 sm:h-44 bg-white rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 flex items-center justify-center overflow-hidden">
            <div className="  absolute inset-0 bg-linear-to-br from-green-50/80 via-transparent to-green-100/40 " />
        <FaCartShopping className='text-7xl text-green-400'/>
          </div>
          <div className="  absolute -top-2 -right-2 sm:top-0 sm:right-0">
            <div className="  relative">
              <div className="  absolute -inset-2 rounded-full bg-white shadow-lg" />
              <div className="  relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/40"><span className="  text-xl sm:text-2xl font-black text-white tracking-tight">404</span></div>
            </div>
          </div>
          <div className="  absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">
            <div className="  w-2.5 h-2.5 rounded-full bg-green-400" />
            <div className="  w-8 h-4 border-b-[3px] border-green-400 rounded-b-full" />
            <div className="  w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
        </div>
      </div>
    </div>
    <div className="  text-center mb-10">
      <h1 className="  text-6xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">Oops! Nothing Here</h1>
      <p className="  text-gray-500 text-lg leading-relaxed max-w-md mx-auto">Looks like this page went out of stock! Don't worry, there's plenty more fresh content to explore.</p>
    </div>
    <div className="  flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
      <Link className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-600/30 hover:-translate-y-1" href="/">
    <FaHouse />
        Go to Homepage
      </Link>
      <button className="  group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 hover:-translate-y-1">
       <BiLeftArrowAlt className='text-2xl' />
        Go Back
      </button>
    </div>
    <div className="  bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
      <p className="  text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Popular Destinations</p>
      <div className="  flex flex-wrap items-center justify-center gap-3">
        <Link className="px-5 py-2.5 rounded-xl bg-green-50 text-green-700 font-semibold text-sm hover:bg-green-100 transition-colors" href="/products">All Products</Link>
        <Link className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors" href="/categories">Categories</Link>
        <Link className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors" href="/deals">Today's Deals</Link>
      <Link className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors" href="/contact">Contact Us</Link></div>
    </div>
  </div>
</div>
    </>
  )
}
