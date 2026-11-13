"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

import { NAV_ITEMS } from "@/data/nav.data";
import { MobileNavDock, NavbarClient } from "./navbar-client";

export function Navbar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <>
      <header className="fixed top-6 inset-x-0 z-50 flex items-center justify-between container mx-auto pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3">
          <Link
            href="/"
            className="text-4xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          >
            Rimi<span className="text-primary">..</span>
          </Link>
        </div>

        <div className="pointer-events-auto hidden md:block">
          <NavbarClient items={NAV_ITEMS} />
        </div>

        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-border bg-card p-1.5 backdrop-blur-md">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="rounded-full p-2 text-neutral-400 hover:text-foreground hover:bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <FaGithub className="h-4 w-4" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Profile"
            className="rounded-full p-2 text-neutral-400 hover:text-foreground hover:bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <FaFacebook className="h-4 w-4" />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="rounded-full p-2 text-neutral-400 hover:text-foreground hover:bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <FaLinkedin className="h-4 w-4" />
          </a>

          {/* Mobile Menu Icon Button */}
          <button
            type="button"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
            aria-label={
              isMobileNavOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMobileNavOpen}
            className="md:hidden cursor-pointer flex h-8 w-8 items-center justify-center rounded-full text-neutral-300 hover:text-foreground hover:bg-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {isMobileNavOpen ? (
              <X className="h-4 w-4 text-primary" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </header>

      {/* Floating Vertical Navigation Dock (Mobile Only) */}
      <MobileNavDock
        items={NAV_ITEMS}
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
