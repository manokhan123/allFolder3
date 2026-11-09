import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, toggleFeatured } from "../features/blogs/blogSlice";

export default function BlogList() {
  const dispatch = useDispatch();
  const { blogs, searchText, selectedCategory } = useSelector(
    (state) => state.blogs,
  );
  
  const filtered = blogs.filter((b) => {
    const matchesSearch = b.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (filtered.length === 0) return <p>No blogs found.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {filtered.map((blog) => (
        <li
          key={blog.id}
          style={{
            border: "1px solid #ccc",
            padding: 12,
            marginBottom: 10,
            background: blog.featured ? "#fff8dc" : "white",
          }}
        >
          <h3>
            {blog.title} {blog.featured && "⭐"}
          </h3>
          <small>{blog.category}</small>
          <p>{blog.content}</p>
          <button onClick={() => dispatch(toggleFeatured(blog.id))}>
            {blog.featured ? "Unfeature" : "Feature"}
          </button>
          <button onClick={() => dispatch(deleteBlog(blog.id))}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
