"use client";

import React, { useState } from "react";
import { ChevronLeft, PackagePlus, CheckCircle2, X } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { ajouterProduit } from '../../redux/products/productsThunks'

const AddProductPage = () => {
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });

  const categories = [
    "Networking", "Audio", "Accessories", "Storage",
    "Displays", "Computers", "Smartphones",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      status : "disponible",
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(ajouterProduit(formData));
    
    // Afficher le message de succès
    setShowSuccess(true);
    
    // Cacher le message après 3 secondes
    setTimeout(() => setShowSuccess(false), 3000);

    // Reset form
    setFormData({
      name: "",
      category: "",
      price: "",
      quantity: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 px-78 py-2 relative overflow-hidden">
      
      {/* NOTIFICATION DE SUCCÈS (TOAST) */}
      <div className={`fixed top-5 right-5 z-50 transform transition-all duration-500 flex items-center gap-3 bg-white border-l-4 border-teal-500 shadow-2xl rounded-r-xl p-4 ${showSuccess ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <div className="bg-teal-50 p-2 rounded-full">
            <CheckCircle2 className="text-teal-600" size={24} />
        </div>
        <div>
            <h4 className="text-gray-900 font-bold text-sm">Produit ajouté !</h4>
            <p className="text-gray-500 text-xs">Le catalogue a été mis à jour avec succès.</p>
        </div>
        <button onClick={() => setShowSuccess(false)} className="ml-4 text-gray-400 hover:text-gray-600">
            <X size={18} />
        </button>
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-50 text-center sm:text-left">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <div className="bg-teal-50 p-2 rounded-lg text-teal-600">
                <PackagePlus size={24} />
              </div>
              <h1 className="text-xl font-extrabold text-gray-900">Add Product</h1>
            </div>
            <Link
              href="/products"
              className="text-gray-400 hover:text-teal-600 transition-colors text-sm flex items-center gap-1 font-medium"
            >
              <ChevronLeft size={18} />
              Back
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-2">Fill in the details to create a new product catalog item</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Sony Headphones"
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all appearance-none"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Price (Dh)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700 ml-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Brief description..."
              className="w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none resize-none transition-all"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Link
              href="/products"
              className="flex-1 text-center px-4 py-3 text-sm border border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="flex-1 px-4 py-3 text-sm bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-100 active:scale-95"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;