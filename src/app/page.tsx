"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  HeartHandshake,
  Users,
  Leaf,
  MapPin,
  Clock,
  HandHeart,
  Mail,
} from "lucide-react";
import Banner from "@/components/banner";

const API_URL = "http://localhost:8000";

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
}

const features = [
  {
    icon: CalendarDays,
    title: "Discover Events",
    description:
      "Explore community service events and find opportunities to make a difference.",
  },
  {
    icon: HeartHandshake,
    title: "Join the Community",
    description:
      "Connect with people who share your passion for helping others.",
  },
  {
    icon: HandHeart,
    title: "Create an Impact",
    description:
      "Create your own events and encourage others to participate.",
  },
];

const galleryImages = [
  {
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600",
    title: "Community Volunteering",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600",
    title: "Helping Others",
  },
  {
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600",
    title: "Community Support",
  },
  {
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600",
    title: "Working Together",
  },
  {
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600",
    title: "Supporting Children",
  },
  {
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600",
    title: "Building Connections",
  },
];

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events/recent`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load events.");
        }

        setEvents(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEvents();
  }, []);

  return (
    <main className="bg-[#FAF9F5]">

      <Banner />

      {/* Features */}
      <section className="px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-leaf-500">
              What We Do
            </span>

            <h2 className="mt-3 text-3xl font-bold text-brand-950 sm:text-4xl">
              Making a Difference Together
            </h2>

            <p className="mt-4 leading-7 text-brand-700/75">
              Uddipon brings people together to support communities,
              participate in meaningful activities, and create positive change.
            </p>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-brand-900/5 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-brand-800">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-brand-950">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-brand-700/75">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Upcoming Events */}
      <section className="bg-green-50/70 px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-leaf-500">
                Get Involved
              </span>

              <h2 className="mt-3 text-3xl font-bold text-brand-950 sm:text-4xl">
                Recent Upcoming Events
              </h2>

              <p className="mt-3 text-brand-700/75">
                Find an event and become part of something meaningful.
              </p>
            </div>

            <Link
              href="/events"
              className="inline-flex items-center gap-2 font-semibold text-brand-800 transition-colors hover:text-brand-600"
            >
              View All Events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-80 animate-pulse rounded-2xl bg-white shadow-sm"
                />
              ))}
            </div>
          ) : error ? (
            <p className="mt-10 text-center text-red-600">{error}</p>
          ) : events.length === 0 ? (
            <div className="mt-12 rounded-2xl bg-white p-10 text-center">
              <CalendarDays className="mx-auto h-12 w-12 text-brand-700/50" />

              <h3 className="mt-4 text-xl font-bold text-brand-950">
                No Upcoming Events Yet
              </h3>

              <p className="mt-2 text-brand-700/70">
                Be the first to create an event for your community.
              </p>

              <Link
                href="/create-event"
                className="mt-6 inline-flex rounded-full bg-brand-800 px-6 py-3 font-semibold text-white hover:bg-brand-950"
              >
                Create an Event
              </Link>
            </div>
          ) : (
            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <Link
                  href={`/events/${event._id}`}
                  key={event._id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-white px-4 py-2 text-xs font-bold text-brand-800 shadow-sm">
                      {event.eventType}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-950 transition-colors group-hover:text-brand-700">
                      {event.title}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-brand-700/75">
                      {event.description}
                    </p>

                    <div className="mt-5 space-y-3 border-t border-gray-100 pt-4 text-sm text-brand-700/80">
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-leaf-500" />
                        {event.location}
                      </p>

                      <p className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-leaf-500" />
                        {new Date(
                          `${event.eventDate}T00:00:00`
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center gap-2 font-semibold text-brand-800">
                      View Details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-leaf-500">
              Our Memories
            </span>

            <h2 className="mt-3 text-3xl font-bold text-brand-950 sm:text-4xl">
              Moments That Matter
            </h2>

            <p className="mt-4 leading-7 text-brand-700/75">
              Every small act of kindness creates a story worth sharing.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {galleryImages.map((item) => (
              <div
                key={item.title}
                className="group relative h-48 overflow-hidden rounded-2xl sm:h-64 lg:h-72"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-5">
                  <h3 className="font-semibold text-white sm:text-lg">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-4 pb-20 sm:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-brand-950 px-6 py-14 sm:px-12 lg:px-20">
          <div className="mx-auto max-w-2xl text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-leaf-400">
              <Mail className="h-7 w-7" />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Stay Connected With Us
            </h2>

            <p className="mt-4 leading-7 text-brand-100/80">
              Get updates about upcoming community events, volunteer
              opportunities, and inspiring stories of positive change.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="min-w-0 flex-1 rounded-full border border-white/20 bg-white px-5 py-3 text-sm text-brand-950 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-leaf-400"
              />

              <button
                type="submit"
                className="rounded-full bg-leaf-400 px-7 py-3 font-bold text-brand-950 transition-colors hover:bg-leaf-500"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-4 text-xs text-brand-100/60">
              Join us in building a better tomorrow.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}