"use client";

import { ChevronDown, LogOut, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="relative">
      {/* Profile Button */}
      <div
        className="flex items-center gap-3 cursor-pointer p-2 rounded-xl  transition"
        onClick={() => setOpen(!open)}
      >
        <img
          src="/your-profile.jpg"
          className="w-10 h-10 rounded-full object-cover border border-white/20 shadow-md"
        />

        <div className="text-left hidden md:block">
          <p className="text-sm font-semibold">Safi Mianchi</p>
          <p className="text-xs text-neutral-500">user</p>
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-14 right-0 w-56 rounded-2xl p-3 shadow-2xl backdrop-blur-xl
                       bg-white/5 border border-white/10 animate-fade-in">
          {/* Theme toggle */}
          <div
            onClick={toggleTheme}
            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-white/10 transition"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 my-2" />

          {/* Logout */}
          <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-red-500/20 transition text-red-400">
            <LogOut size={18} />
            <span>Logout</span>
          </div>
        </div>
      )}

     
    </div>
  );
}
