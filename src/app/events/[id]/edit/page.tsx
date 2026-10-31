"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

  const minDate = new Date().toLocaleDateString("en-CA");

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

    setSaving(true);

    try {
      const response = await fetch(`${API_URL}/api/events/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update event.");
      }

      alert("Event updated successfully!");

      router.push(`/events/${id}`);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
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

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <div>
              <label className="mb-2 block font-medium text-brand-950">
                Event Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
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
                <option value="Donation">Donation</option>
                <option value="Cleanup">Cleanup</option>
                <option value="Plantation">Plantation</option>
                <option value="Blood Donation">Blood Donation</option>
                <option value="Food Distribution">Food Distribution</option>
                <option value="Other">Other</option>
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
                min={minDate}
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
  );
}