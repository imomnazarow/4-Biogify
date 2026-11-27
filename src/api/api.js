const BASE_URL = "https://blogify-oquvchi.vercel.app/api";

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// LOGIN
export async function loginUser(login, password) {
  const res = await fetch(`${BASE_URL}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  });

  if (!res.ok) {
    throw new Error("Login or password is wrong");
  }
  return res.json(); // { token: "..." }
}

// Barcha postlar
export async function getPosts() {
  const res = await fetch(`${BASE_URL}/posts`);
  if (!res.ok) {
    throw new Error("Failed to load posts");
  }
  return res.json(); // { posts: [...], total, page, pages }
}

// Bitta post
export async function getPost(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  if (!res.ok) {
    throw new Error("Post not found");
  }
  return res.json(); // { post: {...}, related: [...] }
}

// Yangi post
export async function createPost(post) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(post),
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }
  return res.json();
}

// Delete post
export async function deletePost(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to delete post");
  }
}

// Kategoriyalar
export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) {
    throw new Error("Failed to load categories");
  }
  return res.json(); // [{ name, count }]
}

// Dashboard statistikasi
export async function getStats() {
  const res = await fetch(`${BASE_URL}/stats`, {
    headers: getHeaders(),
  });
  if (!res.ok) {
    throw new Error("Failed to load stats");
  }
  return res.json();
}
