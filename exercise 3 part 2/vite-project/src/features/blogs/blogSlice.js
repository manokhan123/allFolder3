import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";

// Part 5: simulated API call
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=6",
      );
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data = await res.json();

      const categories = ["Tech", "Lifestyle", "Travel", "Food"];
      return data.map((post, i) => ({
        id: String(post.id),
        title: post.title,
        content: post.body,
        category: categories[i % categories.length],
        featured: false,
      }));
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

// Part 2: state shape
const initialState = {
  blogs: [],
  searchText: "",
  selectedCategory: "All",
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  // Part 3: reducers (actions are auto-generated)
  reducers: {
    addBlog: {
      reducer(state, action) {
        state.blogs.unshift(action.payload);
      },
      prepare({ title, content, category }) {
        return {
          payload: { id: nanoid(), title, content, category, featured: false },
        };
      },
    },
    deleteBlog(state, action) {
      state.blogs = state.blogs.filter((b) => b.id !== action.payload);
    },
    toggleFeatured(state, action) {
      const blog = state.blogs.find((b) => b.id === action.payload);
      if (blog) blog.featured = !blog.featured;
    },
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
  // Part 5: handle thunk lifecycle
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const {
  addBlog,
  deleteBlog,
  toggleFeatured,
  setSearchText,
  setCategory,
} = blogSlice.actions;

export default blogSlice.reducer;
