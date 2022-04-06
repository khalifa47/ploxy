import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: null,
    email: null,
    photo: null,
    uid: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserLogin: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.photo = action.payload.photo;
            state.uid = action.payload.uid;
        },
        setSignOut: (state) => {
            state.name = null;
            state.email = null;
            state.photo = null;
            state.uid = null;
        }
    }
});

export const { setUserLogin, setSignOut } = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectUserPhoto = (state) => state.user.photo;
export const selectUserId = (state) => state.user.uid;

export default userSlice.reducer;