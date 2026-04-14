
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaBagShopping,
  FaBox,
  FaBoxOpen,
  FaCalendar,
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaCreditCard,
  FaHashtag,
  FaLocationDot,
  FaMoneyBill,
  FaPhone,
  FaReceipt,
  FaTruck,
} from "react-icons/fa6";

import { getUserOrders } from "../_actions/order.action";
import {  useSession } from 'next-auth/react'


export default  function Orders() {

  const { data: session } = useSession();
  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.user?.id) return;

      const data = await getUserOrders(session.user.id);
      setOrders(data);
    };

    fetchOrders();
  }, [session?.user?.id]);

  const [orders, setOrders] = useState<any[]>([]);
  const [openOrder, setOpenOrder] = useState<string | null>(null);
  const toggleDetails = (id: string) => {
    setOpenOrder(openOrder === id ? null : id);
  };


  return (


    <>
 {orders.length==0 ?(<div className="min-h-[60vh] flex items-center justify-center px-4 hidden">
        <div className="max-w-sm text-center">
          <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
      
            <FaBoxOpen />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">When you place orders, they'll appear here<br />so you can track them.</p>
          <Link className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3.5 px-8 rounded-xl font-semibold transition-all shadow-lg shadow-green-600/20 w-full sm:w-auto" href="/">
          
            <FaBagShopping />
            Start Shopping
          </Link>
        </div>
      </div>):(
<div className="container mx-auto px-4 py-8">
  <div className="mb-8">
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <Link className="hover:text-green-600 transition" href="/">Home</Link>
      <span className="text-gray-300">/</span><span className="text-gray-900 font-medium">My Orders</span></nav>
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25">
           <FaBox  className="text-white text-2xl"/>
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-500 text-sm mt-0.5">Track and manage your {orders.length} order</p>
        </div>
      </div>
      <Link className="self-start sm:self-auto text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-green-50 transition-all text-sm" href="/products">
         <FaBagShopping />
        Continue Shopping
      </Link>
    </div>
  </div>
  <div className="space-y-4">
    
  {orders.map((order) => (
    <div key={order._id} className="bg-white rounded-2xl border transition-all duration-300 overflow-hidden border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200">
      <div className="p-5 sm:p-6">
        <div className="flex gap-5">
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden">
              <Image width={50} height={50} alt="d" className="w-full h-full object-contain" src={order.cartItems[0].product.imageCover} /></div>
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">+{order.cartItems.length-1}</div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                   {order.isPaid ? (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 rounded-lg mb-2">
                        <FaTruck className="text-blue-600"  />
                        <span className="text-xs font-semibold text-blue-600">On the way</span>
                      </div>  ) : (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-100 rounded-lg mb-2">
                      <FaClock className="text-amber-600" />
                      <span className="text-xs font-semibold text-amber-600">Processing</span>
                    </div>  )}
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                
              <FaHashtag />
              {order.id}
                </h3>
              </div>
              {order.isPaid ? (
                  <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-purple-100">
                   <FaCreditCard  className="text-purple-600"  />
                   </div> ) : (
                <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
                          <FaMoneyBill  className="text-gray-600" />
                   </div> )}
              
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
              <FaCalendar />
              {new Date(order.createdAt).toLocaleDateString()}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5">
              <FaBox />
              {order.cartItems.length} items
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5">
              <FaLocationDot />

              {order.shippingAddress.city}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div><span className="text-2xl font-bold text-gray-900"> {order.totalOrderPrice}</span>
              <span className="text-sm font-medium text-gray-400 ml-1">EGP</span></div>
              <button
                  onClick={() => toggleDetails(order._id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    openOrder === order._id
                      ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200" }`} >
                  {openOrder === order._id ? "Hide" : "Details"}
                  {openOrder === order._id ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>
          </div>
        </div>
      </div>
      {openOrder === order._id && (
            <div className="border-t border-gray-100 bg-gray-50/50">
        <div className="p-5 sm:p-6">
            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                  <FaReceipt className="text-green-600"/>
              </div>
              Order Items
            </h4>
            <div className="space-y-3">
              {order.cartItems.map((item: any) => (
                  <div key={item._id} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
                      <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0">
                        <Image width={50} height={50} alt="Logo T-Shirt Green" className="w-full h-full object-contain"   src={item.product.imageCover} /></div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{item.product.title}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          <span className="font-medium text-gray-700"> {item.count} </span>× {item.price} EGP</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-bold text-gray-900">{item.price * item.count} </p>
                        <p className="text-xs text-gray-400">EGP</p>
                      </div>
                  </div>
               ))}
            </div>
        </div>
          <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-gray-100">
                <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FaLocationDot className="text-blue-600"/>
                    </div>
                    Delivery Address
                </h4>
                <div className="space-y-2">
                    <p className="font-medium text-gray-900">{order.shippingAddress.city}</p>
                    <p className="text-sm text-gray-600 leading-relaxed"> {order.shippingAddress.details}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-2 pt-1">
                    <FaPhone/>
                    {order.shippingAddress.phone}
                    </p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-amber-100 border border-amber-200">
                <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-lg bg-amber-500 flex items-center justify-center">
                    <FaClock className="text-white"/>
                    </div>
                    Order Summary
                </h4>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-medium">{order.totalOrderPrice - order.shippingPrice}  EGP</span></div>
                    <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="font-medium">{order.shippingPrice ===0?"Free":order.shippingPrice} </span></div>
                    <hr className="border-gray-200/50 my-2"/>
                    <div className="flex justify-between pt-1"><span className="font-semibold text-gray-900">Total</span><span className="font-bold text-lg text-gray-900">{order.totalOrderPrice}  EGP</span></div>
                </div>
              </div>
          </div>
           </div>
         )}
    </div>
    ))}



  </div>

</div>)}
</>
  )
}
