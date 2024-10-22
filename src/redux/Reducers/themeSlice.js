import { createSlice } from "@reduxjs/toolkit";



export const themeSlice = createSlice({
    name: 'theme',
    initialState: 'light',
    reducers: {
        setTheme: (state, action) => action.payload
    }
})


export const { setTheme } = themeSlice.actions;
export const ThemeReducer = themeSlice.reducer;

