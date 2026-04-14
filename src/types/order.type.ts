export interface shippingAddressType {
  shippingAddress: {
    details: string;
    city: string;
    phone: string;
  };
}

export type PaymentFormValues = {
  details: string;
  city: string;
  phone: string;
  type: "cash" | "visa";
};