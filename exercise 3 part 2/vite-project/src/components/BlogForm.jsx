import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlog } from "../features/blogs/blogSlice";

export default function BlogForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Tech");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    dispatch(addBlog({ title, content, category }));
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Tech</option>
        <option>Lifestyle</option>
        <option>Travel</option>
        <option>Food</option>
      </select>
      <button type="submit">Add Blog</button>
    </form>
  );
}
