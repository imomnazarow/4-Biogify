import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, getCategories } from "../../api/api";

function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    }

    loadCategories();
  }, []);

  const categoryNames =
    categories.length > 0
      ? categories.map((item) => item.name)
      : ["Technology", "Productivity", "Design"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const newPost = {
      title: title,
      excerpt: content.slice(0, 100) + "...",
      content: content,
      category: category,
      image: image || "https://picsum.photos/800/500",
      status: "Published",
    };

    try {
      await createPost(newPost);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100";

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-900">Create New Post</h1>
      <p className="mt-1 text-sm text-slate-500">
        Fill in the details to create a new blog post
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Chap tomon -> title va content */}
        <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
          <label className="text-xs font-medium text-slate-900">
            Post Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            required
            className={`mt-2 ${inputClass}`}
          />

          <label className="mt-5 block text-xs font-medium text-slate-900">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            required
            rows={14}
            className={`mt-2 ${inputClass}`}
          />
        </div>

        {/* Ong tomon */}
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Post Settings</h2>
            <label className="mt-4 block text-xs font-medium text-slate-900">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className={`mt-2 ${inputClass}`}
            >
              <option value="">Select category</option>
              {categoryNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">Featured Image</h2>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://picsum.photos/800/500"
              className={`mt-4 ${inputClass}`}
            />
            {image && (
              <img
                src={image}
                alt="Preview"
                className="mt-3 h-32 w-full rounded-lg object-cover"
              />
            )}
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Saving..." : "Publish Post"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
