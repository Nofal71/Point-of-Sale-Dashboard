import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: false,
    reducers: {
        userData: (state, action) => {
            return action.payload
        },
    }
});

export const { userData } = userSlice.actions;
export const userReducer = userSlice.reducer;
