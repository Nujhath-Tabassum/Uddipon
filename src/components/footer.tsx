import Link from "next/link";

type IconProps = { className?: string };

function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LeafSprig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M32 62C32 44 32 24 33 6"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <ellipse cx="21" cy="17" rx="10" ry="4.5" transform="rotate(-35 21 17)" />
      <ellipse cx="44" cy="24" rx="10" ry="4.5" transform="rotate(32 44 24)" />
      <ellipse cx="21" cy="33" rx="10" ry="4.5" transform="rotate(-35 21 33)" />
      <ellipse cx="44" cy="40" rx="10" ry="4.5" transform="rotate(32 44 40)" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/events" },
  { label: "Add Events", href: "/events/new" },
  { label: "My Events", href: "/my-events" },
];

const aboutLinks = [
  { label: "Our Mission", href: "#" },
  { label: "How It Works", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "FAQ", href: "#" },
];

const socialLinks = [
  { label: "X (Twitter)", href: "#", icon: XIcon },
  { label: "Facebook", href: "#", icon: FacebookIcon },
  { label: "Instagram", href: "#", icon: InstagramIcon },
  { label: "LinkedIn", href: "#", icon: LinkedinIcon },
  { label: "YouTube", href: "#", icon: YoutubeIcon },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-brand-900/10 bg-white text-brand-900 shadow-[0_-4px_20px_rgba(18,48,31,0.04)]">

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-12 lg:px-8">

        {/* Brand */}
        <div>
          <Link href="/" className="inline-flex items-center rounded-lg transition-transform duration-300 hover:scale-[1.02]">
            <img
              src="/Uddipon_%20Together%20for%20a%20Better%20Tomorrow.png"
              alt="Uddipon Logo"
              className="h-24 w-44 object-contain object-left"
            />
          </Link>

          <p className="mt-3 max-w-[17rem] text-sm leading-7 text-brand-700/80">
            Stronger Community, Brighter Future. Together, we can
            make a meaningful difference in people&apos;s lives.
          </p>

          <div className="mt-5 flex items-center gap-2 text-xs font-semibold tracking-wide text-brand-700">
            <LeafSprig className="h-5 w-5 text-leaf-500" />
            Together for a Better Tomorrow
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-brand-900">
            Quick Links
          </h3>

          <ul className="space-y-3.5">
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="group inline-flex items-center text-sm text-brand-700/80 transition-all duration-300 hover:translate-x-1 hover:text-brand-600"
                >
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-leaf-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-brand-900">
            About Us
          </h3>

          <ul className="space-y-3.5">
            {aboutLinks.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="group inline-flex items-center text-sm text-brand-700/80 transition-all duration-300 hover:translate-x-1 hover:text-brand-600"
                >
                  <span className="mr-2 h-1.5 w-1.5 rounded-full bg-leaf-500 opacity-0 transition-opacity group-hover:opacity-100" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-brand-900">
            Follow Us
          </h3>

          <p className="mb-5 max-w-[15rem] text-sm leading-6 text-brand-700/80">
            Stay connected with our community and follow our journey.
          </p>

          <div className="flex flex-wrap gap-2.5">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-brand-900/10 bg-brand-50/50 text-brand-700 transition-all duration-300 hover:-translate-y-1 hover:border-brand-700 hover:bg-brand-700 hover:text-white hover:shadow-md"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-brand-900/10 bg-brand-50/60">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 sm:flex-row lg:px-8">
          <p className="text-xs text-brand-700/75">
            © 2026 Uddipon. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-xs font-medium text-brand-700">
            Together for a Better Tomorrow
            <span className="text-leaf-500">♥</span>
          </p>
        </div>
      </div>

    </footer>
  );
}