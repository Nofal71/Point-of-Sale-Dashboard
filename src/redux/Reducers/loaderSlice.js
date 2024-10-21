import { createSlice } from "@reduxjs/toolkit";

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: false,
    reducers: {
        setLoaderAction: (state, action) => {
            return action.payload
        }
    },
});

export const { setLoaderAction } = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;
