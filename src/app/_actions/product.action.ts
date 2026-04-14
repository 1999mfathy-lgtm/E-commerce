import { product } from "@/types/product.type";

export async function getProductData(id: string): Promise<product>  {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return data.data;
}

export async function getReviews(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}/reviews`,
    { cache: "no-store" }
  );

  const data = await res.json();
  return data.data || [];
}



