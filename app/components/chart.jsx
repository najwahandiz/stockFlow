import React from 'react'
import {
  Package,DollarSign,ShoppingCart,TrendingUp,ChevronRight,BarChart3,PieChart,Calendar,Filter,Eye
} from "lucide-react";


export default function Chart({soldByCategory,totalSold,maxQuantity}) {
  return (
    <div className="lg:col-span-2 bg-gray-50 rounded-[2rem] border border-slate-100 p-8 shadow-sm transition-all duration-300 hover:shadow-md">
  {/* HEADER : Typographie plus forte et icône stylisée */}
  <div className="flex justify-between items-start mb-10">
    <div>
      <h2 className="text-xl font-black text-slate-900 tracking-tight">Ventes par catégorie</h2>
      <p className="text-sm font-medium text-slate-500 mt-1">Répartition de la performance des produits</p>
    </div>
    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 group-hover:text-teal-600 transition-colors">
      <BarChart3 size={20} strokeWidth={2.5} />
    </div>
  </div>

  {soldByCategory.length > 0 ? (
    <div className="space-y-8">
      {soldByCategory.map((item) => (
        <div key={item.category} className="group cursor-default">
          {/* LABELS : Organisation propre */}
          <div className="flex justify-between items-end mb-3">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                Catégorie
              </span>
              <span className="font-bold text-slate-800 tracking-tight text-base group-hover:text-slate-900 transition-colors">
                {item.category}
              </span>
            </div>
            
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-slate-900">
                {item.quantity.toLocaleString()}
              </span>
              <span className="text-[11px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">
                {Math.round((item.quantity / totalSold) * 100)}%
              </span>
            </div>
          </div>

          {/* BARRE DE PROGRESSION : Design plus fin et moderne */}
          <div className="relative w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(0,0,0,0.05)]"
              style={{ 
                width: `${(item.quantity / maxQuantity) * 100}%`,
                backgroundColor: item.color,
                boxShadow: `0 0 20px ${item.color}30` // Effet glow léger
              }}
            />
          </div>
        </div>
      ))}
    </div>
  ) : (
    /* EMPTY STATE : Design épuré */
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 border border-slate-100">
        <BarChart3 className="text-slate-300" size={32} />
      </div>
      <h3 className="text-slate-900 font-bold text-lg">Données en attente</h3>
      <p className="text-slate-400 text-sm font-medium mt-1 text-center max-w-[200px]">
        Vos statistiques de vente s'afficheront dès la première transaction.
      </p>
    </div>
  )}
</div>
  )
}
