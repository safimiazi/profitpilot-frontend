// "use client";

// import Header from "@/components/dashboard/Header";
// import MobileSidebar from "@/components/dashboard/MobileSidebar";
// import Sidebar from "@/components/dashboard/Sidebar";
// import DesktopHeader from "@/components/dashboard/DesktopHeader"; // ← this
// import { useState } from "react";

// export default function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <div className="flex min-h-screen bg-background text-foreground">

//       {/* Mobile Header (md:hidden) */}
//       <Header onOpenMobile={() => setMobileOpen(true)} />

//       {/* Left Sidebar */}
//       <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//       {/* Mobile Sidebar */}
//       <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

//       {/* Main Content + Desktop Header */}
//       <div className="flex-1 flex flex-col">

//         {/* Desktop Header (hidden on mobile) */}
//         <div className="hidden md:block">
//           <DesktopHeader />
//         </div>

//         {/* Main Content */}
//         <main className="flex-1 p-5 mt-14 md:mt-0">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }
"use client";

import Header from "@/components/dashboard/Header";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import Sidebar from "@/components/dashboard/Sidebar";
import DesktopHeader from "@/components/dashboard/DesktopHeader";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">

      {/* Sidebar (fixed height, non-scrollable) */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Wrapper (flex column) */}
      <div className="flex flex-col flex-1 h-full">

        {/* Mobile Header */}
        <Header onOpenMobile={() => setMobileOpen(true)} />

        {/* Desktop Header */}
        <div className="hidden md:block">
          <DesktopHeader />
        </div>

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto  p-5 mt-14 md:mt-0">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}
