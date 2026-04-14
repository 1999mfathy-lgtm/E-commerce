"use client";
import { useState, useEffect ,use} from "react";
import Link from "next/link";
import { FaArrowLeft, FaFolderOpen } from "react-icons/fa6";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;  
}

export default function SubCategories({ params }: PageProps) {
  const { id } = use(params);  
  const [category, setCategory] = useState<any>(null);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
						   
        const catRes = await fetch(
          `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
          { cache: "no-store" }
        );
        const catData = await catRes.json();
        setCategory(catData.data);
						  

        const subRes = await fetch(
          `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
          { cache: "no-store" }
        );
        const subData = await subRes.json();
        setSubcategories(subData.data);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
	  
      <div className="bg-gradient-to-br from-green-600 via-green-500 to-green-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">

          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link href="/home" className="hover:text-white transition-colors">
              Home
            </Link>

            <span className="text-white/40">/</span>

            <Link href="/categories" className="hover:text-white transition-colors">
              Categories
            </Link>

            <span className="text-white/40">/</span>

            <span className="text-white font-medium">{category?.name}</span>
							  
				   
          </nav>

	   
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">
              <Image
              width={100}
              height={100}
                src={category?.image}
                alt={category?.name}
                className="w-12 h-12 object-contain"
              />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {category?.name}
              </h1>

              <p className="text-white/80 mt-1">
                Choose a subcategory to browse products
              </p>
            </div>
          </div>
        </div>
      </div>
	   

	
      <div className="container mx-auto px-4 py-10">

					
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors mb-6"
        >
          <FaArrowLeft/>
          <span>Back to Categories</span>
        </Link>

        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">
            {subcategories.length} Subcategories in {category?.name}
          </h2>
        </div>

	   
        {subcategories.length === 0 ? (
          <p className="text-center text-gray-500">No subcategories found</p>
								  
			  
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">

            {subcategories.map((sub: any) => (
              <Link
                key={sub._id}
                href={`/products?subcategory=${sub._id}`}
                className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 hover:-translate-y-1"
              >
								
                <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
																	   
                   <FaFolderOpen className="text-green-600 w-8 h-6" /> 
										
						 
                </div>

							
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors mb-2">
                  {sub.name}
                </h3>

								  
                <div className="flex items-center gap-2 text-sm text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Browse Products →</span>
                </div>
              </Link>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}


