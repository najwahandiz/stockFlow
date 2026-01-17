"use client"
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '@/app/redux/products/productsThunks';

export default function DeletePopUp ({ isOpen, onClose, productName,productDelete })  {
  if (!isOpen) return null;
  const dispatch = useDispatch();

  return (
    // Overlay avec flou (Backdrop)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
      
      {/* Conteneur de la Modal */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
        
        <div className="p-8">
          {/* Titre */}
          <h2 className="text-xl font-bold text-[#0f172a] mb-3">
            Delete Product
          </h2>

          {/* Message de confirmation */}
          <p className="text-[#64748b] leading-relaxed">
            Are you sure you want to delete <span className="font-bold text-[#0f172a]">{productName}</span>? This action cannot be undone.
          </p>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-gray-100 bg-gray-50/50 text-[#0f172a] font-semibold hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                dispatch(deleteProduct(productDelete.id));
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-[#f43f5e] text-white font-semibold hover:bg-[#e11d48] transition-colors shadow-lg shadow-rose-100"
            >
              Delete
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

