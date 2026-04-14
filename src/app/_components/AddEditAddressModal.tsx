'use client';

import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { AddAdresses, EditAdresses } from "../_actions/profile.actions";
import { toast } from 'react-toastify'

interface Address {
  _id?: string;
  name?: string;
  details?: string;
  phone?: string;
  city?: string;
}

interface AddEditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  address?: Address;
}

export default function AddEditAddressModal({
  isOpen,
  onClose,
  mode,
  address
}: AddEditAddressModalProps) {

  const [form, setForm] = useState({
    name: '',
    details: '',
    phone: '',
    city: '',
  });

  const [loading, setLoading] = useState(false);

  // Prefill form
  useEffect(() => {
    if (mode === 'edit' && address) {
      setForm({
        name: address.name || '',
        details: address.details || '',
        phone: address.phone || '',
        city: address.city || '',
      });
    } else {
      setForm({
        name: '',
        details: '',
        phone: '',
        city: '',
      });
    }
  }, [mode, address, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (mode === 'add') {
          const res = await AddAdresses(JSON.stringify(form))
          if (res?.ok) {
            toast.success("Address Added")
          } else {
            toast.error("Failed to add")
          }

        
      } else {
        console.log('Edit address ID:', address?._id);
        if (!address?._id) return;
            const res = await EditAdresses(address._id, form);
        if (res?.ok) {
          toast.success("Address Updated")
        } else {
          toast.error("Failed to Update")
        }

        
        
      }

      onClose();

      window.location.reload();

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 sm:p-8">
        
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === 'edit' ? 'Edit Address' : 'Add New Address'}
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 flex items-center justify-center"
          >
            <MdClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <input
            type="text"
            placeholder="Address Name"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <textarea
            placeholder="Full Address"
            value={form.details}
            onChange={(e) => handleChange('details', e.target.value)}
            className="w-full px-4 py-3 border rounded-xl"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 border rounded-xl"
            />

            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full px-4 py-3 border rounded-xl"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-green-600 text-white rounded-xl"
            >
              {loading
                ? 'Saving...'
                : mode === 'edit'
                ? 'Update Address'
                : 'Add Address'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}