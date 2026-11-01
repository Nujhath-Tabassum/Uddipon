"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw new Error(error.message || "Invalid email or password.");
      }

      toast.success("Signed in successfully!");

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1200);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#FAF9F5] px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <Link
            href="/"
            className="mb-8 text-sm font-semibold text-brand-800 hover:text-brand-950"
          >
            ← Back to Home
          </Link>

          <h1 className="text-3xl font-bold text-brand-950">
            Welcome Back!
          </h1>

          <p className="mt-3 text-gray-600">
            Sign in to continue making a difference in your community.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-950">
                Email Address
              </label>

              <div className="flex items-center rounded-lg border border-gray-200 px-4 focus-within:border-brand-800">
                <Mail className="h-5 w-5 text-gray-400" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="h-12 w-full bg-transparent px-3 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-brand-950">
                Password
              </label>

              <div className="flex items-center rounded-lg border border-gray-200 px-4 focus-within:border-brand-800">
                <Lock className="h-5 w-5 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="h-12 w-full bg-transparent px-3 outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand-900 py-3 font-semibold text-white transition hover:bg-brand-800 disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-brand-800 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>

        <div className="hidden flex-col justify-center bg-brand-900 p-12 text-white md:flex">
          <h2 className="text-4xl font-bold leading-tight">
            Together, We Can Create a Better Tomorrow.
          </h2>

          <p className="mt-5 leading-8 text-white/80">
            Join Uddipon and become part of a community that believes in
            helping others, creating opportunities, and making positive
            changes.
          </p>

          <div className="mt-8 rounded-xl bg-white/10 p-6">
            <p className="text-lg font-semibold">
              Small Actions. Big Impact.
            </p>
            <p className="mt-2 text-sm text-white/70">
              Every contribution brings us one step closer to a better
              community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}