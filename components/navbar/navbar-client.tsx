"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NavItem } from "@/types/nav";
import StarBorder from "../ui/StarBorder";

interface NavbarClientProps {
  items: NavItem[];
}

export function NavbarClient({ items }: NavbarClientProps) {
  const [activeTab, setActiveTab] = useState<string>("Home");

  return (
    <StarBorder
      as="div"
      color="#a855f7"
      speed="8s"
      thickness={1}
      backgroundColor="transparent"
    >
      <nav
        aria-label="Main Navigation"
        className="relative flex items-center gap-1 rounded-full border border-white/10 bg-neutral-950/60 p-1.5 backdrop-blur-md shadow-2xl"
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.label;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setActiveTab(item.label)}
              className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isActive
                  ? "bg-white/10 text-white shadow-inner"
                  : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
              <span>{item.label}</span>
              {item.hasDropdown && (
                <ChevronDown className="h-3 w-3 opacity-70 transition-transform duration-200 group-hover:translate-y-0.5" />
              )}
            </Link>
          );
        })}
      </nav>
    </StarBorder>
  );
}
