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
                {!collapsed && (
                    <div className="flex items-center gap-3  rounded-xl  backdrop-blur-sm ">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center text-white font-bold shadow-lg">
                            PP
                        </div>

                        <div>
                            <div className="text-lg font-semibold leading-tight tracking-wide">
                                ProfitPilot
                            </div>

                            <div className="text-xs text-white/60 font-medium">
                                AI Chatbot System
                            </div>
                        </div>
                    </div>

                )}
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
