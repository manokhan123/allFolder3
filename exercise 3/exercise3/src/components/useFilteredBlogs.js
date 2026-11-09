import { useMemo } from "react";

function useFilteredBlogs(blogs, searchText, category) {
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = blog.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesCategory = category === "All" || blog.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchText, category]);

  return filteredBlogs;
}

export default useFilteredBlogs;
