import { createSlice } from "@reduxjs/toolkit";



export const ProfileSlice = createSlice({
    name: 'profile',
    initialState: {
        companyLogo: null
    },
    reducers: {
        setCompanyLogo: (state, action) => {
            state.companyLogo = action.payload
        }
    }
})


export const { setCompanyLogo } = ProfileSlice.actions;
export const ProfileReducer = ProfileSlice.reducer;

