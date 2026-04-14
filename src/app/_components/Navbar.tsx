"use client";
import { Search, Heart,  User} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import { FaBoxOpen, FaCartShopping, FaGear, FaRegAddressBook, FaRegCircleUser, FaRegHeart } from "react-icons/fa6";
import { MdKeyboardArrowDown} from "react-icons/md";
import { PiHeadsetFill } from "react-icons/pi";
import { CartContext } from "../_context/cartContextProvider"
import { FiUser } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useWishlist } from "../_context/wishListContextProvider";


export default function Navbar() {

const [open, setOpen] = useState(false)
const menuRef = useRef<HTMLDivElement>(null)
const context = useContext(CartContext)
const { data: session, status } = useSession()
const isLoggedIn = !!session
const user = session?.user
const numberOfCartItems = context?.numberOfCartItems ?? 0
const { wishlist } = useWishlist()
  const [query, setQuery] = useState('');  
  const router = useRouter();  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

const isMounted = useRef(false);

useEffect(() => {
  isMounted.current = true;

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isMounted.current &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    isMounted.current = false;
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    
    <>
    
<div className="bg-white shadow-sm sticky top-0 z-999">
  <div className="container mx-auto px-4">
    <div className="flex items-center justify-between h-16 lg:h-18 gap-4 lg:gap-8">
        <Link className="shrink-0" href="/home">
      <Image width={165} height={32} src="/freshcart-logo49f1b44d.svg" alt="logo" loading="lazy"/></Link> 
      <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products, brands and more..."
                  className="text-black w-full px-5 py-3 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors"
                >
                  <Search size={16} />
                </button>
              </div>
            </form>
      <nav className="hidden xl:flex items-center gap-6">
        <Link className="text-gray-700 hover:text-green-600 font-medium transition-colors" href="/home">Home</Link>
        <Link className="text-gray-700 hover:text-green-600 font-medium transition-colors" href="/products">Shop</Link>
        <div className="relative group">
          <button className="flex items-center gap-1.5 text-gray-700 hover:text-green-600 font-medium transition-colors py-2">  
            Categories
            <MdKeyboardArrowDown className="group-hover:rotate-180"/>
          </button>
          <div className="absolute top-full left-0 pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-50">
              <Link className="block px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors" href="/categories">All Categories</Link>
              <Link className="block px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors" href="/products?category=6439d2d167d9aa4ca970649f">Electronics</Link>
              <Link className="block px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors" href="/products?category=6439d58a0049ad0b52b9003f">Womens Fashion</Link>
              <Link className="block px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors" href="/products?category=6439d5b90049ad0b52b90048">Mens Fashion</Link>
              <Link className="block px-4 py-2.5 text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors" href="/products?category=6439d40367d9aa4ca97064a8">Beauty & Health</Link></div>
          </div>
        </div>
        <Link className="text-gray-700 hover:text-green-600 font-medium transition-colors" href="/brands">Brands</Link>
      </nav>
      <div className="flex items-center gap-1 lg:gap-2">
        <Link className="hidden lg:flex items-center gap-2 pr-3 mr-2 border-r border-gray-200 hover:opacity-80 transition-opacity" href="/contact">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-lg ">
            <PiHeadsetFill/>
          </div>
          <div className="text-xs">
            <div className="text-gray-400">Support</div>
            <div className="font-semibold text-gray-700">24/7 Help</div>
          </div>
        </Link>
        <Link className="group relative p-2.5 rounded-full hover:bg-gray-100  transition-colors" title="Wishlist" href="/wishlist">
            <Heart className=" text-xl text-gray-500 group-hover:text-green-600 transition-colors" />
            {wishlist.length > 0 && (
  <span className="absolute top-0.5 right-0.5 size-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
    {wishlist.length}
  </span>
)}
        </Link>
        <Link className="relative p-2.5 rounded-full hover:bg-gray-100 transition-colors group" title="Cart" href="/cart">
          <FaCartShopping size={22}  className="text-xl text-gray-500 group-hover:text-green-600 transition-colors" />
        {numberOfCartItems > 0 && (
  <span className="absolute top-0.5 right-0.5 size-4.5 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
    {numberOfCartItems}  </span> )}
        </Link>
        
        {isLoggedIn ? <div ref={menuRef} className="relative">
        <button  onClick={() => setOpen(!open)}>
        <FaRegCircleUser className="text-gray-500 hover:text-green-600 text-2xl cursor-pointer" />
          </button>

              <div className= {`absolute right-0 top-full mt-2 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl transition-all duration-200 
              origin-top-right opacity-0 scale-95 ${open ? "opacity-100 visible" : "opacity-0 invisible"} ` }>
                    <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <FaRegCircleUser className="text-green-600 text-2xl" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <Link className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors" href="/profile/addresses">
                    <FiUser className="text-gray-400" />
                    My Profile
                  </Link>
                  <Link className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors" href="/orders">
                    <FaBoxOpen className="text-gray-400"  />
                    My Orders
                  </Link>
                  <Link className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors" href="/wishlist">
                    <FaRegHeart className="text-gray-400" />
                    My Wishlist
                  </Link>
                  <Link className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors" href="/profile/addresses">
                    <FaRegAddressBook className="text-gray-400" />
                    Addresses
                  </Link>
                  <Link className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors" href="/profile/settings">
                    <FaGear className="text-gray-400" />
                    Settings
                  </Link>
                </div>
                <div className="border-t border-gray-100 py-2">
                  <button onClick={() => signOut({ callbackUrl: "/login" })} className="cursor-pointer flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left">
                    <FaSignOutAlt />
                    Sign Out
                  </button>
                </div>
            </div>
  
          </div>:
          <Link className=" lg:flex items-center gap-2 ml-2 px-5 py-2.5 rounded-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-green-600/20" href="/login">
          <User size={16} />  Sign In </Link> }
      </div>
    </div>
  </div>
</div>
</>

  );
} 