"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";

const API_URL = "http://localhost:8000";

const eventTypes = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Blood Donation",
  "Food Distribution",
  "Other",
];

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  imageUrl: string;
  location: string;
  eventDate: string;
}

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "",
    imageUrl: "",
    location: "",
    eventDate: "",
  });

  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch event.");
        }

        setFormData({
          title: data.title,
          description: data.description,
          eventType: data.eventType,
          imageUrl: data.imageUrl,
          location: data.location,
          eventDate: data.eventDate,
        });
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const title = formData.title.trim();
    const description = formData.description.trim();
    const imageUrl = formData.imageUrl.trim();
    const location = formData.location.trim();
    const eventDate = formData.eventDate;

    if (
      !title ||
      !description ||
      !formData.eventType ||
      !imageUrl ||
      !location ||
      !eventDate
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }

    if (title.length < 3 || title.length > 100) {
      toast.error("Event title must contain 3–100 characters.");
      return;
    }

    if (description.length < 10 || description.length > 1000) {
      toast.error("Description must contain 10–1000 characters.");
      return;
    }

    if (!eventTypes.includes(formData.eventType)) {
      toast.error("Please select a valid event type.");
      return;
    }

    try {
      const imageUrlObject = new URL(imageUrl);

      if (
        imageUrlObject.protocol !== "http:" &&
        imageUrlObject.protocol !== "https:"
      ) {
        toast.error("Please enter a valid image URL.");
        return;
      }
    } catch {
      toast.error("Please enter a valid image URL.");
      return;
    }

    if (location.length < 3 || location.length > 150) {
      toast.error("Location must contain 3–150 characters.");
      return;
    }

    const selectedDate = new Date(`${eventDate}T00:00:00.000Z`);

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(eventDate) ||
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate.toISOString().slice(0, 10) !== eventDate ||
      eventDate <= today
    ) {
      toast.error("Please select a valid future date.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(`${API_URL}/api/events/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          eventType: formData.eventType,
          imageUrl,
          location,
          eventDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update event.");
      }

      toast.success("Event updated successfully!");

      setTimeout(() => {
        router.push(`/events/${id}`);
        router.refresh();
      }, 1500);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";

      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF9F5]">
        Loading event...
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <section className="min-h-screen bg-[#FAF9F5] px-4 py-12 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href={`/events/${id}`}
            className="mb-8 flex items-center gap-2 font-semibold text-brand-800"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Details
          </Link>

          <div className="rounded-2xl bg-white p-6 shadow-md sm:p-10">
            <h1 className="text-3xl font-bold text-brand-950">
              Update Event
            </h1>

            <p className="mt-2 text-brand-700/70">
              Edit your event information below.
            </p>

            {error && (
              <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
              <div>
                <label className="mb-2 block font-medium text-brand-950">
                  Event Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  maxLength={100}
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-brand-700"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-brand-950">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  maxLength={1000}
                  required
                  rows={5}
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-brand-700"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-brand-950">
                  Event Type
                </label>

                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-brand-700"
                >
                  <option value="">Select event type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-medium text-brand-950">
                  Image URL
                </label>

                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-brand-700"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-brand-950">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  maxLength={150}
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-brand-700"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium text-brand-950">
                  Event Date
                </label>

                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  min={today}
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-brand-700"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-brand-800 px-6 py-3 font-semibold text-white transition hover:bg-brand-950 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Updating..." : "Update Event"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}