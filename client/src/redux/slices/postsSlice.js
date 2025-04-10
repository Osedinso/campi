import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Async thunk actions
export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPostById = createAsyncThunk(
  'posts/getPostById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const response = await api.post('/posts', postData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likePost = createAsyncThunk(
  'posts/likePost',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.put(`/posts/${id}/like`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const commentOnPost = createAsyncThunk(
  'posts/commentOnPost',
  async ({ id, comment }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/posts/${id}/comments`, { comment });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

// Posts slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearCurrentPost: (state) => {
      state.currentPost = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all posts cases
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.data;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to fetch posts';
      })
      // Get post by ID cases
      .addCase(getPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload.data;
      })
      .addCase(getPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to fetch post';
      })
      // Create post cases
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload.data);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to create post';
      })
      // Like post cases
      .addCase(likePost.fulfilled, (state, action) => {
        const updatedPost = action.payload.data;
        const index = state.posts.findIndex((post) => post._id === updatedPost._id);
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
        if (state.currentPost && state.currentPost._id === updatedPost._id) {
          state.currentPost = updatedPost;
        }
      })
      // Comment on post cases
      .addCase(commentOnPost.fulfilled, (state, action) => {
        const updatedPost = action.payload.data;
        const index = state.posts.findIndex((post) => post._id === updatedPost._id);
        if (index !== -1) {
          state.posts[index] = updatedPost;
        }
        if (state.currentPost && state.currentPost._id === updatedPost._id) {
          state.currentPost = updatedPost;
        }
      });
  },
});

export const { clearCurrentPost, clearError } = postsSlice.actions;
export default postsSlice.reducer;
