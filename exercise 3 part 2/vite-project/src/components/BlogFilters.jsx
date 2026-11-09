import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setCategory } from "../features/blogs/blogSlice";

export default function BlogFilters() {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.blogs.searchText);
  const selectedCategory = useSelector((state) => state.blogs.selectedCategory);

  return (
    <div style={{ marginBottom: 20 }}>
      <input
        placeholder="Search blogs..."
        value={searchText}
        onChange={(e) => dispatch(setSearchText(e.target.value))}
      />
      <select
        value={selectedCategory}
        onChange={(e) => dispatch(setCategory(e.target.value))}
      >
        <option>All</option>
        <option>Tech</option>
        <option>Lifestyle</option>
        <option>Travel</option>
        <option>Food</option>
      </select>
    </div>
  );
}
