import React from 'react'
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';

import { useSelector } from "react-redux";


export default function AiCard() {

    const {comment, loading, error} = useSelector((state)=>state.ai);

  return (
    <div>
       <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm mt-6 relative overflow-hidden group transition-all hover:shadow-md">
        {/* Effet décoratif discret en arrière-plan */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50/50 rounded-full -mr-16 -mt-16 blur-3xl transition-colors group-hover:bg-teal-100/50"></div>

        <div className="relative flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
            <div className="p-2.5 bg-teal-50 rounded-xl text-teal-600 shadow-sm border border-teal-100/50">
                <Sparkles size={20} strokeWidth={2.5} />
            </div>
            <div>
                <h3 className="font-black text-slate-900 text-lg tracking-tight">AI Insights</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">
                Analyse prédictive
                </p>
            </div>
            </div>
            
            {/* Badge "Live" comme sur votre image de référence */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-teal-50/50 border border-teal-100 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-teal-700 uppercase tracking-wider">Live Analysis</span>
            </div>
        </div>

        {loading && (
            <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 transition-all">
            <Loader2 className="w-8 h-8 text-teal-500 animate-spin opacity-70" />
            <span className="text-sm font-bold text-slate-500 tracking-tight">
                Calcul des tendances en cours...
            </span>
            </div>
        )}

        {comment && !loading && (
            <div className="relative bg-slate-50/80 border border-slate-100 rounded-2xl p-6 transition-all animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="absolute top-4 right-4 opacity-10">
                <Sparkles size={40} className="text-teal-600" />
            </div>
            <p className="text-sm font-bold text-slate-700 leading-relaxed relative z-10">
                {comment}
            </p>
            </div>
        )}

        {error && !loading && (
            <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl animate-in shake duration-300">
            <AlertCircle size={18} className="shrink-0 mt-0.5" />
            <div className="text-xs font-bold leading-tight">
                Indisponibilité de l'IA : <span className="font-medium opacity-80">{error}</span>
            </div>
            </div>
        )}
        </div>
    </div>
  )
}
