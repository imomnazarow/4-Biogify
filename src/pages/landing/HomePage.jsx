import { Link } from "react-router-dom";
import heroImg from "../../assets/images/hero-illustration.svg";

import flash from "../../assets/images/flash.svg";
import secure from "../../assets/images/secure.svg";
import setting from "../../assets/images/setting.svg";
import WhyChooseCard from "../../components/WhyChooseCard";
import PostCard from "../../components/PostCard";

//icons
// import { FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getPosts } from "../../api/api";

const features = [
  {
    icon: flash,
    title: "Fast",
    description:
      "Lightning-fast performance with modern web technologies for the best reading experience.",
  },
  {
    icon: secure,
    title: "Secure",
    description:
      "Your data is protected with industry-standard security practices and encryption.",
  },
  {
    icon: setting,
    title: "Easy to Manage",
    description:
      "Intuitive admin dashboard makes content management effortless and enjoyable.",
  },
];

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();

        const published = data.posts
          .filter((post) => post.status === "Published")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setPosts(published.slice(0, 3));
      } catch (err) {
        console.log(err);
      }
    }

    loadPosts();
  }, []);

  return (
    <>
      <section className="bg-gradient-to-br from-indigo-50 via-violet-50 to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl">
              Create, Read,
              <br />
              <span className="text-indigo-600">Inspire.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-slate-500">
              Discover stories written by amazing people. Share your knowledge
              and inspire others with your unique perspective.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/posts"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-200 transition hover:opacity-90"
              >
                Explore Posts →
              </Link>
              <Link
                to="/login"
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-medium text-slate-900 transition hover:bg-slate-50"
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-2xl shadow-indigo-100">
            <img
              src={heroImg}
              alt="Hero illustration"
              className="w-146 h-82.125"
            />
          </div>
        </div>
      </section>
      <section className="bg-white py-32">
        <div className="mx-auto max-w-7xl px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Why Choose Blogify?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-slate-500">
              Built with modern technologies and best practices to provide the
              best blogging experience.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((item) => (
              <WhyChooseCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="bg-slate-50 py-32">
        <div className="mx-auto max-w-7xl px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Latest Posts
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Check out our most recent articles
              </p>
            </div>
            <Link
              to="/posts"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
            >
              View All →
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
