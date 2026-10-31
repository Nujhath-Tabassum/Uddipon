"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";

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

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch events.");
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

    fetchEvents();
  }, []);

  return (
    <section className="min-h-screen bg-[#FAF9F5] px-4 py-16 sm:px-8">

      <div className="mx-auto max-w-6xl">

        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-brand-950">
            Upcoming Events
          </h1>

          <p className="mt-3 text-brand-700/70">
            Explore events and become a part of positive change.
          </p>
        </div>

        {loading && (
          <p className="py-10 text-center text-brand-800">
            Loading events...
          </p>
        )}

        {error && (
          <p className="py-10 text-center text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-brand-950">
              No Upcoming Events
            </h2>

            <p className="mt-2 text-brand-700/70">
              There are no upcoming events right now.
            </p>

            <Link
              href="/create-event"
              className="mt-5 inline-block rounded-lg bg-brand-800 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-950"
            >
              Create an Event
            </Link>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

            {events.map((event) => (
              <div
                key={event._id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">

                  <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-brand-800">
                    {event.eventType}
                  </span>

                  <h2 className="mt-4 text-xl font-bold text-brand-950">
                    {event.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-sm text-brand-700/70">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-3 text-sm text-brand-700">

                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </p>

                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(`${event.eventDate}T00:00:00`).toLocaleDateString()}
                    </p>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}