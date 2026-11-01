"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import ProtectedRoute from "@/components/ProtectedRoute";

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

export default function MyEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const fetchMyEvents = async () => {
    try {
      const response = await fetch(`${API_URL}/api/my-events`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch your events.");
      }

      setEvents(data);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      setRemovingId(id);

      const response = await fetch(
        `${API_URL}/api/events/${id}/join`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove event.");
      }

      setEvents((previousEvents) =>
        previousEvents.filter((event) => event._id !== id)
      );

      toast.success("Event removed from My Events!");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <ProtectedRoute>
      <section className="min-h-screen bg-[#FAF9F5] px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-brand-950">
              My Events
            </h1>

            <p className="mt-3 text-brand-700/70">
              Keep track of the events you have joined.
            </p>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <p className="text-brand-800">Loading your events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="rounded-xl bg-white p-10 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-brand-950">
                No Events Added Yet
              </h2>

              <p className="mt-2 text-brand-700/70">
                Explore upcoming events and add the ones you are interested in.
              </p>

              <Link
                href="/events"
                className="mt-5 inline-block rounded-lg bg-brand-800 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-950"
              >
                Explore Events
              </Link>
            </div>
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg"
                >
                  <Link href={`/events/${event._id}`}>
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

                  <div className="px-5 pb-5">
                    <button
                      onClick={() => handleRemove(event._id)}
                      disabled={removingId === event._id}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      {removingId === event._id
                        ? "Removing..."
                        : "Remove from My Events"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </ProtectedRoute>
  );
}