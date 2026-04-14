"use client";

import {
  CartContextType, cartItemType,  CartResType, } from "@/types/cart.type";
import React, { createContext, ReactNode, useState } from "react";
import { getUserCart } from "../_actions/cart.actions";

export const CartContext = createContext<CartContextType | null>(null);

export default function CartContextProvider({ children,  userCart, }: {  children: ReactNode; userCart?: CartResType; }) {
  const [numberOfCartItems, setnumberOfCartItems] = useState(
    userCart?.numOfCartItems ?? 0
  );

  const [totalPrice, settotalPrice] = useState<number>(
    userCart?.data?.totalCartPrice ?? 0
  );

  const [cartId, setCartId] = useState<string>(userCart?.cartId ?? "");

  const [cartProducts, setCartProducts] = useState<cartItemType[]>(
    userCart?.data?.products ?? []
  );

  const refreshCart = async () => {
    const res = await getUserCart();

    setnumberOfCartItems(res?.numOfCartItems ?? 0);
    settotalPrice(res?.data?.totalCartPrice ?? 0);
    setCartProducts(res?.data?.products ?? []);
  };

  return (
    <CartContext.Provider
      value={{
        numberOfCartItems,
        setnumberOfCartItems,
        cartProducts,
        setCartProducts,
        totalPrice,
        settotalPrice,
        refreshCart,
        cartId,
        setCartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}