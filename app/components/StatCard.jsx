import React from 'react';

export default function StatCard({ title, value, subtitle, icon, color }) {
  // Configuration des couleurs utilisant des tons Slate pour la modernité
  const colorConfig = {
    blue: "text-blue-600 bg-blue-50/50 border-blue-100",
    emerald: "text-teal-600 bg-emerald-50/50 border-emerald-100",
    amber: "text-amber-600 bg-amber-50/50 border-amber-100",
    purple: "text-purple-600 bg-purple-50/50 border-purple-100"
  };

  return (
    <div className="group bg-gray-100 p-4  rounded-[2rem] border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-6">
        {/* Container Icône : Plus large avec des coins arrondis doux */}
        <div className={`p-3.5 rounded-2xl border transition-colors duration-300 bg-white ${colorConfig[color]}`}>
          {React.cloneElement(icon, { size: 22, strokeWidth: 2.5 })}
        </div>
        
        {/* Titre : Très petit, noir profond et espacé (Style Dashboard Pro) */}
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] mt-1">
          {title}
        </div>
      </div>

      <div>
        {/* Valeur : Typographie "Black" ultra-lisible */}
        <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
          {value}
        </h3>
        
        {/* Sous-titre : Avec un petit indicateur visuel */}
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-teal-400 transition-colors"></span>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}