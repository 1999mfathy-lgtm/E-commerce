"use client"
import {  useSession } from 'next-auth/react'
import { FaChevronRight, FaLocationDot, FaUser, FaPhone, FaCity, FaGear, FaFloppyDisk, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa6';

import { useState, useEffect } from "react";
import { changeUserPassword, updateUserProfile } from "@/app/_actions/profile.actions";
import { toast } from "react-toastify";
import Link from 'next/link';


export default function settings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });


const { data: session , status } = useSession();
const isLoggedIn = !!session;
const user = session?.user;
const userId=session?.user?.id;

useEffect(() => {
  if (user) {
    setForm({
      name: user.name || "",
      email: user.email || "",
      phone:"",
    });
  }
}, [user]);
if (status === "loading") return null;

const [loading, setLoading] = useState(false);
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);

    const res = await updateUserProfile(form);

    if (res.ok) {
      toast.success("Profile updated successfully");
    } else {
      const errorMessage =
        res?.errors?.msg || res?.message || "Failed to update profile";

      toast.error(errorMessage);
    }

  } catch (err) {
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};


const [passwordForm, setPasswordForm] = useState({
  currentPassword: "",
  password: "",
  rePassword: "",
});

const [passwordLoading, setPasswordLoading] = useState(false);

const handlePasswordSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (passwordForm.password !== passwordForm.rePassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    setPasswordLoading(true);

    const res = await changeUserPassword(passwordForm);

    if (res.ok) {
      toast.success("Password updated successfully");
      setPasswordForm({
        currentPassword: "",
        password: "",
        rePassword: "",
      });

    } else {
      toast.error(res.message || "Failed to update password");
    }

  } catch (err) {
    toast.error("Something went wrong");
  } finally {
    setPasswordLoading(false);
  }
};

  return (
    <>
<div className="min-h-screen bg-gray-50/50">
  <div className="bg-gradient-to-br from-green-600 via-green-500 to-green-400 text-white">
    <div className="container mx-auto px-4 py-10 sm:py-12">
      <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
      <Link className="hover:text-white transition-colors duration-200" href="/">Home</Link>
      <span className="text-white/40">/</span><span className="text-white font-medium">My Account</span></nav>
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
          <FaUser/>
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
              <Link className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-gray-600 hover:bg-gray-50 hover:text-gray-900" href="/profile/addresses">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-gray-100 text-gray-500 group-hover:bg-gray-200">
                <FaLocationDot />
                </div>
                <span className="font-medium flex-1">My Addresses</span>
                <FaChevronRight />
              </Link>
            </li>
            <li>
              <Link className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group bg-green-50 text-green-700" href="/profile/settings">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-green-500 text-white">
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
        <div className="space-y-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Account Settings</h2>
            <p className="text-gray-500 text-sm mt-1">Update your profile information and change your password</p>
          </div>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-100">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
                  
                  <FaUser/>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Profile Information</h3>
                  <p className="text-sm text-gray-500">Update your personal details</p>
                </div>
              </div>
              <form onSubmit={handleSubmit}  className="space-y-5">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Enter your name"
                          className="w-full px-4 py-3 rounded-xl border"
                        />
                </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      <input
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-xl border"
                          />
               </div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                   <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="01xxxxxxxxx"
                      className="w-full px-4 py-3 rounded-xl border"
                    />
                </div>
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white"
                  >
                    <FaFloppyDisk/>
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
            <div className="p-6 sm:p-8 bg-gray-50">
              <h3 className="font-bold text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between"><span className="text-gray-500">User ID</span><span className="font-mono text-gray-700">{userId}</span></div>
                <div className="flex items-center justify-between"><span className="text-gray-500">Role</span><span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 font-medium capitalize">User</span></div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
                  <FaLock/>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Change Password</h3>
                  <p className="text-sm text-gray-500">Update your account password</p>
                </div>
              </div>
              <form onSubmit={handlePasswordSubmit}  className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                  <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                      }
                      placeholder="Enter your current password"
                      className="w-full px-4 py-3 pr-12 rounded-xl border"
                    />
                  <button
                  type="button"
                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                   {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={passwordForm.password}
                        onChange={(e) =>
                          setPasswordForm({ ...passwordForm, password: e.target.value })
                        }
                        placeholder="Enter your new password"
                        className="w-full px-4 py-3 pr-12 rounded-xl border"
                        minLength={6}
                      />

                      <button
                        type="button"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwordForm.rePassword}
                      onChange={(e) =>
                        setPasswordForm({ ...passwordForm, rePassword: e.target.value })
                      }
                      placeholder="Confirm your new password"
                      className="w-full px-4 py-3 pr-12 rounded-xl border"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="pt-4">
                  <button
                        type="submit"
                        disabled={passwordLoading}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white"
                      >
                        <FaLock />
                        {passwordLoading ? "Updating..." : "Change Password"}
                      </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</div>

    </>
  )
}
