export interface product {
  sold?: number
  images?: string[]
  ratingsQuantity?: number
  _id: string 
  id?: string
  title?: string
  slug?: string
  description?: string
  quantity?: number
  price?: number
  imageCover?: string
  ratingsAverage?: number
  createdAt?: string
  updatedAt?: string
  priceAfterDiscount?: number
  availableColors?: any[]
  reviews?: { rating: number }[];
  subcategory?: { _id?: string; name?: string }[];
  brand?: { name?: string };
  category?: {
    _id: string
    name?: string
    image?: string
  }
}


export interface productType {
  [x: string]: any
  _id: string
  title?: string
  price?: number
  imageCover?: string
  images?: string[]
}