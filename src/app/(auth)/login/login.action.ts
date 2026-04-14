"use server"
import { loginFormData} from './login.schema'
export async function loginAction(values: loginFormData){


          const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          const data = await res.json();
          
          
          return res.ok

}


  