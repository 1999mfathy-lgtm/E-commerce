
import { FaChevronRight, FaLocationDot, FaUser, FaPhone, FaCity, FaGear } from 'react-icons/fa6';
import Link from 'next/link';
import { getUserAdresses } from '@/app/_actions/profile.actions';
import { addressesResType } from '@/types/address.type';
import AddAddressBtn from '@/app/_components/AddAddressBtn'; 
import EditAddressBtn from '@/app/_components/EditAddressBtn'; 
import DeleteAddressBtn from '@/app/_components/DeleteAddressBtn';

export default async function Page() {
  const addresses: addressesResType = await getUserAdresses();

  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <div className="bg-gradient-to-br from-green-600 via-green-500 to-green-400 text-white">
          <div className="container mx-auto px-4 py-10 sm:py-12">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
              <Link className="hover:text-white transition-colors duration-200" href="/">
                Home
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white font-medium">My Account</span>
            </nav>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
                <FaUser />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">My Account</h1>
                <p className="text-white/80 mt-1">Manage your addresses and account settings</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <aside className="w-full lg:w-72 shrink-0">
              <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-bold text-gray-900">My Account</h2>
                </div>
                <ul className="p-2">
                  <li>
                    <Link
                      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group bg-green-50 text-green-700"
                      href="/profile/addresses"
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-green-500 text-white">
                        <FaLocationDot />
                      </div>
                      <span className="font-medium flex-1">My Addresses</span>
                      <FaChevronRight />
                    </Link>
                  </li>
                  <li>
                    <Link className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-gray-600 hover:bg-gray-50 hover:text-gray-900" href="/profile/settings">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-gray-100 text-gray-500 group-hover:bg-gray-200">
                        <FaGear />
                      </div>
                      <span className="font-medium flex-1">Settings</span>
                      <FaChevronRight />
                    </Link>
                  </li>
                </ul>
              </nav>
            </aside>
            <main className="flex-1 min-w-0">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your saved delivery addresses</p>
                  </div>
                  <AddAddressBtn />
                </div>

                {!addresses?.data || addresses.data.length === 0 ? (
                  <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                      <FaLocationDot />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No Addresses Yet</h3>
                    <p className="text-gray-500 mb-6 max-w-sm mx-auto">Add your first delivery address to make checkout faster and easier.</p>
                    <AddAddressBtn />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.data.map((address) => (
                      <div key={address._id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-primary-100 transition-all duration-200 group">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-100 transition-colors">
                              <FaLocationDot />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 mb-1">{address.name}</h3>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{address.details}</p>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5">
                                  <FaPhone />
                                  {address.phone}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <FaCity />
                                  {address.city}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <EditAddressBtn  address={address}/>
                            <DeleteAddressBtn  addressId={address._id} />
                            
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
