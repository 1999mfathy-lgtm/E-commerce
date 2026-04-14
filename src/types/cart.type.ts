import { productType } from "./product.type"

export  interface CartResType {
cartId:string
message:string
status:string
numOfCartItems:number
ok:boolean
data:{totalCartPrice:number
products: cartItemType[]

}
}

export  interface cartItemType{
_id: any
count :number
price: number
product: productType

}

 export interface CartContextType {
  numberOfCartItems: number;
  setnumberOfCartItems: React.Dispatch<React.SetStateAction<number>>;
  cartProducts: cartItemType[]
  setCartProducts: (products: cartItemType[]) => void
  totalPrice: number
  settotalPrice: (price: number) => void
  refreshCart: () => Promise<void>;
  cartId: string ;
  setCartId : any
}



