'use client';

import { FaTrash } from 'react-icons/fa6';
import { deleteAddress } from '@/app/_actions/profile.actions';
import { useRouter } from 'next/navigation';

interface DeleteAddressBtnProps {
  addressId: string;
}

export default function DeleteAddressBtn({ addressId }: DeleteAddressBtnProps) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this address?'
    );

    if (!confirmed) return;

    try {
      await deleteAddress(addressId);
      router.refresh();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors"
      title="Delete address"
    >
      <FaTrash />
    </button>
  );
}