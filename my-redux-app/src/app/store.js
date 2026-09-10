import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postSlice';
import platformReducer from './slices/platformSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    platform: platformReducer,
  },
});