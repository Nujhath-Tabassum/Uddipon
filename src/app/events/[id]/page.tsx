"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CalendarDays, MapPin, ArrowLeft } from "lucide-react";

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

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events/${id}`);

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch event.");
        }

        setEvent(data);

      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF9F5]">
        <p className="text-brand-800">Loading event details...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF9F5]">
        <h2 className="text-2xl font-bold text-brand-950">
          Event Not Found
        </h2>

        <p className="mt-2 text-red-600">
          {error || "This event does not exist."}
        </p>

        <Link
          href="/events"
          className="mt-5 rounded-lg bg-brand-800 px-6 py-3 text-white"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FAF9F5] px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-5xl">

        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 font-semibold text-brand-800 hover:text-brand-950"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </button>

        <div className="overflow-hidden rounded-2xl bg-white shadow-md">

          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-72 w-full object-cover sm:h-100"
          />

          <div className="p-6 sm:p-10">

            <span className="rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-brand-800">
              {event.eventType}
            </span>

            <h1 className="mt-5 text-3xl font-bold text-brand-950 sm:text-4xl">
              {event.title}
            </h1>

            <div className="mt-6 flex flex-col gap-4 text-brand-700 sm:flex-row">

              <p className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                {event.location}
              </p>

              <p className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                {new Date(`${event.eventDate}T00:00:00`).toLocaleDateString()}
              </p>

            </div>

            <div className="mt-8 border-t border-gray-200 pt-7">

              <h2 className="text-xl font-bold text-brand-950">
                About This Event
              </h2>

              <p className="mt-4 leading-8 text-brand-700/80">
                {event.description}
              </p>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}