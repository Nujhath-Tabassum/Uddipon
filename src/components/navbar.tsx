"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
Bell,
CalendarDays,
CalendarPlus,
Home,
LayoutGrid,
Menu,
Search,
User,
} from "lucide-react";

const navLinks = [
{ label: "Home", href: "/", icon: Home },
{ label: "Upcoming Events", href: "/events", icon: CalendarDays },
{ label: "Add Events", href: "/create-event", icon: CalendarPlus },
{ label: "My Events", href: "/my-events", icon: LayoutGrid },
];

export default function Navbar() {
const pathname = usePathname();
const router = useRouter();

const { data: session, isPending } = authClient.useSession();
const user = session?.user;

const [imageError, setImageError] = useState(false);

useEffect(() => {
setImageError(false);
}, [user?.image]);

const handleSignOut = async () => {
try {
await authClient.signOut();
router.push("/");
router.refresh();
} catch (error) {
console.error("Sign out failed:", error);
}
};

return ( <header className="sticky top-0 z-50 border-b border-brand-900/5 bg-white p-5 shadow-[0_1px_10px_rgba(18,48,31,0.06)]"> <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8"> <Link href="/" className="flex shrink-0 items-center gap-2.5"> <img
         src="/Uddipon_%20Together%20for%20a%20Better%20Tomorrow.png"
         alt="Uddipon Logo"
         className="h-30 w-50 rounded-full object-cover"
       /> </Link>

```
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
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </nav>

    <div className="ml-auto flex items-center gap-2 md:ml-0">
      {isPending ? (
        <div className="h-9 w-24 animate-pulse rounded-full bg-gray-100" />
      ) : user ? (
        <div className="flex items-center gap-2">
          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-full border border-brand-900/10 px-3 py-1.5 transition-colors hover:bg-brand-50"
          >
            {user.image && !imageError ? (
              <img
                src={user.image}
                alt={user.name || "Profile"}
                onError={() => setImageError(true)}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-sm font-bold uppercase text-brand-800">
                {user.name?.charAt(0) || "U"}
              </div>
            )}

            <span className="hidden max-w-24 truncate text-sm font-semibold text-brand-900 sm:block">
              {user.name || "Profile"}
            </span>
          </Link>

          <button
            onClick={handleSignOut}
            className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="rounded-full border border-brand-900 px-4 py-2 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-50"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="rounded-full bg-brand-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Sign Up
          </Link>
        </div>
      )}

      <button
        type="button"
        aria-label="Open menu"
        className="ml-1 grid h-9 w-9 place-items-center rounded-full text-brand-900/70 transition-colors hover:bg-brand-50 md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>
    </div>
  </div>

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
