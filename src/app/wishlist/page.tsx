"use client";
import React, { useContext, useEffect, useState } from "react";
import { useWishlist } from "../_context/wishListContextProvider";
import { getWishlist, removeWish } from "../_actions/wishList.actions";
import Link from "next/link";
import { FaArrowRight, FaCartShopping, FaCheck, FaHeart, FaRegHeart, FaTrash } from "react-icons/fa6";
import Image from "next/image";
import { CartContext } from "../_context/cartContextProvider";
import { productType } from "@/types/product.type";
import { addToCart } from "../_actions/cart.actions";
import { MdDone } from "react-icons/md";

export default function WishlistPage() {
  const [cartLoadingId, setCartLoadingId] = useState<string | null>(null);
  const [removeLoadingId, setRemoveLoadingId] = useState<string | null>(null);
const [successId, setSuccessId] = useState<string | null>(null);
  const wishlistContext = useWishlist();
  const cartContext = useContext(CartContext);

  if (!cartContext) return null;

  const { refreshCart, cartProducts } = cartContext;
  const { wishlist, removeFromWishlist, setWishlistFromAPI } = wishlistContext;

  async function handleAddToCart(item: productType) {
  try {
    setCartLoadingId(item._id);

    await addToCart(item._id);
    await refreshCart();

    setSuccessId(item._id);

    setTimeout(() => {
      setSuccessId(null);
    }, 1000);

  } catch (error) {
    console.error(error);
  } finally {
    setCartLoadingId(null);
  }
}


  const handleRemove = async (id: string) => {
    try {
      setRemoveLoadingId(id);
      await removeWish(id);
      await removeFromWishlist(id);
    } catch (err) {
      console.error(err);
    } finally {
      setRemoveLoadingId(null);
    }
  };

  useEffect(() => {
    async function loadWishlist() {
      try {
        const res = await getWishlist();

        const data = Array.isArray(res?.data) ? res.data : [];

        const safeData = data.filter((item: any) => item?._id);

        setWishlistFromAPI(safeData);
      } catch (error) {
        console.error("Wishlist error:", error);
      }
    }

    loadWishlist();
  }, []);

  return (
  
  <>
    <div className="min-h-screen bg-gray-50/50 ">
      {wishlist.length === 0 ? (
<div className="max-w-sm mx-auto text-center py-20">
  <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
    <FaRegHeart className="text-3xl text-gray-400" />
  </div>
  <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
  <p className="text-gray-500 text-sm mb-6">Browse products and save your favorites here.</p>
  <div className="flex flex-col gap-3">
    <Link className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors" href="/products">
      Browse Products <FaArrowRight/>
    </Link>
  </div>
</div>

      ) : ( <>
        <div className="bg-white border-b border-gray-100">
          <div className="container mx-auto px-4 py-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4"><Link className="hover:text-green-600 transition-colors" href="/">Home</Link><span>/</span><span className="text-gray-900 font-medium">Wishlist</span></nav>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-xl text-red-500">
                  <FaHeart/>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
                  <p className="text-gray-500 text-sm">{wishlist.length}  items saved</p>
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden ">
            <div className="bg-white rounded-xl overflow-hidden ">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-center">Actions</div>
            </div>
          <div className="divide-y divide-gray-100"> {wishlist.map((item) => {
                const productId = item?._id || item?.id;
              if (!productId) return null;
            const isInCart = Array.isArray(cartProducts) &&
            cartProducts.some(cartItem => cartItem.product._id === productId);
            return (
            <div key={productId}
          className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors" >

          <div className="md:col-span-6 flex items-center gap-4">
            <Link  className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
              href={`/products/${productId}`}
            > <Image  width={100}  height={100}  alt={item.brand.name}  src={item.imageCover || "/placeholder.png"}
                className="w-full h-full object-contain p-2" /> </Link>
            <div className="min-w-0">
              <Link  className="font-medium text-gray-900 hover:text-green-600 transition-colors line-clamp-2"
                href={`/products/${productId}`}
              >  {item.title} </Link>
              <p className="text-sm text-gray-400 mt-1">  {item.category?.name} </p>
            </div>
          </div>

          <div className="md:col-span-2 flex md:justify-center items-center gap-2">
        <span className="md:hidden text-sm text-gray-500">Price:</span>
        <div className="text-right md:text-center">
        <div className="text-right md:text-center">
        {item.priceAfterDiscount ? ( <> <span className="font-semibold text-gray-900 block"> {item.priceAfterDiscount} EGP </span>
            <span className="text-sm text-gray-400 line-through"> {item.price} EGP </span> </>
        ) : ( <span className="font-semibold text-gray-900"> {item.price} EGP  </span> )} </div>
              </div>
        </div>
                  <div className="md:col-span-2 flex md:justify-center">
                  {isInCart ? ( <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700"> <FaCartShopping/> In Cart </span> ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>In Stock</span> )}
              </div>

            <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
              {isInCart ? ( <Link href="/cart" className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all" >
              <FaCheck />  View Cart  </Link> ) : (
              <button onClick={() => handleAddToCart(item)}
              disabled={cartLoadingId === item._id}
              className="relative flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-3 py-2.5 min-w-[130px] rounded-lg text-sm font-medium transition-all bg-green-600 text-white hover:bg-green-700 disabled:opacity-70"
            > <span  className={`flex items-center gap-2 transition-opacity
            ${ cartLoadingId === item._id ? "opacity-0" : "opacity-100" }`} >
                {successId === item._id ? (<> <MdDone className="text-white text-xl" />Added </>  ) : ( <> <FaCartShopping />  Add to Cart </> )}  </span>
              {cartLoadingId === item._id && ( <div className="absolute w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> )} </button>  )}

            <button onClick={() => handleRemove(productId)} disabled={removeLoadingId === productId}
            className="cursor-pointer w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            > {removeLoadingId === productId ? (
  <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" /> ) : (  <FaTrash />)} </button>
                </div>  </div> ); })} </div>
</div>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <Link className="text-gray-500 hover:text-green-600 text-sm font-medium transition-colors" href="/products">
          ← Continue Shopping</Link>
          </div>
        </div>
   </>   )}


   </div> </>


  );
}