"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowRight, FaTags } from "react-icons/fa";

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands", { cache: "no-store" });
        const data = await res.json();
        setBrands(data.data);
      } catch (err) {
        console.error("Failed to fetch brands:", err);
      }
    };

    fetchBrands();
  }, []);

  return (
    <>
      {/* Header */}
      <div className="bg-linear-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link  href="/home" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Brands</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 text-3xl">
              <FaTags />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Top Brands</h1>
              <p className="text-white/80 mt-1">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {brands.map((brand) => (
            <Link
              key={brand._id}
              href={`/products?brand=${brand._id}`}
              className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm hover:shadow-xl hover:border-violet-200 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 p-4 flex items-center justify-center">
                <Image
                width={100}
                height={100}
                  alt={brand.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  src={brand.image}
                />
              </div>
              <h3 className="font-semibold text-gray-900 text-center text-sm group-hover:text-violet-600 transition-colors truncate">
                {brand.name}
              </h3>
              <div className="flex justify-center mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-violet-600 flex items-center gap-1">
                  View Products <FaArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}