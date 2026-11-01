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

const categories = [
"All Events",
"Donation",
"Cleanup",
"Plantation",
"Blood Donation",
"Food Distribution",
"Other",
];

function EventSkeleton() {
return ( <div className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm"> <div className="h-52 w-full bg-gray-200" />

```
  <div className="space-y-4 p-5">
    <div className="h-6 w-24 rounded-full bg-gray-200" />

    <div className="h-6 w-3/4 rounded bg-gray-200" />

    <div className="space-y-2">
      <div className="h-4 w-full rounded bg-gray-200" />
      <div className="h-4 w-2/3 rounded bg-gray-200" />
    </div>

    <div className="space-y-3 pt-2">
      <div className="h-4 w-1/2 rounded bg-gray-200" />
      <div className="h-4 w-2/5 rounded bg-gray-200" />
    </div>

    <div className="h-4 w-28 rounded bg-gray-200" />
  </div>
</div>


);
}

export default function EventsPage() {
const [events, setEvents] = useState<Event[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [selectedCategory, setSelectedCategory] = useState("All Events");

const filteredEvents =
selectedCategory === "All Events"
? events
: events.filter(
(event) => event.eventType === selectedCategory
);

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

return ( <section className="min-h-screen bg-[#FAF9F5] px-4 py-16 sm:px-8"> <div className="mx-auto max-w-6xl"> <div className="mb-10 text-center"> <h1 className="text-4xl font-bold text-brand-950">
Upcoming Events </h1>


      <p className="mt-3 text-brand-700/70">
        Explore events and become a part of positive change.
      </p>
    </div>

    {loading && (
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <EventSkeleton key={index} />
        ))}
      </div>
    )}

    {error && (
      <p className="py-10 text-center text-red-600">
        {error}
      </p>
    )}

    {!loading && !error && (
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              selectedCategory === category
                ? "bg-brand-800 text-white"
                : "bg-white text-brand-800 shadow-sm hover:bg-brand-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
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

    {!loading && !error && filteredEvents.length > 0 && (
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <Link
            href={`/events/${event._id}`}
            key={event._id}
            className="block overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
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
                  {new Date(
                    `${event.eventDate}T00:00:00`
                  ).toLocaleDateString()}
                </p>
              </div>

              <p className="mt-5 text-sm font-semibold text-brand-800">
                View Details →
              </p>
            </div>
          </Link>
        ))}
      </div>
    )}

    {!loading && !error && events.length > 0 && filteredEvents.length === 0 && (
      <div className="rounded-xl bg-white p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-brand-950">
          No Events Found
        </h2>

        <p className="mt-2 text-brand-700/70">
          There are no events in this category right now.
        </p>
      </div>
    )}
  </div>
</section>


);
}
