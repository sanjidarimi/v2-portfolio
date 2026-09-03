"use client";
import Link from "next/link";

import { NavbarClient } from "./navbar-client";
import { NAV_ITEMS } from "@/data/nav.data";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

export function Navbar() {
  return (
    <header className="fixed top-6 inset-x-0 z-50 flex items-center justify-between px-6 container mx-auto pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-3">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        >
          Rimi<span className="text-primary">.</span>
        </Link>
      </div>

      <div className="pointer-events-auto hidden md:block">
        <NavbarClient items={NAV_ITEMS} />
      </div>

      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-neutral-950/40 p-1.5 backdrop-blur-md">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <FaGithub className="h-4 w-4" />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <FaFacebook className="h-4 w-4" />
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          className="rounded-full p-2 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <FaLinkedin className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}
