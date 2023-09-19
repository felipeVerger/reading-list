import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./slices/booksSlice";
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    books: booksSlice,
    auth: authSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;