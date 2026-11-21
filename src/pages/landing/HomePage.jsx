import { Link } from "react-router-dom";
import heroImg from "../../assets/images/hero-illustration.svg";

function HomePage() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-violet-50 to-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
        <div>
          <h1 className="text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            Create, Read,
            <br />
            <span className="text-indigo-600">Inspire.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-slate-500">
            Discover stories written by amazing people. Share your knowledge and
            inspire others with your unique perspective.
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
            className="w-146px h-82.125px"
          />
        </div>
      </div>
    </section>
  );
}

export default HomePage;
