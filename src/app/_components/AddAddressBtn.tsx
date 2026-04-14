
'use client';

import { useState } from 'react';
import AddEditAddressModal from '@/app/_components/AddEditAddressModal'; 
import { Plus } from 'lucide-react';

export default function AddAddressBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={handleOpenModal} 
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25"
      >
        <Plus />
        Add Address
      </button>

      <AddEditAddressModal isOpen={isModalOpen} onClose={handleCloseModal} mode="add" />
    </>
  );
}