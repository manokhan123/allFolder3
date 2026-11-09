function BlogStats() {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <span className="stat-icon">📚</span>

        <div>
          <p>Total Blogs</p>
          <h3>4</h3>
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-icon">⭐</span>

        <div>
          <p>Featured</p>
          <h3>2</h3>
        </div>
      </div>

      <div className="stat-card">
        <span className="stat-icon">👤</span>

        <div>
          <p>Authors</p>
          <h3>4</h3>
        </div>
      </div>
    </div>
  );
}

export default BlogStats;
