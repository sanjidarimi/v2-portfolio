"use client";

import { NavItem } from "@/types/nav";
import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
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
        className="relative flex items-center gap-1 rounded-full border border-border bg-card p-1.5 backdrop-blur-md shadow-2xl"
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.label;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setActiveTab(item.label)}
              className={`group relative flex items-center gap-4 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                isActive
                  ? "bg-background/50 text-foreground border-2 border-border shadow-inner"
                  : " hover:bg-secondary"
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

export interface MobileNavDockProps {
  items: NavItem[];
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export function MobileNavDock({
  items,
  isOpen,
  onClose,
  className = "",
}: MobileNavDockProps) {
  const pathname = usePathname();

  // Internal open state used when not controlled by parent
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof isOpen === "boolean";
  const effectiveOpen = isControlled ? isOpen : internalOpen;

  const handleClose = useCallback(() => {
    if (isControlled) {
      onClose?.();
    } else {
      setInternalOpen(false);
    }
  }, [isControlled, onClose]);

  // Close dock on Escape key press
  useEffect(() => {
    if (!effectiveOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [effectiveOpen, handleClose]);

  // If a route navigation item matches current pathname, derive it directly
  const currentRouteItem = items.find(
    (item) => !item.href.startsWith("#") && item.href === pathname,
  );

  const [activeSection, setActiveSection] = useState<string>(
    () => items[0]?.label || "Home",
  );

  const activeTab = currentRouteItem ? currentRouteItem.label : activeSection;

  const isManualScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Set up IntersectionObserver for single-page sections & scroll detection
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hashItems = items.filter((item) => item.href.startsWith("#"));
    const sectionIds = hashItems.map((item) => item.href.slice(1));

    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      const elements = sectionIds
        .map((id) => ({ id, el: document.getElementById(id) }))
        .filter(
          (entry): entry is { id: string; el: HTMLElement } =>
            entry.el !== null,
        );

      if (elements.length === 0) return false;

      observer = new IntersectionObserver(
        (entries) => {
          if (isManualScrollRef.current) return;

          const visible = entries.filter((entry) => entry.isIntersecting);
          if (visible.length > 0) {
            visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            const topId = visible[0].target.id;
            const activeNav = items.find((item) => item.href === `#${topId}`);
            if (activeNav) {
              setActiveSection(activeNav.label);
            }
          }
        },
        {
          root: null,
          rootMargin: "-20% 0px -40% 0px",
          threshold: [0.1, 0.25, 0.5, 0.75, 1.0],
        },
      );

      elements.forEach(({ el }) => observer?.observe(el));
      return true;
    };

    const hasObserved = setupObserver();

    // Check initial hash asynchronously to let DOM settle
    const initialHashTimer = setTimeout(() => {
      if (window.location.hash) {
        const match = items.find((item) => item.href === window.location.hash);
        if (match) setActiveSection(match.label);
      }
    }, 0);

    // In case target elements are rendered asynchronously, retry observation
    let retryTimer: NodeJS.Timeout | null = null;
    if (!hasObserved) {
      retryTimer = setTimeout(() => {
        setupObserver();
      }, 500);
    }

    // Scroll listener for top of page
    const handleScroll = () => {
      if (isManualScrollRef.current) return;
      if (window.scrollY < 80 && items[0]?.href.startsWith("#")) {
        setActiveSection(items[0].label);
      }
    };

    const handleHashChange = () => {
      const currentHash = window.location.hash;
      const match = items.find((item) => item.href === currentHash);
      if (match) setActiveSection(match.label);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
      clearTimeout(initialHashTimer);
      if (retryTimer) clearTimeout(retryTimer);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [items]);

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem,
  ) => {
    setActiveSection(item.label);

    if (item.href.startsWith("#")) {
      const targetId = item.href.slice(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();
        isManualScrollRef.current = true;
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isManualScrollRef.current = false;
        }, 1000);

        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", item.href);
      }
    }

    // Smoothly close dock upon navigation
    handleClose();
  };

  return (
    <>
      {/* Backdrop overlay for outside tap */}
      {effectiveOpen && (
        <div
          role="presentation"
          aria-hidden="true"
          onClick={handleClose}
          className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 md:hidden"
        />
      )}

      {/* Standalone floating toggle trigger (when uncontrolled and closed) */}
      {!isControlled && !effectiveOpen && (
        <button
          type="button"
          onClick={() => setInternalOpen(true)}
          aria-label="Open navigation dock"
          className="fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-50 md:hidden pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-card-foreground backdrop-blur-xl shadow-2xl transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          style={{ left: "max(0.75rem, env(safe-area-inset-left))" }}
        >
          <Menu className="h-5 w-5 text-primary" />
        </button>
      )}

      {/* Floating Vertical Navigation Dock */}
      <aside
        aria-label="Mobile Navigation"
        aria-hidden={!effectiveOpen}
        className={`fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-50 md:hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
          effectiveOpen
            ? "translate-x-0 opacity-100 pointer-events-auto scale-100"
            : "-translate-x-28 opacity-0 pointer-events-none scale-95"
        } ${className}`}
        style={{ left: "max(0.75rem, env(safe-area-inset-left))" }}
      >
        <StarBorder
          as="div"
          color="#570cc7"
          speed="6s"
          thickness={1}
          backgroundColor="transparent"
          className="star-border-vertical rounded-full shadow-[0_0_25px_rgba(87,12,199,0.40)]"
        >
          <nav
            aria-label="Mobile Navigation Dock"
            className="relative flex flex-col items-center gap-2 rounded-full border border-border bg-card p-1.5 backdrop-blur-md shadow-2xl"
          >
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.label;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleItemClick(e, item)}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={`group relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 ${
                    isActive
                      ? "bg-linear-to-tr from-primary/40 via-primary/60 to-primary text-foreground shadow-[0_0_16px_rgba(140,77,235,0.7),0_0_28px_rgba(87,12,199,0.35)] ring-1 ring-card-foreground/30 scale-105"
                      : "hover:bg-card-foreground/10 active:scale-95"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 transition-transform duration-300 ${
                      isActive ? "scale-110" : "group-hover:scale-110"
                    }`}
                  />

                  {/* Floating tooltip to the right */}
                  <span
                    role="tooltip"
                    className="pointer-events-none absolute left-full ml-3.5 z-50 flex items-center whitespace-nowrap rounded-md border border-border bg-background/95 px-2.5 py-1 text-xs font-medium text-foreground shadow-xl backdrop-blur-md opacity-0 -translate-x-1.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0"
                  >
                    <span className="absolute -left-1 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-border" />
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </StarBorder>
      </aside>
    </>
  );
}
