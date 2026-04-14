"use client";

import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { addToCart } from "../_actions/cart.actions";
import { toast } from "react-toastify";
import { CartContext } from "../_context/cartContextProvider";
import { MdDone } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

export default function AddToCartBtnInDetails({ productId }: { productId: string }) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const context = useContext(CartContext);
  if (!context) return null;

  const { refreshCart } = context;

async function handleAddToCart() {
  try {
    setLoading(true);
    setSuccess(false);

    const res = await addToCart(productId);

    if (res?.ok) {
      await refreshCart();
      toast.success(res.message, { position: "top-center" });
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    } else {
      toast.error("Failed to add");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
}

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
       className="flex-1 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 bg-green-600"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : success ? (
        <><MdDone className="text-white text-xl" />Add to Cart</>
      ) : (
        <><FaShoppingCart/> Add to Cart</>
        
      )}
    </button>
  );
}