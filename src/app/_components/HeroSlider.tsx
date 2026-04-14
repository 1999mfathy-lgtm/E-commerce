"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination} from "swiper/modules";
import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


export default function HeroSlider() {
  return (
    <div className="relative">

      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{ clickable: true }}
        
        loop
        className="h-100"
      >

        {/* Slide 1 */}
        <SwiperSlide>
        <div className="h-100 bg-[url('/hero.png')] bg-cover bg-center relative flex items-center">
            <div className="absolute inset-0 bg-linear-to-r from-green-600/90 to-green-400/50"></div>
            <div className="relative z-10 container mx-auto px-4 text-white">
              <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                Fresh Products Delivered to your Door </h2>
              <p>Get 20% off your first order</p>
              <div className="mt-4">
                <Link className="btn bg-white border-2 border-white/50 text-green-500 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform" href="/products">Shop Now</Link>
                <Link className="btn bg-transparent border-2 border-white/50 text-white ml-2 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform" href="/delivery">View Deals</Link>
                </div>
            </div>
        </div>
        </SwiperSlide>

        {/* Slide 2 */}
           <SwiperSlide>
        <div className="h-100 bg-[url('/hero.png')] bg-cover bg-center relative flex items-center">
            <div className="absolute inset-0 bg-linear-to-r from-green-600/90 to-green-400/50"></div>
            <div className="relative z-10 container mx-auto px-4 text-white">
              <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                Premium Quality Guaranteed</h2>
              <p>Fresh from farm to your table</p>
              <div className="mt-4">
                <Link className="btn bg-white border-2 border-white/50 text-blue-500 inline-block px-6 py-2 rounded-lg font-semibold " href="/products">Shop Now</Link>
                <Link className="btn bg-transparent border-2 border-white/50 text-white ml-2 inline-block px-6 py-2 rounded-lg font-semibold " href="/delivery">Learn More</Link>
                </div>
            </div>
        </div>
        </SwiperSlide>
{/* Slide 3 */}
    <SwiperSlide>
        <div className="h-100 bg-[url('/hero.png')] bg-cover bg-center relative flex items-center">
            <div className="absolute inset-0 bg-linear-to-r from-green-600/90 to-green-400/50"></div>
            <div className="relative z-10 container mx-auto px-4 text-white">
              <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                Fast & Free Delivery</h2>
              <p>Same day delivery available</p>
              <div className="mt-4">
                <Link className="btn bg-white border-2 border-white/50 text-purple-500 inline-block px-6 py-2 rounded-lg font-semibold " href="/products">Order Now</Link>
                <Link className="btn bg-transparent border-2 border-white/50 text-white ml-2 inline-block px-6 py-2 rounded-lg font-semibold " href="/delivery">Delivery Info</Link>
                </div>
            </div>
        </div>
        </SwiperSlide>
      </Swiper>

      <div className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
        <FaChevronLeft />
      </div>
      <div className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110">
        <FaChevronRight />
      </div>

    </div>
  );
}