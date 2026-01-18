import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, trend, trendValue, icon: Icon, isDark = false }) => {
  return (
    <div className={`p-6 rounded-[2rem] border shadow-sm flex flex-col justify-between h-full transition-all hover:shadow-md ${
      isDark ? 'bg-[#2D3748] border-none text-white' : 'bg-white border-slate-100 text-slate-900'
    }`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-bold uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {title}
          </p>
          <h3 className="text-3xl font-black mt-2 tracking-tight">{value}</h3>
        </div>
        <div className={`p-3 rounded-2xl ${isDark ? 'bg-white/10 text-white' : 'bg-teal-50 text-teal-600'}`}>
          <Icon size={24} />
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-2">
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${
          trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {trendValue}
        </div>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">vs last month</span>
      </div>
    </div>
  );
};

export default StatCard;