import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Import slices
import authReducer from './slices/authSlice';
import listingsReducer from './slices/listingsSlice';
import postsReducer from './slices/postsSlice';

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  listings: listingsReducer,
  posts: postsReducer,
});

// Configure store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
