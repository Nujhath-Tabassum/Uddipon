"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { CalendarDays, MapPin, ArrowLeft } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const API_URL = "http://localhost:8000";

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
  createdBy?: string;
  createdById?: string;
}

function EventDetailsContent() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const [joining, setJoining] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const isOwner =
    !!user &&
    !!event &&
    (event.createdBy === user.email ||
      event.createdBy === user.id ||
      event.createdById === user.id);

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

    if (id) {
      fetchEvent();
    }
  }, [id]);

  useEffect(() => {
    const checkJoinedEvent = async () => {
      if (isPending) return;

      if (!user) {
        setIsAdded(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/my-events`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to check joined events.");
        }

        const joinedEvents: Event[] = await response.json();

        setIsAdded(
          joinedEvents.some((item) => item._id === id)
        );
      } catch (err) {
        console.error("Joined event check failed:", err);
      }
    };

    checkJoinedEvent();
  }, [id, user?.id, user?.email, isPending]);

  const handleJoinEvent = async () => {
    if (isPending) return;

    if (!user) {
      toast.info("Please login to join this event.");
      router.push("/login");
      return;
    }

    if (isAdded) {
      toast.info("You have already joined this event!");
      return;
    }

    try {
      setJoining(true);

      const response = await fetch(
        `${API_URL}/api/events/${id}/join`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to join event.");
      }

      setIsAdded(true);

      toast.success("You have successfully joined the event!");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setJoining(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);

      const response = await fetch(`${API_URL}/api/events/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete event.");
      }

      setShowDeleteConfirm(false);

      toast.success("Event deleted successfully!");

      setTimeout(() => {
        router.push("/events");
        router.refresh();
      }, 1500);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading || isPending) {
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
    <section className="relative min-h-screen bg-[#FAF9F5] px-4 py-12 sm:px-8">
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
                {new Date(
                  `${event.eventDate}T00:00:00`
                ).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-7">
              <h2 className="text-xl font-bold text-brand-950">
                About This Event
              </h2>

              <p className="mt-4 leading-8 text-brand-700/80">
                {event.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                {isOwner && (
                  <>
                    
                  </>
                )}

                <button
                  onClick={handleJoinEvent}
                  disabled={joining || isAdded}
                  className="rounded-lg bg-brand-800 px-6 py-3 font-semibold text-white hover:bg-brand-950 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {joining
                    ? "Joining..."
                    : isAdded
                      ? "Already Joined ✓"
                      : "Join Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
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
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="rounded-lg border border-gray-300 px-5 py-2.5 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
              >
                No, Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg bg-red-800 px-5 py-2.5 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function EventDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#FAF9F5]">
          <p className="text-brand-800">Loading event details...</p>
        </div>
      }
    >
      <EventDetailsContent />
    </Suspense>
  );
}