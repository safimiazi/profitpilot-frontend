"use client";

import { Home, MessageSquare, BarChart, Settings, ShoppingCart, X } from "lucide-react";
import SidebarItem from "./SidebarItem";

export default function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="md:hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className="fixed top-0 left-0 h-full w-64 bg-sidebar-bg z-50 p-4 shadow-xl animate-slide-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Dashboard</h2>
          <button onClick={onClose}>
            <X size={26} />
          </button>
        </div>

        <nav className="space-y-2 mt-2">
          <SidebarItem collapsed={false} icon={<Home />} label="Overview" href="/dashboard" />
          <SidebarItem collapsed={false} icon={<MessageSquare />} label="Conversations" href="#" />
          <SidebarItem collapsed={false} icon={<ShoppingCart />} label="Orders" href="#" />
          <SidebarItem collapsed={false} icon={<BarChart />} label="Analytics" href="#" />
          <SidebarItem collapsed={false} icon={<Settings />} label="Settings" href="#" />
        </nav>
      </div>
    </div>
  );
}
