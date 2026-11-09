import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../features/blogs/blogSlice";
import BlogForm from "./BlogForm";
import BlogFilters from "./BlogFilters";
import BlogList from "./BlogList";

export default function BlogDashboard() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
      <h1>Blog Dashboard</h1>
      <BlogForm />
      <BlogFilters />

      {loading && <p>Loading blogs...</p>}

      {error && (
        <div style={{ color: "red" }}>
          <p>Error: {error}</p>
          <button onClick={() => dispatch(fetchBlogs())}>Retry</button>
        </div>
      )}

      {!loading && !error && <BlogList />}
    </div>
  );
}
