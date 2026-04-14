"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { paymentFormData, paymentSchema } from './payment.schema';
import * as zod from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { FaArrowLeft, FaBagShopping, FaBox, FaCheck, FaCircleInfo, FaCity, FaCreditCard, FaHouse, FaLocationDot, FaMoneyBill, FaPhone, FaReceipt, FaTruck, FaWallet } from 'react-icons/fa6';
import { FaShieldAlt } from 'react-icons/fa';
import { PaymentFormValues, shippingAddressType } from '@/types/order.type';
import { CartContext } from '../_context/cartContextProvider';
import { createCashOrder, createVisaOrder } from '../_actions/order.action';
import { toast } from 'react-toastify';
import Image from 'next/image';

export default function Checkout() {
  
  const { register, handleSubmit ,watch, setValue, formState: { errors }, } = useForm<paymentFormData>({
    resolver: zodResolver(paymentSchema), mode: "onChange",
    defaultValues: { details: "", city: "", phone: "" , type: "cash"},
  });
  const selectedType = watch("type");

const context = useContext(CartContext);
if (!context) {
  throw new Error("CartContext must be used within provider");
}

const { cartId , setnumberOfCartItems,setCartProducts,settotalPrice,} = context;
console.log(cartId,"ccd");


async function handlePayment(value: PaymentFormValues) {
  const userData: shippingAddressType = {
    shippingAddress: {
      details: value.details,
      city: value.city,
      phone: value.phone, },  };
  try {
    if (value.type === "cash") {
      const res = await createCashOrder(cartId, userData);
      console.log(res, "cash");
      toast.success(res.message)
      setnumberOfCartItems(0);
      setCartProducts([]);
      settotalPrice(0);
      return res;
    }
    if (value.type === "visa") {
      const res = await createVisaOrder(cartId, userData);
      window.open(res.session.url)
      console.log(res, "visa");
      toast.success(res.message)
      setnumberOfCartItems(0);
      setCartProducts([]);
      settotalPrice(0);
      return res;
    }

    throw new Error("Invalid payment method");
  } catch (error) {
    throw error;
  }
}



  return (
    <>
<div className="container mx-auto px-4  ">
<div className="mb-8 mt-8">
  <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
    <Link className="hover:text-green-600 transition" href="/">Home</Link><span className="text-gray-300">/</span>
    <Link className="hover:text-green-600 transition" href="/cart">Cart</Link><span className="text-gray-300">/</span>
    <span className="text-gray-900 font-medium">Checkout</span></nav>
  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
        <span className="bg-gradient-to-br from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/20">
         <FaReceipt />
        </span>
        Complete Your Order
      </h1>
      <p className="text-gray-500 mt-2">Review your items and complete your purchase</p>
    </div>
    <Link className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-all" href="/cart">
     <FaArrowLeft/>
      Back to Cart
    </Link>
  </div>
</div>



  <form onSubmit={handleSubmit(handlePayment)} >
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FaHouse className='text-white '/>
            Shipping Address
          </h2>
          <p className="text-green-100 text-sm mt-1">Where should we deliver your order?</p>
        </div>
        <div className="p-6 space-y-5">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <FaCircleInfo className='text-blue-600 text-sm'/>
            </div>
            <div>
              <p className="text-sm text-blue-800 font-medium">Delivery Information</p>
              <p className="text-xs text-blue-600 mt-0.5">Please ensure your address is accurate for smooth delivery</p>
            </div>
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
              <FaCity className='text-gray-500' />
              </div>
             
              <input {...register("city")} id="city" className="w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100" placeholder="e.g. Cairo, Alexandria, Giza" type="text" name="city" />
             {errors.city && ( <p className="text-red-500 text-xs mt-1">  {errors.city.message} </p> )}
            </div>
          </div>
          <div>
            <label htmlFor="details" className="block text-sm font-semibold text-gray-700 mb-2">Street Address <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
               <FaLocationDot className='text-gray-500' />
              </div>
              <textarea {...register("details")} id="details" rows={3} className="w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all resize-none border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100" placeholder="Street name, building number, floor, apartment..." name="details" defaultValue={""} />
               {errors.details && ( <p className="text-red-500 text-xs mt-1">  {errors.details.message} </p> )}
           
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
               <FaPhone className='text-gray-500'/>
              </div>
              <input {...register("phone")} id="phone" className="w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100" placeholder="01xxxxxxxxx" type="tel" name="phone" /><span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">Egyptian numbers only</span>
               {errors.phone && ( <p className="text-red-500 text-xs mt-1">  {errors.phone.message} </p> )}
           
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FaWallet />
            Payment Method
          </h2>
          <p className="text-green-100 text-sm mt-1">Choose how you'd like to pay</p>
            </div>
            <div className="p-6 space-y-4">
      <button type="button" onClick={() => setValue("type", "cash")}
      className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${  selectedType === "cash"
              ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm"
               : "border-gray-200 hover:border-green-200 hover:bg-gray-50"  }`} >
          <div className="w-14 h-14 rounded-xl flex items-center justify-center transition-all bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30">
            <FaMoneyBill className="text-2xl" />
          </div>

          <div className="flex-1 text-left">
            <h3 className="font-bold text-green-700">Cash on Delivery</h3>
            <p className="text-sm text-gray-500 mt-0.5">
              Pay when your order arrives at your doorstep
            </p>
          </div>

          {selectedType === "cash" && (
            <div className="w-7 h-7 rounded-full flex items-center justify-center bg-green-600 text-white">
              <FaCheck />
            </div>
                  )}
                </button>
        <button
          type="button"
          onClick={() => setValue("type", "visa")}
          className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
            selectedType === "visa"
              ? "border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm"
              : "border-gray-200 hover:border-green-200 hover:bg-gray-50" }`} >
    <div  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
      selectedType === "visa"
        ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
        : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
    }`}
  >
    <FaCreditCard className="text-2xl" />
  </div>

  <div className="flex-1 text-left">
    <h3 className="font-bold text-gray-900">Pay Online</h3>
    <p className="text-sm text-gray-500 mt-0.5">
      Secure payment with Credit/Debit Card via Stripe
    </p>

    <div className="flex items-center gap-2 mt-2">
      <Image width={20} height={20} src={"/visa.png"} className="h-5" alt='visa' />
      <Image width={20} height={20} src={"/amex.png"} className="h-5" alt='amex' />
      <Image width={20} height={20} src={"/mastercard.png"} className="h-5" alt='mastercard' />
    </div>
  </div>

  {selectedType === "visa" ? (
    <div className="w-7 h-7 rounded-full flex items-center justify-center bg-green-600 text-white">
      <FaCheck />
    </div>
  ) : (
    <div className="w-7 h-7 rounded-full border-2 border-gray-200" />
  )}
</button>

          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <FaShieldAlt className='text-green-600'/>
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">Secure & Encrypted</p>
              <p className="text-xs text-green-600 mt-0.5">Your payment info is protected with 256-bit SSL encryption</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <FaBagShopping />
            Order Summary
          </h2>
          <p className="text-green-100 text-sm mt-1">1 item</p>
        </div>
        <div className="p-5">
          <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                {/* <Image alt="Logo T-Shirt Green" className="w-full h-full object-contain" src="https://ecommerce.routemisr.com/Route-Academy-products/1680400287654-cover.jpeg" /> */}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Logo T-Shirt Green</p>
                <p className="text-xs text-gray-500 mt-0.5">1 × 744 EGP</p>
              </div>
              <p className="text-sm font-bold text-gray-900 shrink-0">744</p>
            </div>
          </div>
          <hr className="border-gray-100 my-4" />
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span><span className="font-medium">744 EGP</span></div>
            <div className="flex justify-between text-gray-600">
              <span className="flex items-center gap-2">
                <FaTruck />
                Shipping
              </span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <hr className="border-gray-100" />
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <div className="text-right"><span className="text-2xl font-bold text-green-600">744</span><span className="text-sm text-gray-500 ml-1">EGP</span></div>
            </div>
          </div>
          <button type="submit" 
        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-[0.98]"
          >  <FaBox /> Place Order </button>
          <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
             <FaShieldAlt className='text-green-600'/>
              <span>Secure</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <FaTruck className='text-blue-600'/>
              <span>Fast Delivery</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <FaBox className='text-orange-500'/>
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  </form>
</div>
    </>
  )
}
