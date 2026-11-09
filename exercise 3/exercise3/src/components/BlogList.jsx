import { useState, useRef, useEffect, useCallback } from "react";

import BlogCard from "./BlogCard";
import SearchBar from "./SearchBar";
import useFilteredBlogs from "./useFilteredBlogs";

function BlogList() {
  // Blogs data
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Understanding React Hooks",
      category: "React",
      author: "Ali Khan",
      readingTime: 6,
      featured: true,
      favorite: false,
    },

    {
      id: 2,
      title: "Redux Toolkit Basics",
      category: "Redux",
      author: "Sara Ahmed",
      readingTime: 8,
      featured: false,
      favorite: false,
    },

    {
      id: 3,
      title: "Building Blog UI in React",
      category: "React",
      author: "Hamza Malik",
      readingTime: 5,
      featured: false,
      favorite: false,
    },

    {
      id: 4,
      title: "Node.js and Express Introduction",
      category: "Node",
      author: "Ayesha Noor",
      readingTime: 7,
      featured: true,
      favorite: false,
    },
  ]);

  // Search state
  const [searchText, setSearchText] = useState("");

  // Category state
  const [category, setCategory] = useState("All");

  // useRef
  const searchInputRef = useRef(null);

  // Page load par search input focus
  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  // Delete function
  const handleDelete = useCallback((id) => {
    setBlogs((previousBlogs) => {
      return previousBlogs.filter((blog) => blog.id !== id);
    });
  }, []);

  // Favorite function
  const handleFavorite = useCallback((id) => {
    setBlogs((previousBlogs) => {
      return previousBlogs.map((blog) => {
        if (blog.id === id) {
          return {
            ...blog,
            favorite: !blog.favorite,
          };
        }

        return blog;
      });
    });
  }, []);

  // Filtered blogs
  const filteredBlogs = useFilteredBlogs(blogs, searchText, category);

  return (
    <section className="blog-section">
      {/* Search Bar */}

      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        category={category}
        setCategory={setCategory}
        searchInputRef={searchInputRef}
      />

      {/* Heading */}

      <div className="section-heading">
        <div>
          <h2>All Blogs</h2>

          <p>Explore our collection of useful articles</p>
        </div>

        <span className="blog-count">{filteredBlogs.length} Blogs</span>
      </div>

      {/* Blog Cards */}

      <div className="blog-grid">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onDelete={handleDelete}
              onFavorite={handleFavorite}
            />
          ))
        ) : (
          <p className="no-results">No blogs found.</p>
        )}
      </div>
    </section>
  );
}

export default BlogList;
