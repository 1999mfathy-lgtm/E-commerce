"use client"
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { FaArrowRight, FaBoxOpen, FaCartShopping, FaMinus, FaPlus, FaTrash, FaUser } from 'react-icons/fa6'
import { CartContext } from '../_context/cartContextProvider'
import Image from 'next/image'
import { cartItemType } from '@/types/cart.type'
import { clearCart, deleteCartItem, updateCartItem } from '../_actions/cart.actions'
import { toast } from 'react-toastify'
import Swal from "sweetalert2";
export default function Cart() {

const [loadingId, setLoadingId] = useState<string | null>(null);
const {numberOfCartItems, setnumberOfCartItems 
      ,cartProducts ,setCartProducts,totalPrice,settotalPrice} = useContext(CartContext)!

async function deleteItem(id: string) {
  try {
    setLoadingId(id);
    const res = await deleteCartItem(id);
    if (res) {
      toast.warning(res.message, { position: "top-center" });
      setCartProducts(res.data.products);
      setnumberOfCartItems(res.numOfCartItems);
      settotalPrice(res.data.totalCartPrice);
    }
  } finally {
    setLoadingId(null);
  }
}
async function updateItem (id : string, count:number) {
const res = await  updateCartItem (id , count)

if(res.status == "success"){

  setCartProducts(res.data.products)
    setnumberOfCartItems(res.numOfCartItems)
    settotalPrice(res.data.totalCartPrice)
}

}
async function clearAllCart() {
  const result = await Swal.fire({
    title: "Clear cart?",
    text: "All items will be removed!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#16a34a",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, clear it!",
  });

  if (result.isConfirmed) {
    try {
      Swal.fire({
        title: "Clearing...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });
      const res = await clearCart(); 
      if (res?.status === "success") {
        setCartProducts([]);
        setnumberOfCartItems(0);
        settotalPrice(0);
        Swal.fire({
          title: "Done!",
          text: "Cart cleared 🛒",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Error!", "Failed to clear cart", "error");
      }
    } catch {
      Swal.fire("Error!", "Something went wrong", "error");
    }
  }
}



  return (
    <>
    {numberOfCartItems > 0 ?<div className="bg-gray-50 min-h-screen py-8">
  <div className="container mx-auto px-4">
    <div className="mb-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link className="hover:text-green-600 transition" href="/">Home</Link><span>/</span><span className="text-gray-900 font-medium">Shopping Cart</span></nav>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <span className="bg-green-600 text-white w-12 h-12 rounded-xl flex items-center justify-center">
              <FaCartShopping/>
            </span>
            Shopping Cart
          </h1>
          <p className="text-gray-500 mt-2">You have <span className="font-semibold text-green-600">{numberOfCartItems} item</span> in your cart</p>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <div className="lg:col-span-2">
        
        {cartProducts.map((item :cartItemType)=>
        <div key={item.product._id} className="space-y-4 mb-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">
            <div className="flex gap-4 sm:gap-6">
              <Link className="relative shrink-0 group" href="/products/6428e884dc1175abc65ca096">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-gray-50 p-3 border border-gray-100 overflow-hidden">
                  <Image alt ={item.product.title ?? "product image"} width={40} height={40} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" src={item.product.imageCover!} /></div>
              </Link>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="mb-3">
                  <Link className="group/title" href="/products/6428e884dc1175abc65ca096">
                    <h3 className="font-semibold text-gray-900 group-hover/title:text-green-600 transition-colors leading-relaxed text-base sm:text-lg">{item.product.title}</h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-2"><span className="inline-block px-2.5 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">{item.product.category?.name}</span></div>
                </div>
                <div className="mb-4"><span className="text-green-600 font-bold text-lg">{item.price} EGP</span></div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                    <button onClick={() => updateItem(item.product._id, item.count - 1)} disabled={item.count <= 1} className="cursor-pointer  h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 disabled:opacity-40 transition-all">
                      <FaMinus/>
                    </button>
                    <span className="w-12 text-center font-bold text-gray-900">{item.count}</span>
                    <button onClick={() => updateItem(item.product._id, item.count + 1)} className="cursor-pointer h-8 w-8 rounded-lg bg-green-600 shadow-sm flex items-center justify-center text-white hover:bg-green-700 transition-all">
                      <FaPlus/>
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-0.5">Total</p>
                      <p className="text-xl font-bold text-gray-900">{item.count * item.price}<span className="text-sm font-medium text-gray-400"> EGP</span></p>
                    </div>
                    <button
          onClick={() => item.product?._id && deleteItem(item.product._id)}
          disabled={loadingId === item.product._id}
          className="cursor-pointer h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center transition-all duration-200 disabled:opacity-50"
          title="Remove item" > {loadingId === item.product._id ? (
            <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div> ) : ( <FaTrash /> )} </button>
                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>)}
        
        <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
          <Link className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-2" href="/"><span>←</span> Continue Shopping</Link>
          <button onClick={ clearAllCart } className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors cursor-pointer ">
            <FaTrash/>
            <span>Clear all items</span>
          </button>
        </div>
      </div>
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-4">
          <div className="bg-gray-900 p-5">
            <h2 className="text-white font-bold text-lg">Order Summary</h2>
          </div>
          <div className="p-5 space-y-4">
            <div className="flex justify-between text-gray-600"><span>Subtotal ({numberOfCartItems} items)</span><span className="font-semibold">{totalPrice} EGP</span></div>
            <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="text-green-600 font-medium">FREE</span></div>
            <hr className="border-gray-200" />
            <div className="flex justify-between text-lg font-bold"><span>Estimated Total</span><span className="text-green-600">{totalPrice} EGP</span></div>
            <div className="pt-4 space-y-3">
              <Link href="/checkout" className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3.5 rounded-xl font-semibold hover:bg-green-700 transition-all" >
              <FaUser/>
                Login to Checkout
              </Link>
              <p className="text-xs text-gray-400 text-center">Don't have an account? 
                <Link className="text-green-600 hover:underline" href="/signup?redirect=/cart">Sign up</Link></p>
            </div>
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <p className="text-xs text-gray-500">✓ Your cart items will be saved</p>
              <p className="text-xs text-gray-500">✓ Track your orders easily</p>
              <p className="text-xs text-gray-500">✓ Access exclusive member deals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>:<div className="min-h-[60vh]  items-center justify-center px-4 mx-auto ">
  <div className="max-w-md text-center">
    <div className="relative mb-8">
      <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-5xl text-gray-300">
      <FaBoxOpen/>
      </div>
    </div>
    <h2 className="text-2xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
    <p className="text-gray-500 mb-8 leading-relaxed">Looks like you haven't added anything to your cart yet.<br />Start exploring our products!</p>
    <Link className="inline-flex items-center gap-2 bg-green-600 text-white py-3.5 px-8 rounded-xl font-semibold hover:bg-green-700 transition-all shadow-lg active:scale-[0.98]" href="/products">
      Start Shopping
    <FaArrowRight/>
    </Link>
  </div>
</div>}

    </>
  )
}
