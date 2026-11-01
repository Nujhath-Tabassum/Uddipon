"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
const router = useRouter();

const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

const [formData, setFormData] = useState({
email: "",
password: "",
});

const handleGoogleLogin = async () => {
try {
setLoading(true);


  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
  });
} catch (error) {
  toast.error(
    error instanceof Error ? error.message : "Google login failed."
  );
  setLoading(false);
}


};

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
e.preventDefault();


if (!formData.email.trim() || !formData.password) {
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
    throw new Error(error.message || "Failed to sign in.");
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

return ( <section className="flex min-h-screen items-center justify-center bg-[#FAF9F5] px-4 py-12"> <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2"> <div className="hidden flex-col justify-center bg-brand-900 p-12 text-white md:flex"> <h2 className="text-4xl font-bold leading-tight">
Welcome Back to Your Community! </h2>

      <p className="mt-5 leading-8 text-white/80">
        Sign in to your Uddipon account and continue connecting with
        people who are working together to make their communities better.
      </p>

      <div className="mt-8 rounded-xl bg-white/10 p-6">
        <p className="text-lg font-semibold">
          Together, We Can Make a Difference!
        </p>

        <p className="mt-2 text-sm text-white/70">
          Discover upcoming events, manage your activities, and continue
          making a meaningful impact in your community.
        </p>
      </div>
    </div>

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
        Sign in to your Uddipon account.
      </p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-950">
            Email Address *
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
              className="h-11 w-full bg-transparent px-3 outline-none [appearance:none] [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-brand-950">
            Password *
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
              className="h-11 w-full bg-transparent px-3 outline-none"
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

      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-brand-800 hover:underline"
        >
          Sign Up
        </Link>
      </p>

      <div className="mt-5">
        <div className="relative flex items-center">
          <div className="flex-grow border-t border-gray-200"></div>

          <span className="px-4 text-sm text-gray-500">
            OR
          </span>

          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-5 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
        >
          <svg viewBox="0 0 48 48" className="h-5 w-5">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              transform="translate(0 5)"
            />

            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.65 5.93c4.46-4.12 7.12-10.2 7.12-17.58z"
            />

            <path
              fill="#FBBC05"
              d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.86.92 7.51 2.53 10.78l8-6.19z"
            />

            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.91-5.87l-7.65-5.93c-2.13 1.43-4.86 2.3-8.26 2.3-6.26 0-11.57-4.22-13.47-9.91l-8 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>

          Continue with Google
        </button>
      </div>
    </div>
  </div>
</section>


);
}
