"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { WishlistContextType } from "@/types/wishList.type";
import { product } from "@/types/product.type";
import { getWishlist, removeWish } from "../_actions/wishList.actions";

type Props = {
  children: React.ReactNode;
};

const WishlistContext = createContext<WishlistContextType | null>(null);

export default function WishlistProvider({ children }: Props) {
  const [wishlist, setWishlist] = useState<product[]>([]);

  useEffect(() => {
    refreshWish();
  }, []);

  const refreshWish = async () => {
    try {
      const res = await getWishlist();

      const data = Array.isArray(res?.data) ? res.data : [];

      setWishlist(data);
    } catch (error) {
      console.error("Wishlist refresh error:", error);
    }
  };

  const addToWishlist = (product: product) => {
    setWishlist((prev) => {
      if (prev.some((p) => p._id === product._id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = async (id: string) => {
    try {
      await removeWish(id);
      await refreshWish(); 
    } catch (error) {
      console.error("Remove wishlist error:", error);
    }
  };

  const toggleWishlist = (product: product) => {
    const exists = wishlist.some((p) => p._id === product._id);

    if (exists) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((p) => p._id === id);
  };
  const setWishlistFromAPI = (data: product[]) => {
  setWishlist(data);
};

  return (
    <WishlistContext.Provider
   value={{
  wishlist,
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  isInWishlist,
  refreshWish,
  setWishlistFromAPI,
}}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside provider");
  return ctx;
};