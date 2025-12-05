"use client";

import { Menu } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

export default function Header({ onOpenMobile }: { onOpenMobile: () => void }) {
  return (
    <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-background border-b border-white/10 px-4 py-3 flex justify-between items-center">

      <button onClick={onOpenMobile}>
        <Menu size={26} />
      </button>
           <ProfileDropdown/>
      
    </div>
  );
}
