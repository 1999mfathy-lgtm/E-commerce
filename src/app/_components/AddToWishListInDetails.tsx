"use client"

import { FaHeart, FaRegHeart } from "react-icons/fa6"
import { useWishlist } from "../_context/wishListContextProvider"
import { addToWish, removeWish } from "../_actions/wishList.actions"
import { useState } from "react"
import { product } from "@/types/product.type"

export default function AddToWishListInDetails({ product }: { product: product }) {
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
 <button className="flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-600"
  onClick={() => { handleClick(product);  toggleWishlist(product);  }} disabled={loading}>
  {isInWishlist(product._id) ? (<> <FaHeart className="text-red-500 " />In Wishlist</> ) : (  <><FaRegHeart />  Add to Wishlist</>  )}
</button>
  )
}