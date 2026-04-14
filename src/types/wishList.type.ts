import { product,productType } from "@/types/product.type";




export type WishlistContextType = {
  wishlist: productType[];
  addToWishlist: (product: product) => void;
  removeFromWishlist: (id: string) => Promise<void>;
  isInWishlist: (id: string) => boolean;
  toggleWishlist: (product: product) => void;
  refreshWish: () => Promise<void>;
  setWishlistFromAPI: (data: productType[]) => void;
};

export type WishlistResType = {
  status: string;
  message?: string;
  data: productType[];
};