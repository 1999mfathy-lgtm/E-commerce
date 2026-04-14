"use client";

import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { addToCart } from "../_actions/cart.actions";
import { toast } from "react-toastify";
import { CartContext } from "../_context/cartContextProvider";
import { MdDone } from "react-icons/md";

export default function AddToCartBtn({ productId }: { productId: string }) {
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
      className="h-10 w-10 rounded-full flex items-center justify-center transition bg-green-600 text-white hover:bg-green-700 disabled:opacity-70 text-sm cursor-pointer"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : success ? (
        <MdDone className="text-white text-xl" />
      ) : (
        <FaPlus />
      )}
    </button>
  );
}