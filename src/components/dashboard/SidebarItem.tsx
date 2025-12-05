"use client";

import Link from "next/link";

export default function SidebarItem({
  icon,
  label,
  href,
  collapsed,
}: {
  icon: any;
  label: string;
  href: string;
  collapsed: boolean;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-primary/10 transition-colors"
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}
