"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Search() {
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-6">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link className="hover:text-primary-600 transition-colors" href="/">Home</Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Search Results</span>
            </nav>
            <form className="max-w-2xl">
              <div className="relative">
                <input 
                  placeholder="Search for products..." 
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all text-lg"
                  type="text" 
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)} 
                />
              </div>
            </form>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-8">
            <div className="hidden lg:block w-64 shrink-0">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900">Categories</h3>
                      <span className="text-xs text-primary-600 font-medium">1 selected</span>
                    </div>
                    <div className="space-y-2 max-h-52 overflow-y-auto">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" type="checkbox" />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Music</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" type="checkbox" />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Men's Fashion</span>
                      </label>
                    </div>
                  </div>

                  <hr className="border-gray-100" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-4">Price Range</h3>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Min (EGP)</label>
                        <input 
                          placeholder="0" 
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none" 
                          type="number" 
                          value="" 
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Max (EGP)</label>
                        <input 
                          placeholder="No limit" 
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none" 
                          type="number" 
                          value="10000" 
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200">Under 500</button>
                      <button className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200">Under 1K</button>
                      <button className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors bg-gray-100 text-gray-600 hover:bg-gray-200">Under 5K</button>
                      <button className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors bg-primary-600 text-white">Under 10K</button>
                    </div>
                  </div>

                  <hr className="border-gray-100" />
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900">Brands</h3>
                      <span className="text-xs text-primary-600 font-medium">1 selected</span>
                    </div>
                    <div className="space-y-2 max-h-52 overflow-y-auto">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" type="checkbox" checked />
                        <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Canon</span>
                      </label>
                    </div>
                  </div>

                  <hr className="border-gray-100" />
                  <button className="w-full py-2.5 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors">Clear All Filters</button>
                </div>
              </div>
            </div>

            <main className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <button className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">
                    Filters
                  </button>
                  <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
                    <button className="p-2 rounded-md transition-colors bg-primary-600 text-white">
                    </button>
                    <button className="p-2 rounded-md transition-colors text-gray-500 hover:text-gray-700">
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none bg-white">
                    <option value="">Relevance</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                    <option value="-ratingsAverage">Rating: High to Low</option>
                    <option value="title">Name: A to Z</option>
                    <option value="-title">Name: Z to A</option>
                  </select>
                </div>
              </div>

              <div className="mb-6 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  Active:
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary-100 text-primary-700 text-xs">
                  Electronics
                  <button className="hover:text-red-500">
                  </button>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-violet-100 text-violet-700 text-xs">
                  Canon
                  <button className="hover:text-red-500">
                  </button>
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs">
                  0 - 10000 EGP
                  <button className="hover:text-red-500">
                  </button>
                </span>
                <button className="text-xs text-gray-500 hover:text-gray-700 underline ml-2">Clear all</button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div id="product-card" className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="relative">
                    <Image
                    width={100}
                    height={100} 
                      className="w-full h-60 object-contain bg-white" 
                      alt="Archer VR300 AC1200 Wireless VDSL/ADSL Modem Router Black" 
                      src="https://ecommerce.routemisr.com/Route-Academy-products/1678305677165-cover.jpeg"
                    />
                    <div className="absolute top-3 right-3 flex flex-col space-y-2">
                      <button 
                        className="bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-red-500 hover:text-red-600" 
                        title="Remove from wishlist"
                      >
                      </button>
                      <button 
                        className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-sm"
                      >
                      </button>
                      <Link 
                        className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-sm" 
                        href="/products/6408e98e6406cd15828e8f30"
                      >
                      </Link>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-500 mb-1">Electronics</div>
                    <h3 className="font-medium mb-1 cursor-pointer " title="Archer VR300 AC1200 Wireless VDSL/ADSL Modem Router Black">
                      <a className="line-clamp-2" href="/products/6408e98e6406cd15828e8f30">Archer VR300 AC1200 Wireless VDSL/ADSL Modem Router Black</a>
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-amber-400 mr-2">
                        <div className="text-yellow-400">
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">4 (1)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div><span className="text-lg font-bold text-gray-800">1699 EGP</span></div>
                      <button 
                        className="h-10 w-10 rounded-full flex items-center justify-center transition bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-70" 
                        aria-label="Add to cart"
                      >
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}