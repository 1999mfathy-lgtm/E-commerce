"use server"
import { shippingAddressType } from "@/types/order.type";
import { getMyToken } from "@/utils/getMyToken";


export async function createCashOrder(cartId:string, shippingAddress :shippingAddressType){
    const token = await getMyToken()
const res = await fetch (`https://ecommerce.routemisr.com/api/v2/orders/${cartId}`,{
   headers :{
        token: token as string,
        "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(shippingAddress)
} )
const finalRes = await res.json()
return finalRes }



export async function createVisaOrder(cartId:string, shippingAddress :shippingAddressType){
 const token = await getMyToken()
 const res = await fetch (`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
   headers :{  token: token as string,
        "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(shippingAddress)
} )
const finalRes = await res.json()
return finalRes
 }

export async function getUserOrders(userId: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    {
      cache: "no-store", 
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }
  
  const finalRes = await res.json();
  return finalRes ;
}