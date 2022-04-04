import { configureStore } from '@reduxjs/toolkit';
import locationReducer from "../features/location/locationSlice";
import newsReducer from "../features/news/newsSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    location: locationReducer,
    news: newsReducer,
    user: userReducer
  }
});
