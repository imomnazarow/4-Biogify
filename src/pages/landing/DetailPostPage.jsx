import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../../api/api";
import { formatDate } from "../../utils/formatDate";
import PostCard from "../../components/PostCard";

function DetailPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPost() {
      setLoading(true);
      try {
        const data = await getPost(id);
        setPost(data.post);
        setRelated(data.related);
        window.scrollTo(0, 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [id]);

  if (loading) {
    return <p className="py-20 text-center text-slate-500">Loading...</p>;
  }

  if (error) {
    return <p className="py-20 text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      <article className="mx-auto max-w-3xl px-6 py-10">
        <Link
          to="/posts"
          className="text-sm text-slate-700 hover:text-indigo-600"
        >
          ← Back to Posts
        </Link>

        <span className="mt-6 inline-block rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white">
          {post.category}
        </span>

        <h1 className="mt-4 text-4xl font-extrabold text-slate-900">
          {post.title}
        </h1>

        <p className="mt-4 text-sm text-slate-500">
          👤 {post.author} &nbsp; 📅 {formatDate(post.createdAt)}
        </p>

        <img
          src={post.image}
          alt={post.title}
          className="mt-6 w-full rounded-2xl object-cover"
        />

        <p className="mt-8 whitespace-pre-line text-sm leading-relaxed text-slate-700">
          {post.content}
        </p>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <h2 className="text-2xl font-bold text-slate-900">Related Posts</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {related.map((item) => (
              <PostCard key={item.id} post={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default DetailPostPage;
