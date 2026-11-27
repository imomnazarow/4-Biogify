import { useState, useEffect } from "react";
import { getPosts, getCategories } from "../../api/api";
import PostCard from "../../components/PostCard";

function PostsPage() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const postsData = await getPosts();
        const categoriesData = await getCategories();

        const published = postsData.posts.filter(
          (post) => post.status === "Published",
        );
        setPosts(published);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  //filter
  const filteredPosts = posts.filter((post) => {
    const matchCategory =
      activeCategory === "All" || post.category === activeCategory;
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const tabs = ["All", ...categories.map((item) => item.name)];

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
      //
      <section className="mx-auto max-w-7xl px-8 py-16">
        {/* Kategoriya tablari */}
        <div className="flex justify-center">
          <div className="inline-flex gap-1 rounded-xl bg-slate-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`rounded-lg px-5 py-1.5 text-xs font-medium transition ${
                  activeCategory === tab
                    ? "bg-white text-slate-900 shadow"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {loading && (
          <p className="mt-10 text-center text-slate-500">Loading...</p>
        )}
        {error && <p className="mt-10 text-center text-red-500">{error}</p>}

        {!loading && !error && filteredPosts.length === 0 && (
          <p className="mt-10 text-center text-slate-500">No posts found</p>
        )}

        {/* Kartalar */}
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}

export default PostsPage;
