export interface addressesResType {
  ok: boolean;
  data: {
    _id: string;
    name: string;
    details: string;
    phone: string;
    city: string;
  }[];
}

export interface addresses {
    _id: string;
    name: string;
    details: string;
    phone: string;
    city: string;
}

export interface EditAddressBtnProps {
  address: addresses;
}