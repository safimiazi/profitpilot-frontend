import { ChevronDown, LogOut, Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function ProfileDropdown() {
    const [open, setOpen] = useState(false);

    return (
        <div>
            {/* Profile Area */}
            <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                <img
                    src="/your-profile.jpg"
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-left">
                    <p className="text-sm font-semibold">Safi Mianchi</p>
                    <p className="text-xs text-neutral-500">Admin</p>
                </div>
                <ChevronDown size={18} />
            </div>

            {/* Dropdown */}
            {open && (
                <div className="absolute top-16 right-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl w-52 shadow-xl p-3">
                    <div className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg cursor-pointer">
                        <Sun size={18} />
                        <span>Light Mode</span>
                    </div>

                    <div className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg cursor-pointer">
                        <Moon size={18} />
                        <span>Dark Mode</span>
                    </div>

                    <div className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg cursor-pointer text-red-400 mt-1">
                        <LogOut size={18} />
                        <span>Logout</span>
                    </div>
                </div>
            )}

        </div>
    )
}

