import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Headphones, Send, ArrowUpRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import UniversityLogo from "../components/ui/UniversityLogo";

export default function Login() {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-campus-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(studentId, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 sm:px-10">
        <div className="flex items-center gap-3">
          <UniversityLogo className="h-12 w-12 sm:h-14 sm:w-14" />
          <span className="text-xl font-bold text-gray-900 sm:text-2xl">BAUST</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-campus-primary px-4 py-2 text-xs font-medium text-white sm:px-5 sm:text-sm"
          >
            <Headphones className="h-4 w-4" />
            <span className="hidden sm:inline">Contact Us</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-campus-primary px-4 py-2 text-xs font-medium text-white sm:px-5 sm:text-sm"
          >
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Apply Now</span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="relative flex flex-1 flex-col px-6 pb-0 sm:px-10 lg:flex-row lg:items-start lg:gap-8 lg:px-16 lg:pt-4">
        {/* Left — university info */}
        <div className="flex-1 py-6 lg:max-w-xl lg:py-10">
          <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
            Bangladesh Army University of Science and Technology
          </h1>

          <div className="mt-4 inline-block rounded-lg bg-purple-100 px-4 py-2">
            <p className="text-xs font-medium text-campus-primary sm:text-sm">
              UGC and Government Approved
            </p>
            <p className="text-xs font-medium text-campus-primary sm:text-sm">
              2500+ Current Students
            </p>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-gray-700 sm:text-base">
            Bangladesh Army University of Science and Technology (BAUST) is a
            public engineering university in Bangladesh, established in 2015. It
            is located in Natore, beside the Dhaka-Rajshahi Highway. The
            university is run by the Bangladesh Army and offers undergraduate and
            postgraduate programs in engineering and technology.
          </p>

          <button
            type="button"
            className="mt-6 flex items-center gap-2 rounded-full bg-campus-primary px-6 py-2.5 text-sm font-medium text-white transition hover:bg-campus-dark"
          >
            Know More
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Right — login card */}
        <div className="relative z-10 flex justify-center lg:w-[420px] lg:shrink-0 lg:justify-end">
          <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white px-8 py-10 shadow-xl sm:px-10 sm:py-12">
            <h2 className="text-center text-3xl font-bold text-campus-primary sm:text-4xl">
              Log In
            </h2>
            <p className="mt-2 text-center text-sm font-semibold text-campus-primary/80">
              BAUST Student Portal
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="studentId"
                  className="mb-2 block text-sm font-semibold text-campus-primary"
                >
                  Student ID
                </label>
                <input
                  id="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  required
                  className="w-full rounded-lg border-2 border-campus-primary/40 px-4 py-3 text-sm outline-none transition focus:border-campus-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-campus-primary"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border-2 border-campus-primary/40 px-4 py-3 pr-11 text-sm outline-none transition focus:border-campus-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                className="flex w-full items-center justify-center gap-2 rounded-full bg-campus-primary py-3 text-sm font-semibold text-white transition hover:bg-campus-dark disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Log In"
                )}
              </button>
            </form>

            <div className="mt-6 rounded-lg bg-purple-50 px-4 py-3 text-center text-xs text-gray-600">
              <p className="font-medium text-campus-primary">Demo Credentials</p>
              <p className="mt-1">
                ID: <span className="font-mono">2024001</span> · Password:{" "}
                <span className="font-mono">student123</span>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-campus-primary px-6 py-16 sm:px-10 sm:py-20 lg:-mt-16 lg:pt-28">
        <div className="mx-auto flex max-w-4xl flex-col gap-10 sm:flex-row sm:justify-center sm:gap-24">
          <h3 className="text-center text-2xl font-bold text-white sm:text-3xl">
            About BAUST
          </h3>
          <h3 className="text-center text-2xl font-bold text-white sm:text-3xl">
            Location
          </h3>
        </div>
      </footer>
    </div>
  );
}
