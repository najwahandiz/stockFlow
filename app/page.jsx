"use client";
import StatCard from '@/app/components/StatCard' ;
import Chart from './components/chart';
import AiCard from './components/aiCard';

import { useMemo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/app/redux/products/productsThunks";
import { generateSalesComment } from "./redux/ai/aiThunk";
import {Package,DollarSign,ShoppingCart,TrendingUp,Calendar,Filter} from "lucide-react";

export default function DashboardPage () {

  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState('');

  const dispatch = useDispatch();
  const { products = [] } = useSelector((state) => state.products);

  // Fetch products from backend on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  // Helper to ensure numbers
  function toNumber(val) {
    const n = Number(val);
    return isNaN(n) ? 0 : n;
  }
  
  // salesData always uses numbers
  const salesData = {
    totalStock: products
      .filter(p => p.status === "disponible")
      .reduce((sum, p) => sum + toNumber(p.quantity), 0),

    stockValue: products
      .filter(p => p.status === "disponible")
      .reduce((sum, p) => sum + toNumber(p.price) * toNumber(p.quantity), 0),

    soldProducts: products
      .filter(p => p.status === "vendu")
      .reduce((sum, p) => sum + toNumber(p.quantity), 0),

    salesValue: products
      .filter(p => p.status === "vendu")
      .reduce((sum, p) => sum + toNumber(p.price) * toNumber(p.quantity), 0),
      
  };

  //Send data of sales to AI automatically
  useEffect(() => {
    if (products.length > 0) {
      dispatch(generateSalesComment(salesData));
    }
  }, [products]);


  // ========================= LOGIQUE DE CALCUL ========================
 

  // Statistiques principales
  const stats = useMemo(() => {
    const available = products.filter((p) => p.status === "disponible");
    const sold = products.filter((p) => p.status === "vendu");

    const totalStock = available.reduce((sum, p) => sum + toNumber(p.quantity), 0);
    const stockValue = available.reduce((sum, p) => sum + toNumber(p.quantity) * toNumber(p.price), 0);
    const totalSold = sold.reduce((sum, p) => sum + toNumber(p.quantity), 0);
    const salesValue = sold.reduce((sum, p) => sum + toNumber(p.quantity) * toNumber(p.price), 0);

    return { totalStock, stockValue, totalSold, salesValue };
  }, [products]);

  // Ventes par catégorie (pour le graphique)
    const soldByCategory = useMemo(() => {
    const result = {};
    const soldProducts = products.filter((p) => p.status === "vendu");
    soldProducts.forEach((p) => {
      if (p.category) {
        result[p.category] = (result[p.category] || 0) + toNumber(p.quantity);
      }
    });

    // Convertir en tableau pour le graphique
    return Object.entries(result).map(([category, quantity]) => ({
      category,
      quantity,
      color: getCategoryColor(category)
      }));
    }, [products]);

  // Get all unique categories from sold products
  const soldCategories = useMemo(() => {
    const cats = new Set(products.filter(p => p.status === "vendu").map(p => p.category).filter(Boolean));
    return Array.from(cats);
  }, [products]);

  // Dernières ventes (8 plus récentes, filtrées par catégorie)
  const lastSoldProducts = useMemo(() => {
    let filtered = products.filter((p) => p.status === "vendu");
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    return filtered.slice(0, 8);
  }, [products, selectedCategory]);

  // Couleurs dynamiques pour les catégories
  function getCategoryColor(category) {
    const colors = {
      "Électronique": "#3B82F6",
      "Vêtements": "#10B981",
      "Maison": "#8B5CF6",
      "Sport": "#F59E0B",
      "Loisirs": "#EF4444",
      "Alimentation": "#F97316",
      "Automobile": "#6366F1",
      "default": "#6B7280"
    };
    
    return colors[category] || colors.default;
  }

  // Calculer le pourcentage maximum pour le graphique
  const maxQuantity = soldByCategory.length > 0 
    ? Math.max(...soldByCategory.map(item => item.quantity))
    : 1;

  return (
    <div className=" p-4 md:p-6 bg-gray-200 min-h-screen space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-1">Vue d'ensemble de votre inventaire</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-700">Données en temps réel</span>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Stock total" 
          value={stats.totalStock} 
          subtitle="articles en stock"
          icon={<Package className="text-blue-600" size={22}/>} 
          color="blue"
        />
        <StatCard 
          title="Valeur du stock" 
          value={`${stats.stockValue.toLocaleString('fr-FR')} Dh`} 
          subtitle="valeur totale"
          icon={<DollarSign className="text-emerald-600" size={22}/>} 
          color="emerald"
        />
        <StatCard 
          title="Produits vendus" 
          value={stats.totalSold} 
          subtitle="total vendu"
          icon={<ShoppingCart className="text-amber-600" size={22}/>} 
          color="amber"
        />
        <StatCard 
          title="Valeur des ventes" 
          value={`${stats.salesValue.toLocaleString('fr-FR')} Dh`} 
          subtitle="chiffre d'affaires"
          icon={<TrendingUp className="text-purple-600" size={22}/>} 
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
      {/* GRAPHIQUE DES VENTES */}
      <Chart soldByCategory={soldByCategory} totalSold ={stats.totalSold} maxQuantity={maxQuantity} />


      {/* AI Sales Analysis */}
      <AiCard />      

      </div>

      {/* TABLEAU DÉTAILLÉ DES VENTES */}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-5 border-b border-gray-100 gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Historique des ventes
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Détails de toutes les transactions récentes
            </p>
          </div>

        {/* Category Filter Dropdown */}
          <div className="flex items-center gap-2">
            <Filter size={16} />
            <select
              className="px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-700 focus:outline-none"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              <option value="">Toutes les catégories</option>
              {soldCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Produit</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Catégorie</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Qté</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Prix</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Total</th>
                <th className="text-left py-3 px-6 font-medium text-gray-600">Date</th>
              </tr>
            </thead>

          <tbody className="divide-y divide-gray-100">
            {lastSoldProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="py-4 px-6 font-medium text-gray-900">
                  {product.name}
                </td>

                <td className="py-4 px-6">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${getCategoryColor(product.category)}15`,
                      color: getCategoryColor(product.category),
                    }}
                  >
                    {product.category}
                  </span>
                </td>

                <td className="py-4 px-6 text-gray-700">
                  {product.quantity || 1}
                </td>

                <td className="py-4 px-6 text-gray-700">
                  {product.price} Dh
                </td>

                <td className="py-4 px-6 font-medium text-gray-900">
                  {(product.price) * (product.quantity || 1)} Dh
                </td>

                <td className="py-4 px-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {product.createdAt
                      ? new Date(product.createdAt).toLocaleDateString('fr-FR')
                      : 'N/A'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty state */}
      {lastSoldProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-14">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 mb-4">
            <ShoppingCart className="text-gray-400" size={28} />
          </div>
          <p className="text-gray-600 font-medium">
            Aucune vente enregistrée
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Les transactions apparaîtront ici une fois réalisées
          </p>
        </div>
      )}
  </div>

</div>
  );

}

