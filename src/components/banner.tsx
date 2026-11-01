import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

export default function Banner() {
  return (
    <section className="bg-green-50 px-3 pt-4 dark:bg-background sm:px-6 lg:px-8">
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl bg-brand-950 sm:rounded-3xl">
        <Image
          src="/Growing Together_ A Community of Change.png"
          alt="Community illustration: volunteers, a green city and hands holding the earth"
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover"
          priority
        />

        <div
          className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/85 to-brand-950/20"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-brand-950/20 mix-blend-multiply"
          aria-hidden="true"
        />

        <div
          className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-leaf-400/20 blur-3xl"
          aria-hidden="true"
        />
        <LeafSprig className="pointer-events-none absolute -left-3 bottom-10 hidden h-24 w-24 rotate-12 text-leaf-400/30 lg:block" />
        <LeafSprig className="pointer-events-none absolute left-4 top-3 hidden h-14 w-14 -rotate-[135deg] text-leaf-400/20 xl:block" />

        <div className="relative flex min-h-[300px] flex-col justify-center gap-4 px-5 py-10 sm:min-h-[340px] sm:px-10 sm:py-12 md:min-h-[380px] md:px-14 lg:px-16">
          <h1 className="max-w-xl text-3xl font-bold leading-[1.1] tracking-tight text-white min-[400px]:text-4xl sm:text-5xl lg:text-[3.4rem]">
            Together for a{" "}
            <span className="text-leaf-400">Better Community</span>
          </h1>

          <p className="max-w-lg text-sm leading-relaxed text-brand-100/90 sm:text-base">
            Join hands for social development. Create, join, and support
            community events in your area.
          </p>

          <div className="mt-1 flex flex-wrap items-center gap-3">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2.5 text-sm font-semibold text-brand-900 transition-colors hover:bg-white sm:px-5"
            >
              Explore Events
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:px-5"
            >
              Add Your Event
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}