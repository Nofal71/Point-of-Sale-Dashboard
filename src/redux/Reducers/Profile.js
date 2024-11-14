import { createSlice } from "@reduxjs/toolkit";



export const ProfileSlice = createSlice({
    name: 'profile',
    initialState: {
        companyLogo: null,
        companyName: 'Admin'
    },
    reducers: {
        setCompanyLogo: (state, action) => {
            state.companyLogo = action.payload
        },
        setCompanyName: (state, action) => {
            state.companyName = action.payload
        }
    }
})


export const { setCompanyLogo, setCompanyName } = ProfileSlice.actions;
export const ProfileReducer = ProfileSlice.reducer;

