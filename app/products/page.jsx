"use client";

import DeletePopUp from ".././components/popUps/delete"; 
import UpdatePopUp from ".././components/popUps/update";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/app/redux/products/productsThunks";
import { 
  Search, Plus, Eye, Pencil, Trash2, 
  CheckCircle, AlertCircle, XCircle, Package, ChevronDown
} from "lucide-react";

export default function ProductDashboard() {
  const dispatch = useDispatch();
  const { products = [], loading } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [isOpen, setIsOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [showupdatePopup, setShowUpdatePopup] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categories = useMemo(() => {
    const uniqueCategories = products.map((p) => p.category);
    return ["all", ...new Set(uniqueCategories)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchName = product.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;
      return matchName && matchCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const handlDeletClick = (product) => {
    setIsOpen(true);
    setProductToDelete(product);
  };

  const handlUpdateClick = (product) => {
    setShowUpdatePopup(true);
    setProductToUpdate(product);
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) {
      return {
        text: "Out of stock",
        color: "bg-rose-50 text-rose-600 ring-rose-500/10",
        dot: "bg-rose-500",
        icon: <XCircle size={12} />
      };
    } else if (quantity <= 10) {
      return {
        text: "Low Stock",
        color: "bg-amber-50 text-amber-600 ring-amber-500/10",
        dot: "bg-amber-500",
        icon: <AlertCircle size={12} />
      };
    } else {
      return {
        text: "In Stock",
        color: "bg-emerald-50 text-emerald-600 ring-emerald-500/10",
        dot: "bg-emerald-500",
        icon: <CheckCircle size={12} />
      };
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-50">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">
          Loading inventory...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10 bg-[#f8fafc] min-h-screen">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Products</h1>
            <p className="text-slate-500 mt-1 font-medium">Manage and monitor your warehouse inventory</p>
          </div>
          <Link href="/products/new">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg shadow-teal-600/20 active:scale-95 font-semibold text-sm cursor-pointer">
              <Plus size={18} strokeWidth={2.5} /> Add Product
            </button>
          </Link>
        </div>

        {/* Toolbar: Search + Filter */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all shadow-sm placeholder:text-slate-400 text-sm"
            />
          </div>

          <div className="relative min-w-[200px]">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full appearance-none px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all shadow-sm text-sm font-medium text-slate-700 cursor-pointer"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All categories" : category}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[2rem] border border-dashed border-slate-300 shadow-inner">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={32} className="text-slate-300" />
            </div>
            <h3 className="text-slate-900 font-bold text-lg">No products found</h3>
            <p className="text-slate-500 text-sm max-w-xs mx-auto mt-1">We couldn't find any products matching your current search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const status = getStockStatus(product.quantity);
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  <div className="p-5 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                        <Package size={20} />
                      </div>
                      <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ring-1 ring-inset ${status.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`}></span>
                        {status.text}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-800 leading-tight mb-1 group-hover:text-teal-700 transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {product.category}
                    </p>

                    <div className="flex justify-between items-end mt-6">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Price</p>
                        <span className="text-lg font-black text-slate-900">{product.price} <span className="text-xs font-medium text-slate-500">Dh</span></span>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Stock</p>
                        <span className="text-sm font-bold text-slate-700">{product.quantity} <span className="text-[10px] text-slate-400">pcs</span></span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="flex gap-1.5 p-3 bg-slate-50 border-t border-slate-100">
                    <Link href={`/products/details/${product.id}`} className="flex-1">
                      <button title="View Details" className=" cursor-pointer w-full flex items-center justify-center py-2 bg-white hover:bg-teal-600 hover:text-white text-slate-500 rounded-lg transition-all shadow-sm border border-slate-200 hover:border-teal-600 active:scale-95">
                        <Eye size={16} />
                      </button>
                    </Link>
                    <button
                      onClick={() => handlUpdateClick(product)}
                      title="Edit Product"
                      className="cursor-pointer flex-1 flex items-center justify-center py-2 bg-white hover:bg-amber-500 hover:text-white text-slate-500 rounded-lg transition-all shadow-sm border border-slate-200 hover:border-amber-500 active:scale-95"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handlDeletClick(product)}
                      title="Delete Product"
                      className="cursor-pointer flex-1 flex items-center justify-center py-2 bg-white hover:bg-rose-500 hover:text-white text-slate-500 rounded-lg transition-all shadow-sm border border-slate-200 hover:border-rose-500 active:scale-95"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Popups (Unchanged) */}
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
    </div>
  );
}