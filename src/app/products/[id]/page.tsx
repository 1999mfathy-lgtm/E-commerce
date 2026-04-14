"use client";

import Image from "next/image";
import {useEffect,  useState, use } from "react";
import Link from "next/link";
import { LuCheck} from "react-icons/lu";
import { FaBolt, FaChevronRight, FaHeart, FaRegStar, FaRotateLeft, FaStar, FaTruck, FaTruckFast } from "react-icons/fa6";
import { FaShieldAlt, FaShoppingCart } from "react-icons/fa";
import SimilarProducts from "@/app/_components/SimilarProducts";
import { getProductData, getReviews } from "@/app/_actions/product.action";
import { product } from "@/types/product.type";
import AddToCartBtnInDetails from "@/app/_components/AddToCartBtnInDetails";
import AddToWishListInDetails from "@/app/_components/AddToWishListInDetails";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default   function ProductPage({ params }: PageProps) {
   const { id } = use(params);
  const [mainImage, setMainImage] = useState("");
  const [count, setCount] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [product, setProduct] = useState<product | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);

useEffect(() => {
  const load = async () => {
    const p = await getProductData(id);
    const r = await getReviews(id);

    setProduct(p);
    setReviews(r);
    setMainImage(p.images?.[0] || p.imageCover || "");

  };

  load();
}, [id]);
if (!product) return <div>Loading...</div>;
const price = product.price ?? 0;
const discount = product.priceAfterDiscount ?? 0;

const hasDiscount = discount > 0 && discount < price;

const finalPrice = hasDiscount ? discount : price;
const oldPrice = price;
const rating = Math.round(product.ratingsAverage ?? 0);




  return (
    <div className="container mx-auto px-4 py-10">
       <nav className="py-4">
         <div className="container mx-auto px-4">
           <ol className="flex items-center flex-wrap gap-1 text-sm">

             <li className="flex items-center">
              <Link href="/home" className="text-gray-500 hover:text-green-600 transition flex items-center gap-1.5">
                 🏠 Home
               </Link>
               <span className="mx-2 text-gray-400"><FaChevronRight /></span>
             </li>

             <li className="flex items-center">
               <Link
                 href={`/categories/${product.category?._id}`}
                 className="text-gray-500 hover:text-green-600 transition"
               >
                {product.category?.name}
               </Link>
               <span className="mx-2 text-gray-400"><FaChevronRight /></span>
             </li>

             <li className="flex items-center">
               <Link
                 href={`/categories/${product.category?._id}/${product.subcategory?.[0]?._id}`}
                 className="text-gray-500 hover:text-green-600 transition"
               >
                {product.subcategory?.[0]?.name}
               </Link>
               <span className="mx-2 text-gray-400"><FaChevronRight /></span>
             </li>

             <li className="text-gray-900 font-medium truncate max-w-xs">
               {product.title}
             </li>

          </ol>
        </div>
       </nav> 

      <section id="product-detail" className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <div id="product-images" className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-4">

              <div className="image-gallery product-gallery image-gallery-using-mouse">
                <div className="image-gallery-content  image-gallery-thumbnails-bottom">
                <Image
                  src={mainImage}
                  alt="product"
                  width={500}
                  height={500}
                  loading="lazy"
                  className="w-full h-100 object-contain"
                />
              </div>
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {product.images?.map((img, i)=> (
                  <button key={i} onClick={() => setMainImage(img)}>
                    <Image
                      src={img}
                       key={i}
                      alt="thumb"
                      width={80}
                      height={80}
                      className={`border-3  rounded cursor-pointer  ${
                        mainImage === img ? "border-blue-600" : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div id="product-info" className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Link href={"/"} className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">
                 {product.category?.name}
                </Link>
                <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                   {product.brand?.name}
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-3"> {product.title} </h1>

             <div className="flex items-center gap-3 mb-4 text-yellow-400">
                <div className="flex text-amber-400 mr-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                  
                    return i < rating ? (
                        <FaStar  key={i} className="text-yellow-400 text-lg" />
                    ) : (
                        <FaRegStar key={i} className="text-yellow-400 text-lg" />
                    );
                    })}
                </div>
               

                <span className="text-sm text-gray-600">
                  {product.ratingsAverage || 0} (
                  {product.ratingsQuantity || 0} reviews)
                </span>
              </div>

             <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold">
                {finalPrice} EGP
              </span>

              {hasDiscount && (
                <>
                  <span className="text-gray-400 line-through">
                    {oldPrice} EGP
                  </span>

                  <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                    Save {oldPrice ? Math.round(((oldPrice - finalPrice) / oldPrice) * 100) : 0}%
                  </span>
                </>
              )}
            </div>

             <div className="flex items-center gap-2 mb-6">
                {(product.quantity ?? 0) > 0 ? (
                  <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> In Stock
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-red-600">
                    <span className="w-2 h-2 rounded-full bg-red-600"></span> Out of Stock
                  </span>
                )}
              </div>

             <div className="border-t border-gray-100 pt-5 mb-6">
                <p className="text-gray-600 leading-relaxed">
                  {product.description || "No description available."}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                    <button
                        className="px-4 py-2"
                        onClick={() => setCount((c) => Math.max(1, c - 1))}
                      >
                        -
                      </button>
                    <input
                      type="number"
                      value={count}
                      readOnly
                      className="w-16 text-center border-0"
                    />
                    <button
                      className="px-4 py-2"
                      onClick={() => setCount((c) => c + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.quantity} available
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg mb-6 flex justify-between">
                <span>Total Price:</span>
                <span className="text-green-600 font-bold text-2xl">
                  {(finalPrice * count).toFixed(2)} EGP
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
              
                 <AddToCartBtnInDetails productId={product._id!} />

                <button className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                  <FaBolt /> Buy Now
                </button>
              </div>
             <div className="flex gap-3 mb-6">
              
              <AddToWishListInDetails product={product as product} />
               </div>
             <div className="border-t border-gray-100 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10  bg-green-300 rounded-full flex items-center justify-center shrink-0">
                    <FaTruckFast  className="text-green-600  w-5 h-4"/>
                  </div>
                  <div>
                        <h4 className="font-medium text-gray-900 text-sm">Free Delivery</h4>
                        <p className="text-xs text-gray-500">Orders over $50</p>
                  </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10  bg-green-300 rounded-full flex items-center justify-center shrink-0">
                        <FaRotateLeft  className="text-green-600  w-5 h-4" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">30 Days Return</h4>
                        <p className="text-xs text-gray-500">Money back</p></div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10  bg-green-300 rounded-full flex items-center justify-center shrink-0">
                            <FaShieldAlt  className="text-green-600  w-5 h-4"/>
                          </div>
                          <div><h4 className="font-medium text-gray-900 text-sm">Secure Payment</h4>
                          <p className="text-xs text-gray-500">100% Protected</p>
                          </div>
                          </div>
                          </div>
                          </div>

            </div>
          </div>
        </div>
      </div>
    </section>

      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto scrollbar-hide">
                {[
                  { id: "details", label: "product Details" },
                  { id: "reviews", label: `Reviews (${product.ratingsQuantity || 0})` },
                  { id: "shipping", label: "Shipping & Returns" },
                ].map((tab) => (<>
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 text-green-600 border-b-2 border-green-600 bg-green-50/50 ${
                      activeTab === tab.id

                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {tab.label}
               </button> </>  
                ))}
           </div>
          </div>

    
          <div className="p-6">
              {activeTab === "details" && (
                 <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About this product</h3>
                <p className="text-gray-600 leading-relaxed"> {product.description || "No description available."}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">product Information</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500">Category</span>
                      <span className="text-gray-900 font-medium">{product.category?.name}</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500">Subcategory</span>
                      <span className="text-gray-900 font-medium">{product.subcategory?.[0]?.name}</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500">Brand</span>
                      <span className="text-gray-900 font-medium"> {product.brand?.name}</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-500">Items Sold</span>
                      <span className="text-gray-900 font-medium">{product.sold}+ sold</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-gray-600">
                        <LuCheck className="text-green-600 mr-2"/> Premium Quality product</li>
                        <li className="flex items-center text-sm text-gray-600">
                        <LuCheck className="text-green-600 mr-2"/> 100% Authentic Guarantee</li>
                        <li className="flex items-center text-sm text-gray-600">
                        <LuCheck className="text-green-600 mr-2"/> Fast & Secure Packaging</li>
                        <li className="flex items-center text-sm text-gray-600">
                        <LuCheck className="text-green-600 mr-2"/> Quality Tested</li>
                        
                    </ul>
                </div>
              
              </div>
            </div>
              )}

           
              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
															
					   

														 
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 mb-2">{product.ratingsAverage}</div>
                      <div className="flex text-amber-400 mr-8">
                         {Array.from({ length: 5 }).map((_, i) => {
                          return i < rating ? (
                              <FaStar key={i} className="text-yellow-400 text-lg" />
                          ) : (
                              <FaRegStar key={i} className="text-yellow-400 text-lg" />
                          );
                          })}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        Based on {reviews.length || 0} reviews
                      </p>
                    </div>

                    {reviews.length > 0 ? (
                      <div className="flex-1 w-full">
                        {["5", "4", "3", "2", "1"].map((star) => {
                          const starCount = reviews.filter(
                            (review) => review.rating === parseInt(star)
                          ).length;

                          const percentage = (starCount / reviews.length) * 100;

                          return (
                            <div key={star} className="flex items-center gap-3 mb-2">
                              <span className="text-sm text-gray-600 w-8">{star} star</span>

                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                                  style={{ width: `${percentage}%` }} 
                                ></div>
                              </div>

                              <span className="text-sm text-gray-500 w-10">
                                {Math.round(percentage)}%
                              </span>
                            </div>
                          );
                        })}
                      </div>
						  
                    ) : (
                      <p className="text-gray-500">No reviews yet for this product.</p>
                    )}
                  </div>
                  <div className="border-t border-gray-200 pt-6">
                    <div className="text-center py-8">
                       <FaStar className="text-gray-300 mb-3 text-center w-11 h-9"/>
                      <p className="text-gray-500">Customer reviews will be displayed here.</p>
                      <button className="mt-4 text-green-600 hover:text-green-700 font-medium">Write a Review</button>
                      </div>
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6">
                          <div className="flex items-center gap-3 mb-4">
                                <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center">
                                  <FaTruck className="text-white w-6 h-5"/> </div><h4 className="font-semibold text-gray-900">Shipping Information</h4>
                                </div>
                                 <ul className="space-y-3">
                                <li className="flex items-start gap-2 text-sm text-gray-700">
                                  <LuCheck className="text-green-600 mr-2"/> <span>Free shipping on orders over $50</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-700">
                                  <LuCheck className="text-green-600 mr-2"/> <span>Standard delivery: 3-5 business days</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-700">
                                  <LuCheck className="text-green-600 mr-2"/> <span>Express delivery available (1-2 business days)</span>
                                </li>
                                <li className="flex items-start gap-2 text-sm text-gray-700">
                                  <LuCheck className="text-green-600 mr-2"/> 
                                  <span>Track your order in real-time</span>
                                 </li>
                                 </ul>
                             </div>
                                <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center">
                                          <FaRotateLeft  className="text-white w-6 h-5"/> 
                                        </div>
                                        <h4 className="font-semibold text-gray-900">Returns &amp; Refunds</h4>
                                    </div>
                                     <ul className="space-y-3">
                                        <li className="flex items-start gap-2 text-sm text-gray-700">
                                          <LuCheck className="text-green-600 mr-2"/> <span>30-day hassle-free returns</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-gray-700">
                                          <LuCheck className="text-green-600 mr-2"/> <span>Full refund or exchange available</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-gray-700">
                                          <LuCheck className="text-green-600 mr-2"/> <span>Free return shipping on defective items</span>
                                        </li>
                                        <li className="flex items-start gap-2 text-sm text-gray-700">
                                          <LuCheck className="text-green-600 mr-2"/> 
                                          <span>Easy online return process</span>
                                        </li>
                                    </ul>
                                   </div>
                                  </div>
                        <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4">
                          <div className="h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0">
                              <FaShieldAlt  className="text-gray-600  w-8 h-6"/> 
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-1">Buyer Protection Guarantee</h4>
                              <p className="text-sm text-gray-600">Get a full refund if your order doesn't arrive or isn't as described. We ensure your shopping experience is safe and secure.</p>
                            </div>
                          </div>
                </div>
              )}
        </div>

        </div>
      </div>
      <SimilarProducts
        categoryId={product.category?._id}
        productId={product._id}
      />
          </div>
  );
}


