function SearchBar({
  searchText,
  setSearchText,
  category,
  setCategory,
  searchInputRef,
}) {
  return (
    <div className="search-section">
      <div className="search-box">
        <span className="search-icon">🔍</span>

        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search blogs..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All Categories</option>

        <option value="React">React</option>

        <option value="Redux">Redux</option>

        <option value="Node">Node</option>
      </select>
    </div>
  );
}

export default SearchBar;
