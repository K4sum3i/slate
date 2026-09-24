import {
  BugIcon,
  HeartHandshakeIcon,
  HomeIcon,
  LayoutDashboardIcon,
  MonitorIcon,
  MoonIcon,
  SettingsIcon,
  SproutIcon,
  SunIcon,
  TelescopeIcon,
} from "lucide-react";
import { GitHub } from "../icons/logos";

export const Pages = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
];

export const ChangeTheme = [
  {
    name: "Light Theme",
    param: "light",
    icon: SunIcon,
  },
  {
    name: "Dark Theme",
    param: "dark",
    icon: MoonIcon,
  },
  {
    name: "System Theme",
    param: "system",
    icon: MonitorIcon,
  },
];

export const DocumentationPages = [
  {
    name: "Getting Started",
    href: "",
    icon: SproutIcon,
  },
  {
    name: "Roadmap",
    href: "",
    icon: TelescopeIcon,
  },
  {
    name: "Contributing",
    href: "",
    icon: HeartHandshakeIcon,
  },
  {
    name: "Report a Bug",
    href: "",
    icon: BugIcon,
  },
];

export const SocialPages = [
  {
    name: "X (Formerly Twitter)",
    href: "",
  },
  {
    name: "GitHub Repository",
    href: "",
    icon: GitHub,
  },
];
