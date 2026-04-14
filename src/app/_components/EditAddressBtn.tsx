
'use client';

import { useState } from 'react';
import AddEditAddressModal from '@/app/_components/AddEditAddressModal'; 
import {  FaPen } from 'react-icons/fa6';
import { EditAddressBtnProps } from '@/types/address.type';



export default function EditAddressBtn({ address }: EditAddressBtnProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <button onClick={handleOpenModal} className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-600 flex items-center justify-center transition-colors" title="Edit address">
        <FaPen />
      </button>

      <AddEditAddressModal isOpen={isModalOpen} onClose={handleCloseModal} mode="edit"   address={address} />
    </>
  );
}