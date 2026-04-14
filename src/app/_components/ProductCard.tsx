import React from 'react'
import { FaEye, FaBoxOpen, FaPlus, FaRegHeart, FaStar, FaSync } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import AddToCartBtn from './AddToCartBtn';
import AddToWishList from './AddToWishList';

import { product } from "@/types/product.type"
import { FaRegStar } from 'react-icons/fa6';

interface ProductCardPropsType {
  product: product
}


export default function productCard({product}: ProductCardPropsType) {





  return (
    <>
        <div key={product.id || product._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden  transition-all duration-500  hover:-translate-y-2 hover:shadow-sm">
                <div className="relative">
                    <Image
                    src={product.imageCover || (product.images && product.images[0]) || "/placeholder.png"}
                    alt={product.title || "product"}
                    width={300}
                    height={300}
                    className="w-full h-60 object-contain bg-white"
                    />
                    {product.priceAfterDiscount && (
                    <div className="absolute top-3 left-3">
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{Math.round(((product.price || 0) - (product.priceAfterDiscount || 0)) / (product.price || 1) * 100)}%
                        </span>
                    </div>
                    )}

                    <div className="absolute top-3 right-3 flex flex-col space-y-2">
                        <AddToWishList  product={product as product} />
                    <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-green-600 shadow-sm cursor-pointer">
                        <FaSync />
                    </button>
                    <Link href={`/products/${product.id || product._id}`} className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-green-600 shadow-sm">
                        <FaEye />
                    </Link>
                    </div>
                </div>

                <div className="p-4">
                <p className="text-xs text-gray-500 mb-1">{product.category?.name || "No Category"}</p>
                <Link href={`/products/${product.id || product._id}`} className="block line-clamp-2">
                    <h3 className="font-medium mb-1 text-gray-800">{product.title || "No Title"}</h3>
                </Link>
                <div className="flex items-center mb-2">
                    <div className="flex text-amber-400 mr-2">
                        {Array.from({ length: 5 }).map((_, i) => {
                        const rating = Math.round(product.ratingsAverage ?? 0);

                        return i < rating ? (
                            <FaStar key={i} className="text-yellow-400 text-lg" />
                        ) : (
                            <FaRegStar key={i} className="text-yellow-400 text-lg" />
                        );
                        })}
                    </div>
                    <span className="text-xs text-gray-500">
                    {product.ratingsAverage ?? 0} ({product.ratingsQuantity ?? 0})
                    </span>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    {product.priceAfterDiscount ? (
                        <>
                        <span className="text-lg font-bold text-green-600">{product.priceAfterDiscount} EGP</span>
                        <span className="text-sm text-gray-500 line-through">{product.price} EGP</span>
                        </>
                    ) : (
                        <span className="text-lg font-bold text-gray-800">{product.price} EGP</span>
                    )}
                    </div>
                    <AddToCartBtn productId={product._id!} />
                </div>
                </div>
            </div>
    </>
    )
}
