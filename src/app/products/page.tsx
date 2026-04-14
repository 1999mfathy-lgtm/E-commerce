"use client";
import Image from "next/image";
import Link from "next/link";
import { FaBoxOpen, FaFilter, FaLayerGroup, FaTags,FaFolderOpen } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../_components/ProductCard"
import { productType } from "@/types/product.type";
import { MdClose } from "react-icons/md";



export interface Category {
  _id?: string;
  name?: string;
  slug?: string;
  image?: string;
}

export default function Shop() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category") ?? "";
  const brandId = searchParams.get("brand") ?? "";
  const subcategoryId = searchParams.get("subcategory");											

  const [products, setProducts] = useState<productType[]>([]);
  const [headerName, setHeaderName] = useState<string>("All Products");
  const [headerImage, setHeaderImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      let query = "";
      if (categoryId) query = `?category=${categoryId}`;
      else if (brandId) query = `?brand=${brandId}`;
	  else if (subcategoryId) query = `?subcategory=${subcategoryId}` ;

      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products${query}`, { cache: "no-store" });
      const data = await res.json();
      setProducts(data.data);

      if (data.data.length > 0) {
        if (categoryId) {
          setHeaderName(data.data[0].category?.name || "Category");
          setHeaderImage(data.data[0].category?.image || null);
        } else if (brandId) {
          setHeaderName(data.data[0].brand?.name || "Brand");
          setHeaderImage(data.data[0].brand?.image || null);
        }
		      else if (subcategoryId) {
          setHeaderName(data.data[0].subcategory[0]?.name || "Subcategory");
          setHeaderImage(data.data[0].subcategory[0]?.image || null);
        } 
        else {
          setHeaderName("All Products");
          setHeaderImage(null);
        }
      } else {
        setHeaderName(brandId ? "Brand" : categoryId ? "Category" : "All Products");
        setHeaderImage(null);
      }
    };

    fetchProducts();
}, [categoryId, brandId, subcategoryId]);

  return (
    <div className="min-h-screen ">
      <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          <div className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
            <Link href="/home">
              <span className="hover:text-white transition-colors">Home</span>
            </Link>
                {subcategoryId || categoryId ? (
                    <>
                      <span className="text-white/40">/</span>
                      <Link href="/categories" className="hover:text-white transition-colors">
                        Categories
                      </Link>
                    </>
                  ) : null}

                  {brandId ? (
                    <>
                      <span className="text-white/40">/</span>
                      <Link href="/brands" className="hover:text-white transition-colors">
                        Brands
                      </Link>
                    </>
             ) : null}

            <span className="text-white/40">/</span>
            <span className="text-white font-medium">{headerName}</span>
          </div>

          <div className="flex items-center gap-5">
             <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              {headerImage ? (
                <Image
                  src={headerImage}
                  alt={headerName}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              ) : subcategoryId ? ( 
                <FaFolderOpen className="text-white w-9 h-8" /> 
              ) : (
                <FaBoxOpen className="text-white w-9 h-8" /> 
              )}
            </div>
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                {headerName}
              </h1>
             <p className="text-white/80 mt-1 text-sm sm:text-base">
                {categoryId
                  ? `Browse products in ${headerName}`
                  : brandId
                  ? `Shop ${headerName} products`
                  : subcategoryId
                  ? `Browse ${headerName}  products`
                  : "Explore our complete product collection"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 ">

      <div className="mb-6 flex items-center gap-3 flex-wrap">
          {categoryId || brandId || subcategoryId ? (
            <>
              <span className="flex items-center gap-2 text-sm text-gray-600">
                <FaFilter/>
                Active Filters:
              </span>
              <Link
                  href="/products"
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                    ${categoryId ||  subcategoryId ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-violet-100 text-violet-600 hover:bg-violet-200'}
                    text-sm font-medium transition-colors`}
                >
                  {categoryId ? (
                    <FaLayerGroup className="w-4 h-3" />
                  ) : subcategoryId ? (
                    <FaFolderOpen className="w-4 h-3" />
                  ) : (
                    <FaTags className="w-4 h-3" />
                  )}

                  {headerName}
                  <MdClose />
                </Link>

              <Link
                className="text-sm text-gray-500 hover:text-gray-700 underline"
                href="/products"
              >
                Clear all
              </Link>
            </>
          ) : null}
        </div>
        <div className="mb-6 text-sm text-gray-500">Showing {products.length} products</div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <FaBoxOpen className="text-gray-400 w-9 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No Products Found</h3>
            <p className="text-gray-500 mb-6">No products match your current filters.</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              View All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} /> ))}
          </div>
        )}
      </div>
    </div>
  );
}
