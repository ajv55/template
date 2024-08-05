// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
// import yourReducer from '../features/yourSlice'; // Replace with actual slice

export const store = configureStore({
  reducer: {
    // yourFeature: yourReducer, // Replace with actual slice
  },
});

// Types for Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
