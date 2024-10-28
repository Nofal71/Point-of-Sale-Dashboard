import { createSlice } from "@reduxjs/toolkit";



export const commonSlice = createSlice({
    name: 'common',
    initialState: {
        theme: 'light',
        Breadcrumbs: []
    },
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload
        },
        setBreadcrumb: (state, action) => {
            state.Breadcrumbs = action.payload
        },
        updateBreadcrumbs: (state, action) => {
            state.Breadcrumbs = [...state.Breadcrumbs, action.payload]
        }
    }
})


export const { setTheme, setBreadcrumb, updateBreadcrumbs } = commonSlice.actions;
export const commonReducer = commonSlice.reducer;

