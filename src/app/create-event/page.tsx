"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

const API_URL = "http://localhost:8000";

export default function CreateEventPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [minDate, setMinDate] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    eventType: "",
    imageUrl: "",
    location: "",
    eventDate: "",
  });

  useEffect(() => {
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Dhaka",
    }).format(new Date());

    setMinDate(today);
  }, []);

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

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.eventType ||
      !formData.imageUrl.trim() ||
      !formData.location.trim() ||
      !formData.eventDate
    ) {
      toast.error("Please fill in all the fields.");
      return;
    }

    if (formData.eventDate <= minDate) {
      toast.error("Please select a future date.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create event.");
      }

      toast.success("Event created successfully!");

      setFormData({
        title: "",
        description: "",
        eventType: "",
        imageUrl: "",
        location: "",
        eventDate: "",
      });

      setTimeout(() => {
        router.push("/events");
      }, 1500);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-brand-900/10 bg-white px-4 py-3 text-sm text-brand-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/10";

  return (
    <ProtectedRoute>
      <section className="min-h-screen bg-[#FAF9F5] px-4 py-12 sm:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-9">
            <h1 className="text-3xl font-bold text-brand-950 sm:text-4xl">
              Create an Event
            </h1>

            <p className="mb-8 mt-2 text-sm text-brand-700/70 sm:text-base">
              Share an event to help your community
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-900">
                  Event Title <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Winter Clothes Distribution"
                  className={inputClass}
                  maxLength={100}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-900">
                  Description <span className="text-red-500">*</span>
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Let's help people in need with warm clothes..."
                  rows={3}
                  maxLength={1000}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-900">
                  Event Type <span className="text-red-500">*</span>
                </label>

                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className={inputClass}
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
                <label className="mb-2 block text-sm font-semibold text-brand-900">
                  Image URL <span className="text-red-500">*</span>
                </label>

                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-900">
                  Location <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-brand-600" />

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Mirpur 10, Dhaka"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-brand-900">
                  Event Date <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <CalendarDays className="absolute left-3 top-3.5 h-4 w-4 text-brand-600" />

                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    min={minDate}
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !minDate}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-800 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-950 disabled:opacity-60"
              >
                {loading ? "Creating..." : "Create Event"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          </div>

          <div className="hidden text-center lg:block">
            <Image
              src="/shane-rounce-DNkoNXQti3c-unsplash.jpg"
              alt="Community volunteers"
              width={500}
              height={400}
              className="h-150 w-full max-w-md rounded-xl object-cover"
              priority
            />

            <h2 className="mt-7 text-3xl font-bold leading-tight text-brand-950">
              Small Actions
              <br />
              Big Impact
            </h2>

            <div className="mx-auto mt-3 h-1 w-36 rounded-full bg-leaf-500" />

            <p className="mt-4 text-sm leading-6 text-brand-700/70">
              Every small contribution can create
              <br />
              a better and stronger community.
            </p>
          </div>
        </div>
      </section>
    </ProtectedRoute>
  );
}