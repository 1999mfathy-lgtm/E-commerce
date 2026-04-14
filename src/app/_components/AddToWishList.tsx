"use client"

import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { useWishlist } from "../_context/wishListContextProvider"
import { addToWish, removeWish } from "../_actions/wishList.actions"
import { useState } from "react"
import { product } from "@/types/product.type"

export default function AddToWishList({ product }: { product: product }) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const [loading, setLoading] = useState(false)

  async function handleClick(product: product) {
    setLoading(true)

    const exists = isInWishlist(product._id)

    try {
      if (exists) {
        await removeWish(product._id)
        toggleWishlist(product)
      } else {
        await addToWish(product._id)
        toggleWishlist(product)
      }
    } finally {
      setLoading(false)
    }
  }
  return (
 <button className="cursor-pointer text-lg bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-red-500"
  onClick={() => { handleClick(product);  toggleWishlist(product);  }} disabled={loading}>
  {isInWishlist(product._id) ? ( <FaHeart className="text-red-500 " /> ) : (  <FaRegHeart />  )}
</button>
  )
}