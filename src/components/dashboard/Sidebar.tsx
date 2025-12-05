"use client";

import { Home, MessageSquare, BarChart, Settings, ShoppingCart, Menu } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import SidebarItem from "./SidebarItem";

export default function Sidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}) {
  return (
    <div
      className={clsx(
        "hidden md:flex flex-col transition-all duration-300 bg-[#120A1A] h-screen",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && <span className="text-lg font-bold">Dashboard</span>}
        <button
          className="text-foreground/60 hover:text-primary"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={22} />
        </button>
      </div>

      <nav className="flex-1 mt-4 space-y-2">
        <SidebarItem collapsed={collapsed} icon={<Home />} label="Overview" href="/dashboard" />
        <SidebarItem collapsed={collapsed} icon={<MessageSquare />} label="Conversations" href="#" />
        <SidebarItem collapsed={collapsed} icon={<ShoppingCart />} label="Orders" href="#" />
        <SidebarItem collapsed={collapsed} icon={<BarChart />} label="Analytics" href="#" />
        <SidebarItem collapsed={collapsed} icon={<Settings />} label="Settings" href="#" />
      </nav>
    </div>
  );
}
