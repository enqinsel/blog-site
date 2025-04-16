import axios from "axios";

// News API from CollectAPI
export async function getNews() {
  try {
    const response = await axios.get(
      "https://api.collectapi.com/news/getNews?country=tr&tag=general",
      {
        headers: {
          "content-type": "application/json",
          authorization: "apikey 1mYzjR5iL5rkGVoaDnIAF0:41MupHkcVQCAQzKgN6rqVW",
        },
      }
    );
    if (response.data.success) {
      return response.data.result;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Local Storage Blog Management

// Get all blogs from localStorage
export const getBlogs = () => {
  const blogs = localStorage.getItem("blogs");
  return blogs ? JSON.parse(blogs) : [];
};

// Get single blog by id
export const getBlogById = (id) => {
  const blogs = getBlogs();
  return blogs.find((blog) => blog.id === id);
};

// Save new blog
export const saveBlog = (blog) => {
  const blogs = getBlogs();
  const newBlog = {
    ...blog,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem("blogs", JSON.stringify([...blogs, newBlog]));
  return newBlog;
};

// Update existing blog
export const updateBlog = (id, updatedBlog) => {
  const blogs = getBlogs();
  const newBlogs = blogs.map((blog) =>
    blog.id === id ? { ...blog, ...updatedBlog, updatedAt: new Date().toISOString() } : blog
  );
  localStorage.setItem("blogs", JSON.stringify(newBlogs));
  return getBlogById(id);
};

// Delete blog
export const deleteBlog = (id) => {
  const blogs = getBlogs();
  const newBlogs = blogs.filter((blog) => blog.id !== id);
  localStorage.setItem("blogs", JSON.stringify(newBlogs));
  return true;
};

// User Authentication Management

// Register a new user
export const registerUser = (user) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  
  // Check if user already exists
  if (users.find(u => u.email === user.email)) {
    return { success: false, message: "User already exists" };
  }
  
  const newUser = {
    ...user,
    id: Date.now().toString()
  };
  
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  return { success: true, user: newUser };
};

// Login user
export const loginUser = (credentials) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find(
    u => u.email === credentials.email && u.password === credentials.password
  );
  
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { success: true, user };
  }
  
  return { success: false, message: "Invalid credentials" };
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem("currentUser");
  return { success: true };
};

// Check if user is logged in
export const isLoggedIn = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}; 