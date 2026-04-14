"use server"
import { CartResType } from "@/types/cart.type";
import { getMyToken } from "@/utils/getMyToken"



export async function addToCart(id: string): Promise<CartResType> {
  try {
    const myToken = await getMyToken();

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v2/cart",
      {
        method: "POST",
        body: JSON.stringify({ productId: id }),
        headers: {
          "Content-Type": "application/json",
          token: myToken as string,
        },
        cache: "no-store", 
      }
    );

    const data = await res.json();

    return {
      ok: res.ok,
      ...data,
    };
  } catch (error) {
    console.error("Add to cart error:", error);

    return {
      ok: false,
      message: "Something went wrong",
      data: null,
    } as any;
  }
}

export async function getUserCart(): Promise<CartResType> {
  const myToken = await getMyToken();

  const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
    headers: {
      token: myToken as string,
    },
  });

  const data = await res.json();

  return {
    ok: res.ok,
    ...data,
  };
}


export async function updateCartItem (id : string , count :number) :Promise <CartResType>{

const myToken = await getMyToken()

const res = await fetch (`https://ecommerce.routemisr.com/api/v2/cart/${id}`,{
method:"PUT",
body:  JSON.stringify({count} )   ,
headers: { "Content-Type" : "application/json" ,
token: myToken as string
}
})
const finalRes = await res.json()

return {
   ok : res.ok,
    ...finalRes
 }


}




export async function deleteCartItem(productId: string): Promise<CartResType> {
  const myToken = await getMyToken();
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v2/cart/${productId}`,
    { method: "DELETE",
      headers: {
        token: myToken as string, },
    }
  );

  const data = await res.json();

  return {
    ok: res.ok,
    ...data,
  };
}


export async function clearCart() {

const myToken = await getMyToken()

const res = await  fetch (`https://ecommerce.routemisr.com/api/v2/cart`,{
headers :{ 
token :  myToken as string
},
method: "DELETE"
})
const data = await res.json();
console.log("dd",data);
return data

}