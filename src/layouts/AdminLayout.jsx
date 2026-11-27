import { Outlet, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.svg";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // tokenni öçiramiz
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `block rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-indigo-50 text-indigo-600"
        : "text-slate-700 hover:bg-slate-50"
    }`;

  return (
    <div className="flex min-h-screen bg-white">
      {/* Yon panel */}
      <aside className="flex w-60 flex-col border-r border-slate-100">
        <div className="border-b border-slate-100 p-5">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Blogify" className="h-7 w-25.25" />
          </div>
          <p className="mt-1 text-xs text-slate-500">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          <NavLink to="/admin" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/posts" className={linkClass}>
            Posts
          </NavLink>
          <NavLink to="/admin/create" className={linkClass}>
            + Create Post
          </NavLink>
        </nav>

        <div className="border-t border-slate-100 p-3">
          <button
            onClick={handleLogout}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Asosiy qism: Dashboard yoki CreatePost şu yerda çiqadi */}
      <main className="flex-1 p-10">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
