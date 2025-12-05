// "use client";

// import { useState } from "react";
// import {
//   Home,
//   MessageSquare,
//   BarChart,
//   Settings,
//   ShoppingCart,
//   Menu,
//   X
// } from "lucide-react";
// import Link from "next/link";
// import clsx from "clsx";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-background text-foreground">

//       {/* 🟣 Mobile Header with Menu Button */}
//       <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-background border-b border-white/10 px-4 py-3 flex justify-between items-center">
//         <h2 className="text-lg font-semibold">Dashboard</h2>
//         <button onClick={() => setMobileOpen(true)}>
//           <Menu size={26} />
//         </button>
//       </div>

//       {/* ============================
//            Desktop Sidebar
//       ============================== */}
//       <div
//         className={clsx(
//           "hidden md:flex flex-col transition-all duration-300 bg-[#120A1A] h-screen",
//           collapsed ? "w-20" : "w-64"
//         )}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4">
//           {!collapsed && <span className="text-lg font-bold">Dashboard</span>}
//           <button
//             className="text-foreground/60 hover:text-primary"
//             onClick={() => setCollapsed(!collapsed)}
//           >
//             <Menu size={22} />
//           </button>
//         </div>

//         <nav className="flex-1 mt-4 space-y-2">
//           <SidebarItem collapsed={collapsed} icon={<Home />} label="Overview" href="/dashboard" />
//           <SidebarItem collapsed={collapsed} icon={<MessageSquare />} label="Conversations" href="#" />
//           <SidebarItem collapsed={collapsed} icon={<ShoppingCart />} label="Orders" href="#" />
//           <SidebarItem collapsed={collapsed} icon={<BarChart />} label="Analytics" href="#" />
//           <SidebarItem collapsed={collapsed} icon={<Settings />} label="Settings" href="#" />
//         </nav>
//       </div>

//       {/* ============================
//            Mobile Sidebar (Slide-in)
//       ============================== */}
//       {mobileOpen && (
//         <div className="md:hidden">
//           {/* Overlay */}
//           <div
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//             onClick={() => setMobileOpen(false)}
//           />

//           {/* Sidebar */}
//           <div className="fixed top-0 left-0 h-full w-64 bg-[#120A1A] z-50 p-4 shadow-xl animate-slide-in">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-lg font-bold">Dashboard</h2>
//               <button onClick={() => setMobileOpen(false)}>
//                 <X size={26} />
//               </button>
//             </div>

//             <nav className="space-y-2 mt-2">
//               <SidebarItem collapsed={false} icon={<Home />} label="Overview" href="/dashboard" />
//               <SidebarItem collapsed={false} icon={<MessageSquare />} label="Conversations" href="#" />
//               <SidebarItem collapsed={false} icon={<ShoppingCart />} label="Orders" href="#" />
//               <SidebarItem collapsed={false} icon={<BarChart />} label="Analytics" href="#" />
//               <SidebarItem collapsed={false} icon={<Settings />} label="Settings" href="#" />
//             </nav>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <main className="flex-1 p-5 mt-14 md:mt-0">{children}</main>
//     </div>
//   );
// }

// const SidebarItem = ({
//   icon,
//   label,
//   href,
//   collapsed,
// }: {
//   icon: any;
//   label: string;
//   href: string;
//   collapsed: boolean;
// }) => {
//   return (
//     <Link
//       href={href}
//       className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
//     >
//       {icon}
//       {!collapsed && <span>{label}</span>}
//     </Link>
//   );
// };
"use client";

import Header from "@/components/dashboard/Header";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import Sidebar from "@/components/dashboard/Sidebar";
import { useState } from "react";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Mobile Top Header */}
      <Header onOpenMobile={() => setMobileOpen(true)} />

      {/* Desktop Sidebar */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Mobile Sidebar */}
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 p-5 mt-14 md:mt-0">{children}</main>
    </div>
  );
}
