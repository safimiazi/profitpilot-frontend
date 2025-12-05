"use client";

import ProfileDropdown from "./ProfileDropdown";

export default function DesktopHeader() {

  return (
<div className="hidden md:flex justify-end items-center px-6 py-4 border-b border-white/10  relative">
      
     <ProfileDropdown/>
    </div>
  );
}
