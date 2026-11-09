import React from "react";

function BlogCard({ blog, onDelete, onFavorite }) {
  return (
    <div className="blog-card">
      <div className="blog-card-top">
        <span className="category-badge">{blog.category}</span>

        {blog.featured && <span className="featured-badge">⭐ Featured</span>}
      </div>

      <h2>{blog.title}</h2>

      <p className="blog-description">
        Learn and explore this topic with practical concepts and modern
        development techniques.
      </p>

      <div className="blog-info">
        <div>
          <span className="info-label">Author</span>

          <strong>{blog.author}</strong>
        </div>

        <div>
          <span className="info-label">Reading Time</span>

          <strong>{blog.readingTime} min</strong>
        </div>
      </div>

      <div className="featured-status">
        <span className="info-label">Featured Status</span>

        <strong>{blog.featured ? "Yes" : "No"}</strong>
      </div>

      <div className="card-buttons">
        <button className="favorite-button" onClick={() => onFavorite(blog.id)}>
          {blog.favorite ? "❤️ Favorited" : "🤍 Favorite"}
        </button>

        <button className="delete-button" onClick={() => onDelete(blog.id)}>
          🗑 Delete
        </button>
      </div>

      <button className="read-button">Read Article →</button>
    </div>
  );
}

export default React.memo(BlogCard);
