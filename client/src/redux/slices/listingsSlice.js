import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Async thunk actions
export const getListings = createAsyncThunk(
  'listings/getListings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/listings');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getListingById = createAsyncThunk(
  'listings/getListingById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/listings/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createListing = createAsyncThunk(
  'listings/createListing',
  async (listingData, { rejectWithValue }) => {
    try {
      const response = await api.post('/listings', listingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateListing = createAsyncThunk(
  'listings/updateListing',
  async ({ id, listingData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/listings/${id}`, listingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteListing = createAsyncThunk(
  'listings/deleteListing',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/listings/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  listings: [],
  currentListing: null,
  loading: false,
  error: null,
};

// Listings slice
const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    clearCurrentListing: (state) => {
      state.currentListing = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all listings cases
      .addCase(getListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload.data;
      })
      .addCase(getListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to fetch listings';
      })
      // Get listing by ID cases
      .addCase(getListingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListingById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentListing = action.payload.data;
      })
      .addCase(getListingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to fetch listing';
      })
      // Create listing cases
      .addCase(createListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createListing.fulfilled, (state, action) => {
        state.loading = false;
        state.listings.push(action.payload.data);
      })
      .addCase(createListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to create listing';
      })
      // Update listing cases
      .addCase(updateListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateListing.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.listings.findIndex(
          (listing) => listing._id === action.payload.data._id
        );
        if (index !== -1) {
          state.listings[index] = action.payload.data;
        }
        if (state.currentListing && state.currentListing._id === action.payload.data._id) {
          state.currentListing = action.payload.data;
        }
      })
      .addCase(updateListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to update listing';
      })
      // Delete listing cases
      .addCase(deleteListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = state.listings.filter(
          (listing) => listing._id !== action.payload
        );
        if (state.currentListing && state.currentListing._id === action.payload) {
          state.currentListing = null;
        }
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to delete listing';
      });
  },
});

export const { clearCurrentListing, clearError } = listingsSlice.actions;
export default listingsSlice.reducer;
