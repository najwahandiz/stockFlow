"use client"

import {React, useState, useEffect} from 'react'
import { UpdateProduct } from '@/app/redux/products/productsThunks';
import { useDispatch,useSelector } from 'react-redux';
import { X } from 'lucide-react';



export default function UpdatePopUp({ productToUpdate, isOpen, onClose }) {
if (!isOpen) return null;

  const dispatch = useDispatch ();
  const {loading} = useSelector((state)=>(state.products));
  

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });

  useEffect (()=>{
    if(productToUpdate){
      setFormData({
        name: productToUpdate.name,
        category: productToUpdate.category,
        price: productToUpdate.price,
        quantity: productToUpdate.quantity,
        description: productToUpdate.description || "",
      });
    };

  },[productToUpdate]);

  const handelChange = (e) => {
    const {name, value} = e.target ;
    setFormData((prev)=>({...prev,[name]:value}));

  }; 

  const handelSubmit = async (e) => {
    e.preventDefault();

    await dispatch(UpdateProduct(
      {id: productToUpdate.id ,
       updateData : formData
      })
    );
    onClose();
  }
  



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl transition-all transform animate-in fade-in zoom-in duration-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-[#0f172a]">Edit Product</h2>
            <p className="text-sm text-slate-500 mt-1">Update the product details below.</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handelSubmit} className="px-8 pb-8 space-y-5">
          
          {/* Product Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handelChange}
              placeholder="Enter product name"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-slate-900"
              required 
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handelChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-500 outline-none transition-all text-slate-900 appearance-none"
              required
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Audio">Audio</option>
              <option value="Sports">Sports</option>
              <option value="Food & Beverage">Food & Beverage</option>
            </select>
          </div>

          {/* Price & Quantity Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Price ($)</label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handelChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-500 outline-none transition-all"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handelChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Description (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handelChange}
              placeholder="Enter product description..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-teal-500 outline-none transition-all resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 active:scale-[0.98]"
            >
              
              {loading ? "Updating..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
