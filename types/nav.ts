import { ComponentType } from "react";

export interface NavItem {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  hasDropdown?: boolean;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}
