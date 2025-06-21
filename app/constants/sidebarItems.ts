import { sidebarItems as defaultSidebarItems } from "~/constants";

export const adminSidebarItems = [
  {
    id: 1,
    icon: "/assets/icons/home.svg",
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    id: 3,
    icon: "/assets/icons/users.svg",
    label: "All Users",
    href: "/all-users",
  },
  {
    id: 4,
    icon: "/assets/icons/itinerary.svg",
    label: "AI Trips",
    href: "/all-trips",
  },
];

export const userSidebarItems = [
  {
    id: 1,
    icon: "/assets/icons/home.svg",
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    id: 2,
    icon: "/assets/icons/itinerary.svg",
    label: "My Trips",
    href: "/my-trips",
  },
  {
    id: 3,
    icon: "/assets/icons/itinerary.svg",
    label: "AI Trip",
    href: "/all-trips",
  },
  {
    id: 4,
    icon: "/assets/icons/users.svg",
    label: "Profile",
    href: "/user/profile",
  },
];
