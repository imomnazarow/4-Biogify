import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.svg";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-indigo-600 ${
      isActive ? "text-indigo-600" : "text-slate-900"
    }`;

  return (
    <header className="border-b border-slate-100 bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Blogify" className="h-7px w-25.25px" />
        </Link>

        <div className="flex items-center gap-6">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/posts" className={linkClass}>
            Posts
          </NavLink>
          <Link
            to="/login"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
