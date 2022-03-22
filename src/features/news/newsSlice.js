import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: "General"
};

const newsSlice = createSlice({
    name: "news",
    initialState,
    reducers: {
        setNews: (state, action) => {
            state.category = action.payload;
        }
    }
});

export const { setNews } = newsSlice.actions;

export const selectCategory = (state) => state.news.category;

export default newsSlice.reducer;