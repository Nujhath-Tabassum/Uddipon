"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
Bell,
CalendarDays,
CalendarPlus,
ChevronDown,
Home,
LayoutGrid,
Menu,
Search,
} from "lucide-react";

const navLinks = [
{ label: "Home", href: "/", icon: Home },
{ label: "Upcoming Events", href: "/events", icon: CalendarDays },
{ label: "Add Events", href: "/create-event", icon: CalendarPlus },
{ label: "My Events", href: "/my-events", icon: LayoutGrid },
];

export default function Navbar() {
const pathname = usePathname();

return ( <header className="sticky top-0 z-50 border-b border-brand-900/5 bg-white p-5 shadow-[0_1px_10px_rgba(18,48,31,0.06)]">


  <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">

    {/* Brand */}
    <Link href="/" className="flex shrink-0 items-center gap-2.5">
      <img
        src="/Uddipon_%20Together%20for%20a%20Better%20Tomorrow.png"
        alt="Uddipon Logo"
        className="h-30 w-50 rounded-full object-cover"
      />
    </Link>

    {/* Desktop Navigation */}
    <nav className="mx-auto hidden items-center gap-1 md:flex">
      {navLinks.map(({ label, href, icon: Icon }) => {
        const active = pathname === href;

        return (
          <Link
            key={label}
            href={href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "inline-flex items-center gap-2 rounded-full bg-brand-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors"
                : "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-brand-900/80 transition-colors hover:bg-brand-50 hover:text-brand-800"
            }
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
          </Link>
        );
      })}
    </nav>

    {/* Utilities */}
    <div className="ml-auto flex items-center gap-1 md:ml-0">

      <button
        type="button"
        aria-label="Search events"
        className="grid h-9 w-9 place-items-center rounded-full text-brand-900/70 transition-colors hover:bg-brand-50 hover:text-brand-800"
      >
        <Search className="h-4 w-4" />
      </button>

      <button
        type="button"
        aria-label="Notifications"
        className="relative grid h-9 w-9 place-items-center rounded-full text-brand-900/70 transition-colors hover:bg-brand-50 hover:text-brand-800"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-sun-500 ring-2 ring-white" />
      </button>

      <button
        type="button"
        className="ml-1 flex items-center gap-1.5 rounded-full border border-brand-900/10 bg-white py-1 pl-1 pr-2 transition-shadow hover:shadow-sm"
      >
        <Avatar size="sm" className="ring-0">
          <AvatarFallback className="bg-brand-50">
            <span className="logo-mark block size-full rounded-full" />
          </AvatarFallback>
        </Avatar>

        <span className="hidden text-sm font-medium text-brand-900 sm:block">
          Profile
        </span>

        <ChevronDown className="hidden h-3.5 w-3.5 text-brand-900/50 sm:block" />
      </button>

      <button
        type="button"
        aria-label="Open menu"
        className="ml-1 grid h-9 w-9 place-items-center rounded-full text-brand-900/70 transition-colors hover:bg-brand-50 md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
    </div>
  </div>

  {/* Mobile Navigation */}
  <nav className="flex gap-1 overflow-x-auto border-t border-brand-900/5 px-4 py-2 md:hidden">
    {navLinks.map(({ label, href, icon: Icon }) => {
      const active = pathname === href;

      return (
        <Link
          key={label}
          href={href}
          aria-current={active ? "page" : undefined}
          className={
            active
              ? "inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-900 px-3 py-1.5 text-xs font-semibold text-white"
              : "inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-brand-900/80 hover:bg-brand-50"
          }
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </Link>
      );
    })}
  </nav>

</header>

);
}

