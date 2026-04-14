"use server"
import { getMyToken } from "@/utils/getMyToken"


export async function getWishlist() {
  const token = await getMyToken()
   const res = await fetch( "https://ecommerce.routemisr.com/api/v1/wishlist",
    { headers: { token: token as string },
      cache: "no-store", } )
const finalRes = await res.json()
  return finalRes
}

export async function addToWish(id: string) {
  const token = await getMyToken()
  const res = await fetch( "https://ecommerce.routemisr.com/api/v1/wishlist",
    { method: "POST",
      headers: { "Content-Type": "application/json",
      token: token as string, },
      body: JSON.stringify({ productId: id }), } )
  const finalRes = await res.json()
  // console.log(finalRes ,"resk");
  return finalRes
}



export async function removeWish(id: string) {
  const token = await getMyToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {
      method: "DELETE",
      headers: { token: token as string },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to remove item");
  }

  return res.json();
}
