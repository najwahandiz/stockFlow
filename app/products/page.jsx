"use client";
import DeletePopUp from ".././components/popUps/delete"; 
import UpdatePopUp from ".././components/popUps/update";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/app/redux/products/productsThunks";
import { 
  Search, Plus, Eye, Pencil, Trash2, 
  CheckCircle, AlertCircle, XCircle
} from 'lucide-react';

export default function ProductDashboard () {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showupdatePopup,setShowUpdatePopup] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handlDeletClick = (product) => {
    setIsOpen(true);
    setProductToDelete(product);
  };

  const handlUpdateClick = (product) => {
    setShowUpdatePopup(true);
    setProductToUpdate(product);
  };

  // Fonction pour le statut du stock
  const getStockStatus = (quantity) => {
    if (quantity === 0) {
      return {
        text: "OUT OF STOCK",
        color: "bg-red-100 text-red-700",
        icon: <XCircle size={14} />,
        border: "border-red-200"
      };
    } else if (quantity <= 10) {
      return {
        text: "LOW STOCK",
        color: "bg-amber-100 text-amber-700",
        icon: <AlertCircle size={14} />,
        border: "border-amber-200"
      };
    } else {
      return {
        text: "IN STOCK",
        color: "bg-emerald-100 text-emerald-700",
        icon: <CheckCircle size={14} />,
        border: "border-emerald-200"
      };
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-500 animate-pulse font-medium">Loading products...</p>
    </div>
  );

  return (
    <div className="p-6 mx-0 bg-gray-50 min-h-screen">
      
      {/* Header Simple */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Products</h1>
            <p className="text-gray-500">Manage your product inventory</p>
          </div>
          <Link href={"/products/new"}> 
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition font-medium">
              <Plus size={18} /> Add Product
            </button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search products by name or category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const status = getStockStatus(product.quantity);
              return (
                <div key={product.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                  {/* En-tête de la carte */}
                  <div className="p-5 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      {/* Initiale du produit */}
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-xl font-bold text-gray-700">
                          {product.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      {/* Badge de statut */}
                      <div className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${status.color} ${status.border} border`}>
                        {status.icon}
                        {status.text}
                      </div>
                    </div>
                    {/* Nom et catégorie */}
                    <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-1">{product.category}</p>
                  </div>
                  {/* Corps de la carte */}
                  <div className="p-5">
                    {/* Prix et quantité */}
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{product.price} Dh</p>
                        <p className="text-gray-500 text-sm mt-1">
                          {product.quantity} units
                        </p>
                      </div>
                    </div>
                    {/* Boutons d'action */}
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-teal-50 text-gray-600 hover:text-teal-600 rounded-lg border border-gray-200 hover:border-teal-200 transition-colors">
                        <Link href={`/products/details/${product.id}`}>
                           <Eye size={16} />
                        </Link>
                       
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
                        onClick={()=>handlUpdateClick(product)}>
                        <Pencil size={16} />
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg border border-gray-200 hover:border-red-200 transition-colors"
                        onClick={()=> handlDeletClick(product)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Render DeletePopUp only once at the root */}
          <DeletePopUp
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            productName={productToDelete?.name}
            productDelete={productToDelete}
          />
          <UpdatePopUp
            isOpen={showupdatePopup}
            onClose={() => setShowUpdatePopup(false)}
            productName={productToUpdate?.name}
            productToUpdate={productToUpdate}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-109 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <div className="text-gray-300 mb-4">
            <Search size={64} />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm ? `No results for "${searchTerm}"` : "No products in your inventory"}
          </p>
          <button 
            onClick={() => setSearchTerm("")} 
            className="px-4 py-2 text-teal-600 font-medium hover:bg-teal-50 rounded-lg transition-colors"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

