import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import dateIcon from "../assets/images/date-icon.svg";

function PostCard({ post }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="h-48 w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-medium text-white">
          {post.category}
        </span>
      </div>

      <div className="p-6">
        <p className="flex items-center gap-1.5 text-xs text-slate-500">
          <img src={dateIcon} alt="Date" className="h-3.5 w-3.5" />
          {formatDate(post.createdAt)}
        </p>
        <h3 className="mt-3 font-semibold text-slate-900">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-xs text-slate-500">
          {post.excerpt}
        </p>
        <Link
          to={`/posts/${post.id}`}
          className="mt-4 inline-block text-xs font-medium text-indigo-600 hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
