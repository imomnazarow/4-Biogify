import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";

// pages
import CreatePost from "./pages/admin/CreatePost";
import DashboardPage from "./pages/admin/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import DetailPostPage from "./pages/landing/DetailPostPage";
import HomePage from "./pages/landing/HomePage";
import PostsPage from "./pages/landing/PostsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "posts", element: <PostsPage /> },
      { path: "posts/:id", element: <DetailPostPage /> },
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "create", element: <CreatePost /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
