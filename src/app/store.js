import { configureStore } from '@reduxjs/toolkit';
import locationReducer from "../features/location/locationSlice";
import newsReducer from "../features/news/newsSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    news: newsReducer
  }
});
