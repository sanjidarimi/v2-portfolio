import { Home, User, Code2, Briefcase, Mail } from "lucide-react";
import { NavItem } from "@/types/nav";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User, hasDropdown: true },
  { label: "Skills", href: "#skills", icon: Code2 },
  { label: "Work", href: "#work", icon: Briefcase },
  { label: "Contact", href: "#contact", icon: Mail },
];
