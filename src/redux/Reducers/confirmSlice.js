import { createSlice } from "@reduxjs/toolkit";

export const confirmSlice = createSlice({
    name: 'confirm',
    initialState: {
        message: null,
        process: null
    },
    reducers: {
        setConfirmState: (state, action) => {
            const { message, process } = action.payload
            state.message = message ? message : 'Confirm Popup'
            state.process = process ? process : () => console.log('Process Empty')
        },
        ResetConfirm: (state) => {
            state.message = null
            state.process = null
        }

    },
});

export const { setConfirmState , ResetConfirm } = confirmSlice.actions;
export const ConfirmReducer = confirmSlice.reducer;
