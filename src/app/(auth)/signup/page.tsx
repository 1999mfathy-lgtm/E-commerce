"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import Image from "next/image";
import { FaFacebook, FaGoogle, FaStar, FaTruckFast, FaUserPlus } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import Link from "next/link";
import { SignUpFormData, signUpSchema } from './signUp.schema'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";


export default function SignupForm() {
  const Router = useRouter()
  const [agreed, setAgreed] = useState(false);

  const { register, handleSubmit, watch, formState: { errors }, } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema), mode: "onChange",
    defaultValues: { name: "", email: "", password: "", rePassword: "", phone: "" }, });

  const password = watch("password");
  const getStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[#?!@$%^&*-]/.test(password)) score++;
    return score;
  };
  const strength = getStrength();
  const handleSignUp = async (values: SignUpFormData) => {
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      // console.log("Server Response:", data);
      toast.success(data.message ,{position: "top-center"});
      Router.push("/login")
    } catch (err) {
      toast.error("Network error, please try again");
    }
  };

  return (
    <>
  
<main className="py-10">
  <div className="container max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
    <div>
      <h1 className="text-4xl font-bold">
        Welcome to <span className="text-green-600">FreshCart</span>
      </h1>
      <p className="text-xl mt-2 mb-4">
        Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
      </p>
      <ul className="*:flex *:items-start *:gap-4 space-y-6 my-8">
        <li>
          <div className="size-12 bg-green-200 text-green-600 rounded-full flex justify-center items-center text-xl" ><FaStar/></div>
          <div>
            <h2 className="text-lg font-semibold">Premium Quality</h2>
            <p className="text-gray-600"> Premium quality products sourced from trusted suppliers. </p>
          </div>
        </li>

        <li>
          <div className="size-12 bg-green-200 text-green-600 rounded-full flex justify-center items-center text-xl" ><FaTruckFast /></div>
          <div>
            <h2 className="text-lg font-semibold">Fast Delivery</h2>
            <p className="text-gray-600">
              Same-day delivery available in most areas
            </p>
          </div>
        </li>

        <li>
          <div className="size-12 bg-green-200 text-green-600 rounded-full flex justify-center items-center text-xl" ><FaShieldAlt /></div>
          <div>
            <h2 className="text-lg font-semibold">Secure Shopping</h2>
            <p className="text-gray-600">
              Your data and payments are completely secure
            </p>
          </div>
        </li>
      </ul>

      <div className="bg-white shadow-sm p-4 rounded-md">
        <div className="flex items-center gap-4 mb-4">
          <Image
            className=" rounded-full"
            src="/images/image12.webp"
            alt="author"
            width={48}
            height={48}
          />
          
          <div>
            <h3>Sarah Johnson</h3>
            <div className="flex text-yellow-300 text-xl">
              <FaStar/><FaStar/><FaStar/><FaStar/><FaStar/>
            </div>
          </div>
        </div>

        <div>
          <p className="italic text-gray-700">
            "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
          </p>
        </div>
      </div>
    </div>

    <div className="bg-white rounded-2xl shadow-lg px-6 py-10 text-gray-700">
      <h2 className="text-center text-3xl font-semibold mb-2">
        Create Your Account
      </h2>
      <p className="text-center">
        Start your fresh journey with us today
      </p>
      <div className="flex gap-2 *:grow my-10">
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300  bg-white hover:bg-gray-100 transition-all duration-300 hover: disabled:opacity-50 disabled:cursor-not-allowed"
        ><FaGoogle className='text-red-600'/>
          <span >Google</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300  bg-white hover:bg-gray-100 transition-all duration-300 hover: disabled:opacity-50 disabled:cursor-not-allowed"
        ><FaFacebook className='text-blue-600'/>
          <span>Facebook</span>
        </button>
      </div>

      <div className="relative w-full h-0.5 bg-gray-300/30 my-4 flex items-center before:content-['or'] before:absolute before:top-1/2 before:left-1/2 before:-translate-1/2 before:bg-white before:px-4" />
      <form onSubmit={handleSubmit(handleSignUp)} className="space-y-7">
        <div className="flex flex-col gap-2">
          <label>Name*</label>
          <input {...register("name")} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" placeholder="Ali" />
          {errors.name && watch("name") &&  ( <p className="text-red-500 text-sm"> {errors.name.message as string} </p> )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Email*</label>
          <input {...register("email")} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" placeholder="ali@example.com" />
          {errors.email && watch("email") && ( <p className="text-red-500 text-sm">  {errors.email.message as string} </p> )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Password*</label>
          <input {...register("password")} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" type="password" placeholder="create a strong password"/>
          {errors.password && watch("password") && ( <p className="text-red-500 text-sm">  {errors.password.message as string} </p> )}
        
<div className="flex items-center gap-2">
  <div className="relative w-full h-1 bg-gray-200 rounded-full overflow-hidden">
    <div
      className={`h-full transition-all duration-500 ease-out rounded-full
        ${ !password
            ? "w-0" 
            : strength <= 2
            ? "w-1/4 bg-red-500"
            : strength === 3
            ? "w-2/4 bg-yellow-500"
            : strength === 4
            ? "w-3/4 bg-blue-500"
            : "w-full bg-green-500" } `} />
  </div>

  <span className="text-sm font-medium">
    {!password
      ? "" 
      : strength <= 2
      ? "Weak"
      : strength === 3
      ? "Medium"
      : strength === 4
      ? "Good"
      : "Strong"}
  </span>
</div>

            <p className='text-gray-500 -mt-2 text-xs'>Must be at least 8 characters with numbers and symbols</p>

        </div>
        <div className="flex flex-col gap-2">
          <label>Confirm Password*</label>
          <input {...register("rePassword")} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" type="password" placeholder="confirm your password"/>
          {errors.rePassword && watch("rePassword") &&  ( <p className="text-red-500 text-sm">  {errors.rePassword.message as string} </p> )}
        </div>

        <div className="flex flex-col gap-2">
          <label>Phone Number*</label>
          <input {...register("phone")} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" placeholder="+1 234 567 8900" />
          {errors.phone && watch("phone") && ( <p className="text-red-500 text-sm">  {errors.phone.message as string} </p> )}
        </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="size-4 accent-green-600"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <label>
          I agree to the{" "}
          <Link href="/Term" className="text-green-600 hover:underline">Terms of Service</Link> and{" "}
          <Link href="/Privacy" className="text-green-600 hover:underline">Privacy Policy</Link>*
        </label>
      </div>

      <button
        type="submit"
        disabled={!agreed}
        className={`w-full px-6 py-2 rounded-xl font-semibold text-white transition-all duration-300 ${
          agreed ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Create My Account
      </button>
      </form>
       <p className="border-t pt-10 border-gray-300/30 my-4 text-center">Already have an account?
        <Link className="text-green-600 hover:underline font-medium" href="/login">Sign In</Link></p>

    </div>
  </div>
</main>
    </>
  )
}
