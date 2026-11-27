import { useEffect, useState } from "react";
import { getStats, getCategories, deletePost } from "../../api/api";
import { formatDate } from "../../utils/formatDate";

function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0); // qayta yuklaş uçun

  useEffect(() => {
    async function loadData() {
      try {
        const statsData = await getStats();
        const categoriesData = await getCategories();
        setStats(statsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      }
    }

    loadData();
  }, [reload]);

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this post?");
    if (!ok) return;

    try {
      await deletePost(id);
      setReload(reload + 1); // ma'lumotni qayta yuklaymiz
    } catch (err) {
      alert(err.message);
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!stats) {
    return <p className="text-slate-500">Loading...</p>;
  }

  const cards = [
    { label: "Total Posts", value: stats.totalPosts },
    { label: "Categories", value: categories.length },
    { label: "Total Views", value: stats.totalViews },
    { label: "Drafts", value: stats.drafts },
  ];

  return (
    <div>
      {" "}
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">
        Welcome back! Here's an overview of your blog.
      </p>
      {/* Statistika kartalari */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
          >
            <p className="text-2xl font-bold text-slate-900">{card.value}</p>
            <p className="mt-1 text-xs text-slate-500">{card.label}</p>
          </div>
        ))}
      </div>
      {/* Recent Posts jadvali */}
      <div className="mt-8 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-slate-900">Recent Posts</h2>
        <p className="mt-1 text-xs text-slate-500">
          Manage and monitor your latest content
        </p>

        <table className="mt-5 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs text-slate-500">
              <th className="pb-3 font-normal">Title</th>
              <th className="pb-3 font-normal">Category</th>
              <th className="pb-3 font-normal">Date</th>
              <th className="pb-3 font-normal">Status</th>
              <th className="pb-3 text-right font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentPosts.map((post) => (
              <tr key={post.id} className="border-b border-slate-50">
                <td className="py-4 font-medium text-slate-900">
                  {post.title}
                </td>
                <td className="py-4">
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs text-indigo-600">
                    {post.category}
                  </span>
                </td>
                <td className="py-4 text-xs text-slate-500">
                  {formatDate(post.createdAt)}
                </td>
                <td className="py-4">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      post.status === "Published"
                        ? "bg-green-50 text-green-600"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="py-4 text-right text-xs">
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardPage;
