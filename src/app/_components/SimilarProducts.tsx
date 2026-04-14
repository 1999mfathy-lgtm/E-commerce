"use client";

import { useEffect, useRef, useState } from "react";
import ProductCard from "@/app/_components/ProductCard";
import { product } from "@/types/product.type";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

export default function SimilarProducts({ categoryId,  productId, }: { categoryId?: string; productId?: string; }) {
  const [products, setProducts] = useState<product[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    const getSimilar = async () => {
      const res = await fetch(
        `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
      );

      const data = await res.json();

      setProducts(
        (data.data || []).filter((p: product) => p._id !== productId)
      );
    };

    getSimilar();
  }, [categoryId, productId]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  if (!products.length) return null;

  return (
    <div className="py-10">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
          <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">
            You May Also <span className="text-emerald-600">Like</span>
          </h2>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => scroll("left")}
              className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <LuChevronLeft />
            </button>

            <button
              onClick={() => scroll("right")}
              className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <LuChevronRight />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
        >
          {products.map((p) => (
            <div key={p._id} className="min-w-[250px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}