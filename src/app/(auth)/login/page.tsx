"use client"
import { signIn } from "next-auth/react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import Image from "next/image";
import { FaClock, FaEnvelope, FaEye, FaEyeSlash, FaFacebook, FaGoogle, FaLock, FaStar, FaTruck, FaUsers } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import Link from "next/link";
import { loginFormData, loginSchema } from './login.schema'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { CartContext } from "@/app/_context/cartContextProvider";
import { useWishlist } from "@/app/_context/wishListContextProvider";


export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

 const context = useContext(CartContext);
if (!context) return null;
const { refreshCart } = context;
const { refreshWish } = useWishlist();
  const Router = useRouter()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({
    resolver: zodResolver(loginSchema), mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

const [loading, setLoading] = useState(false);

const handleLogin = async (values: loginFormData) => {
  setLoading(true);

  const res = await signIn("credentials", {
    email: values.email,
    password: values.password,
    redirect: false, });

  setLoading(false);
  //  console.log(res);
  if (res?.ok) {
   await refreshCart();
   await refreshWish();
    toast.success("Login successful",{position: "top-center"});
    Router.push("/home");
  } else {
    toast.error("Invalid email or password");
  }


 

}

  return (
    <>
      
<div className="container py-16 mx-auto px-4" id="login-section">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
    <div className="hidden lg:block">
      <div className="text-center space-y-6">
        <Image width={500} height={700} className="w-full h-96 object-cover rounded-2xl shadow-lg" alt="fresh" src={"/fresh veg.png"} />
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">FreshCart - Your One-Stop Shop for Fresh Products</h2>
          <p className="text-lg text-gray-600">Join thousands of happy customers who trust FreshCart for their daily grocery needs</p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
            <FaTruck className='text-green-600'/>
             Free Delivery
            </div>
            <div className="flex items-center gap-2">
              <FaShieldAlt className='text-green-600'/>
             Secure Payment
            </div>
            <div className="flex items-center gap-2">
              <FaClock className='text-green-600'/>
            24/7 Support
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-green-600">Fresh<span className="text-gray-800">Cart</span></span></div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Sign in to continue your fresh shopping experience</p>
        </div>
        <div className="space-y-3 mb-6">
          <button type="button" className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200">
          <FaGoogle className='text-red-500 text-lg'/>
            <span className="font-medium text-gray-700">Continue with Google</span>
          </button>
          <button type="button" className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200">
          <FaFacebook className='text-blue-600 text-lg'/>
            <span className="font-medium text-gray-700">Continue with Facebook</span>
          </button>
        </div>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500 font-medium">OR CONTINUE WITH EMAIL</span></div>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6 ">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <input {...register("email")} className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all" placeholder="Enter your email" id="email" type="email" name="email" />
              <FaEnvelope className=' absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'/>
              {errors.email && ( <p className="text-red-500 text-sm mt-1">{errors.email.message}</p> )}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2"><label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
            <Link className="text-sm text-green-600 hover:text-green-700 cursor-pointer font-medium" href="/signup">Forgot Password?</Link></div>
            <div className="relative">
              <input {...register("password")} id="password" className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all" placeholder="Enter your password"  type={showPassword ? "text" : "password"} name="password" />
              <FaLock className=' absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'/>
              {errors.password && ( <p className="text-red-500 text-sm mt-1">{errors.password.message}</p> )}
             <button type="button" onClick={() => setShowPassword(!showPassword)}
             
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" >
            {showPassword ? <FaEyeSlash className="cursor-pointer" /> : <FaEye className="cursor-pointer" />} </button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input className="h-4 w-4 text-green-600 accent-green-600 border-2 border-gray-300 rounded focus:ring-green-500" type="checkbox" name="rememberMe" />
              <span className="ml-3 text-sm text-gray-700">Keep me signed in</span></label></div>
         <button  type="submit"  disabled={loading}
          className="cursor-pointer w-full bg-green-600 text-white py-3 px-4 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2" >
           {loading ? ( <>  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
           Signing in...  </>  ) : (  "Sign In"  )} </button>
        </form>
        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-600">New to FreshCart?
            <Link className="text-green-600 hover:text-green-700 ms-2 font-semibold cursor-pointer" href="/signup">Create an account</Link></p>
        </div>
        <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
           <FaLock/>
            SSL Secured
          </div>
          <div className="flex items-center gap-1.5">
          <FaUsers/>
            50K+ Users
          </div>
          <div className="flex items-center gap-1.5">
          <FaStar/>
            4.9 Rating
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
