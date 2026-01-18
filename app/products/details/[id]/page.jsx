"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchById } from '@/app/redux/products/productsThunks';
import { useSelector, useDispatch } from 'react-redux';
import DeletePopUp from "../../../components/popUps/delete"; 
import UpdatePopUp from "../../../components/popUps/update";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { ArrowLeft, Package, Tag, Layers, Wallet, Info,Edit3} from 'lucide-react';

export default function Détails() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.products);
  const [isOpen, setIsOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [showupdatePopup,setShowUpdatePopup] = useState(false);

  useEffect(() => {
    dispatch(fetchById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (deleted) {
      router.push("/products");
    }
  }, [deleted, router]);

  useEffect(() => {
    if (!loading && !selectedProduct && !deleted) {
      router.push("/products");
    }
  }, [selectedProduct, loading, router, deleted]);


  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium">Loading details...</p>
      </div>
    );
  }

  

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-red-100">
          <p className="text-red-500 font-bold text-lg">Error getting product...</p>
          <Link href="/products" className="mt-4 inline-block text-gray-500 hover:underline">Back to catalog</Link>
        </div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50  flex justify-center sm:p-8 font-sans">
      <div className="max-w-3xl mx-0 w-full" >
        
        {/* Navigation & Actions */}
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/products"
            className="flex items-center gap-2 text-gray-500 hover:text-teal-600 transition-colors font-medium group"
          >
            <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-teal-50">
              <ArrowLeft size={18} />
            </div>
            Back to products
          </Link>
          
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-gray-700 hover:bg-gray-50 shadow-sm transition-all font-semibold text-sm"
                  onClick={()=>setShowUpdatePopup(true)}>
            <Edit3 size={16} /> Edit Product
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
          
          {/* Header Section with Icon */}
          <div className="p-8 pb-0 flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 shrink-0">
              <Package size={40} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-full uppercase tracking-wider">
                   {selectedProduct.category}
                </span>
                <span className="text-xs text-gray-400 font-medium italic">ID: #{id.slice(0, 8)}</span>
              </div>
              <h1 className="text-3xl font-black text-slate-900 leading-tight">
                {selectedProduct.name}
              </h1>
            </div>
            <div className="text-right">
                <p className="text-3xl font-black text-teal-600">{selectedProduct.price} Dh</p>
                <p className="text-sm text-gray-400 font-medium">Unit Price</p>
            </div>
          </div>

          <hr className="mx-8 my-8 border-gray-50" />

          {/* Details Grid */}
          <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Inventory Status */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Layers size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Stock Level</h3>
                  <p className="text-xl font-bold text-slate-800">{selectedProduct.quantity} Units Available</p>
                  <div className="w-full bg-gray-100 h-2 rounded-full mt-2">
                    <div 
                        className={`h-full rounded-full ${selectedProduct.quantity > 10 ? 'bg-green-500' : 'bg-orange-500'}`} 
                        style={{ width: `${Math.min(selectedProduct.quantity, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

                <DeletePopUp
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  productName={selectedProduct?.name}
                  productDelete={selectedProduct}
                  onDeleted={() => setDeleted(true)}
                />
              <UpdatePopUp
                  isOpen={showupdatePopup}
                  onClose={() => setShowUpdatePopup(false)}
                  productName={selectedProduct?.name}
                  productToUpdate={selectedProduct}
              />


              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                  <Tag size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide">Category</h3>
                  <p className="text-lg font-semibold text-slate-800">{selectedProduct.category}</p>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-slate-800 font-bold mb-3">
                <Info size={18} className="text-teal-600" />
                <h3>Description</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm italic">
                {selectedProduct.description || "No description provided for this item."}
              </p>
            </div>

          </div>

          {/* Footer Info */}
          <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-4">
               <Wallet className="text-teal-400" size={24} />
               <div>
                 <p className="text-[10px] uppercase font-bold text-slate-400">Total Value in Stock</p>
                 <p className="text-lg font-bold">{(selectedProduct.price * selectedProduct.quantity).toLocaleString()} Dh</p>
               </div>
            </div>
            <button className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-lg shadow-teal-500/20 text-sm"
             onClick={()=>setIsOpen(true)}>
              Remove from stock
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}