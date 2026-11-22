import { useState } from "react";

function PostsPage() {
  const [search, setSearch] = useState("");

  return (
    <>
      <section className="bg-gradient-to-br from-indigo-50 via-violet-50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
            Explore Our Posts
          </h1>
          <p className="mt-4 text-slate-500">
            Discover amazing content from talented writers across various topics
          </p>

          <div className="relative mx-auto mt-8 max-w-md">
            <svg
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
        </div>
      </section>

      {/* post kartalari keyingi qadamda şu yerğa qöşiladi */}
    </>
  );
}

export default PostsPage;
