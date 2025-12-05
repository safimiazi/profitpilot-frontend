"use client";

import Header from "@/components/admin-dashboard/Header";
import MobileSidebar from "@/components/admin-dashboard/MobileSidebar";
import Sidebar from "@/components/admin-dashboard/Sidebar";
import DesktopHeader from "@/components/admin-dashboard/DesktopHeader";
import { useState } from "react";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden text-foreground">

      {/* Sidebar (fixed height, non-scrollable) */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Wrapper (flex column) */}
      <div className="flex flex-col flex-1 h-full">

        {/* Mobile Header */}
        <Header onOpenMobile={() => setMobileOpen(true)} />

        {/* Desktop Header */}       
         <div className="hidden md:block bg-header-bg border-b  border-border-color" >

          <DesktopHeader />
        </div>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto bg-main-bg p-5 mt-14 md:mt-0">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}
