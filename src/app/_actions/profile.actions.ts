"use server"
import { addressesResType } from "@/types/address.type";
import { getMyToken } from "@/utils/getMyToken"


export async function getUserAdresses(): Promise<addressesResType> {
  const myToken = await getMyToken();

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
    headers: {
      token: myToken as string,
    },
  });

  const data = await res.json();
  console.log(data,"Data::")
  return {
    ok: res.ok,
    ...data,
  };
}


export async function AddAdresses(form : string): Promise<addressesResType> {
  const myToken = await getMyToken()
 
  const res = await fetch ("https://ecommerce.routemisr.com/api/v1/addresses",{
  method:"POST",
  body: form,
  headers: { "Content-Type" : "application/json" ,
  token: myToken as string
  }
  })
  const finalRes = await res.json()
  console.log(finalRes,"finalRes");
  
  return {
      ok : res.ok,
        ...finalRes
    }
}
export async function EditAdresses(
  addressId: string,
  form: {
    name: string;
    details: string;
    phone: string;
    city: string;
  }
) {
  const myToken = await getMyToken();

  const payload = [addressId, form];
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/addresses",
    {
      method: "POST",
      body: JSON.stringify(payload), 
      headers: {
        "Content-Type": "application/json",
        token: myToken as string,
      },
    }
  );

  const finalRes = await res.json();
  console.log(finalRes, "finalRes");

  return {
    ok: res.ok,
    ...finalRes,
  };
}
export async function deleteAddress(addressId: string) {
  const myToken = await getMyToken();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: {
        token: myToken as string,
      },
    }
  );

  return res.json();
}

export async function updateUserProfile(form: {
  name: string;
  email: string;
  phone: string;
}) {
  const myToken = await getMyToken();
  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/updateMe/",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: myToken as string,
        },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    return {
      ok: res.ok,
      ...data,
    };
  } catch (err) {
    console.error("Update profile error:", err);
    throw err;
  }
}


export async function changeUserPassword(form: {
  currentPassword: string;
  password: string;
  rePassword: string;
}) {
  const myToken = await getMyToken();

  try {
    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: myToken as string,
        },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    return {
      ok: res.ok,
      ...data,
    };
  } catch (err) {
    console.error("Change password error:", err);
    throw err;
  }
}