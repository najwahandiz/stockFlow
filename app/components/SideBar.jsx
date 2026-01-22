import {
  LayoutDashboard,
  Box,
  Plus,
} from "lucide-react";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 fixed min-h-screen bg-gradient-to-b from-[#0F172A] to-[#020617] text-gray-300 flex flex-col">
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-teal-500 text-white font-bold">
          📦
        </div>
        <h1 className="text-lg font-semibold text-white">StockFlow</h1>
      </div>

      {/* Main Menu */}
      <div className="flex-1 px-4 py-6">

        <nav className="space-y-2 cursor-pointer">
          <Link className=" cursor-pointer" href={"/"}>
            <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" />
          </Link>

          <Link href={"/products/"}>
          <SidebarItem icon={<Box size={18} />} label="Products" />
          </Link>

          {/* Active Button */}
          {/* <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow-md"> */}
            <Link className=" cursor-pointer" href={"/products/new"}>
              <SidebarItem icon={<Plus size={18} />} label=" Add product" />
             
            </Link>
          {/* </button> */}

        </nav>
      </div>

    
    </aside>
  );
}

function SidebarItem({ icon, label }) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition cursor-pointer">
      {icon}
      <span>{label}</span>
    </button>
  );
}
