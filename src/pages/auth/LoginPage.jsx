import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import loginImg from "../../assets/images/loginPageImg.svg";

import { loginUser } from "../../api/api";

function LoginPage() {
  //
  const navigate = useNavigate();
  const [form, setForm] = useState({ login: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(form.login, form.password);
      localStorage.setItem("token", data.token); // tokenni saqlaymiz
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Blogify" className="h-7 w-25.5" />
          </Link>

          <Link
            to="/"
            className="mt-6 inline-flex items-center gap-2 text-xs text-slate-700 transition hover:text-indigo-600"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M19 12H5m0 0 6-6m-6 6 6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Home
          </Link>

          <form
            onSubmit={handleSubmit}
            className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
            <p className="mt-1 text-sm text-slate-500">
              Enter your credentials to access your account
            </p>

            <div className="mt-6">
              <label
                htmlFor="email"
                className="text-xs font-medium text-slate-900"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                name="login"
                value={form.login}
                onChange={handleChange}
                placeholder="name@example.com"
                required
                className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="password"
                className="text-xs font-medium text-slate-900"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            {error && <p className="mt-4 text-xs text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Loading..." : "Login"}
            </button>

            <p className="mt-6 text-center text-xs text-slate-500">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-indigo-600 hover:underline"
              >
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Ong tomon */}
      <div className="hidden flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 px-10 lg:flex">
        <img
          src={loginImg}
          alt="Start your journey"
          className="w-full max-w-sm rounded-2xl shadow-2xl shadow-indigo-200"
        />
        <h2 className="mt-8 text-xl font-bold text-slate-900">
          Start Your Journey
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Join thousands of creators sharing their stories on Blogify
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
