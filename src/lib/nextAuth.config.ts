import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials", 
      name: "Fresh Cart",
      credentials: {
        email: { label: "Email", type: "email", placeholder:"Enter Your Email"},
        password: { label: "Password", type: "password", placeholder:"Enter Your Password" },
      },

      async authorize(credentials) {
       
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }
        const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await res.json();
       

        if (!res.ok) {
        // console.log("LOGIN FAILED:", data);
        return null; 
        }
        const decoded: any = jwtDecode(data.token);
         console.log("API: authorize",data);
        return {
          id: decoded.id,
          name: data.user.name,
          email: data.user.email,
          realToken: data.token,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    maxAge:60*60*24
  },

  callbacks: {
jwt(params){
if(params.user){
  const decoded: any = jwtDecode(params.user.realToken as string);
  params.token.real=params.user.realToken as string
  params.token.id = params.user.id;}
console.log("params from jwt", params);
return params.token
},

session(params){
    if (params.token?.id) {
      params.session.user.id = params.token.id as string; }
  console.log("params from session", params);
  return params.session
}
  },


};