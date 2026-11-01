"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, MapPin, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import ProtectedRoute from "@/components/ProtectedRoute";
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Event {
_id: string;
title: string;
description: string;
eventType: string;
imageUrl: string;
location: string;
eventDate: string;
}

function ManageEventSkeleton() {
return ( <div className="animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm"> <div className="h-52 w-full bg-gray-200" />

```
  <div className="space-y-4 p-5">
    <div className="h-5 w-24 rounded-full bg-gray-200" />

    <div className="h-6 w-3/4 rounded bg-gray-200" />

    <div className="space-y-2">
      <div className="h-4 w-full rounded bg-gray-200" />
      <div className="h-4 w-2/3 rounded bg-gray-200" />
    </div>

    <div className="space-y-3 pt-2">
      <div className="h-4 w-3/4 rounded bg-gray-200" />
      <div className="h-4 w-1/2 rounded bg-gray-200" />
    </div>

    <div className="h-4 w-28 rounded bg-gray-200" />

    <div className="flex gap-3 pt-2">
      <div className="h-10 flex-1 rounded-lg bg-gray-200" />
      <div className="h-10 flex-1 rounded-lg bg-gray-200" />
    </div>
  </div>
</div>


);
}

export default function ManageEventsPage() {
const [events, setEvents] = useState<Event[]>([]);
const [loading, setLoading] = useState(true);
const [deletingId, setDeletingId] = useState<string | null>(null);
const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

const fetchMyEvents = async () => {
try {
const { data: tokenData, error: tokenError } = await authClient.token();


  if (tokenError || !tokenData?.token) {
    throw new Error("Please login again.");
  }

  const response = await fetch(`${API_URL}/api/manage-events`, {
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
    },
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

const handleDelete = async (id: string) => {
try {
setDeletingId(id);


  const { data: tokenData, error: tokenError } = await authClient.token();

  if (tokenError || !tokenData?.token) {
    throw new Error("Please login again.");
  }

  const response = await fetch(`${API_URL}/api/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete event.");
  }

  setEvents((previousEvents) =>
    previousEvents.filter((event) => event._id !== id)
  );

  setSelectedEvent(null);

  toast.success("Event deleted successfully!");
} catch (err) {
  toast.error(
    err instanceof Error ? err.message : "Something went wrong."
  );
} finally {
  setDeletingId(null);
}


};

return ( <ProtectedRoute> <section className="min-h-screen bg-[#FAF9F5] px-4 py-16 sm:px-8"> <div className="mx-auto max-w-6xl"> <div className="mb-10 text-center"> <h1 className="text-4xl font-bold text-brand-950">
Manage Events </h1>


        <p className="mt-3 text-brand-700/70">
          Manage, update, and delete the events you have created.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ManageEventSkeleton key={index} />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-brand-950">
            You Have&apos;t Created Any Events
          </h2>

          <p className="mt-2 text-brand-700/70">
            Create an event and help make a difference in your community.
          </p>

          <Link
            href="/create-event"
            className="mt-5 inline-block rounded-lg bg-brand-800 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-950"
          >
            Create an Event
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

              <div className="flex gap-3 px-5 pb-5">
                <Link
                  href={`/events/${event._id}/edit`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-800 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-950"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </Link>

                <button
                  onClick={() => setSelectedEvent(event._id)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {selectedEvent && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">
          <h2 className="text-2xl font-bold text-brand-950">
            Confirm Deletion
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Are you sure you want to delete this event? This action cannot
            be undone.
          </p>

          <div className="mt-7 flex justify-end gap-3">
            <button
              onClick={() => setSelectedEvent(null)}
              disabled={deletingId !== null}
              className="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={() => handleDelete(selectedEvent)}
              disabled={deletingId !== null}
              className="rounded-lg bg-red-800 px-5 py-2.5 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {deletingId === selectedEvent
                ? "Deleting..."
                : "Yes, Delete"}
            </button>
          </div>
        </div>
      </div>
    )}
  </section>
</ProtectedRoute>


);
}
