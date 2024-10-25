import { createSlice } from "@reduxjs/toolkit";

export const confirmSlice = createSlice({
    name: 'confirm',
    initialState: {
        message: 'Hi This is confirm dialogue',
        process: null,
        open: false,
    },
    reducers: {
        setConfirmState: (state, action) => {
            const { message, process } = action.payload
            state.message = message ? message : 'Confirm Popup'
            state.process = process ? process : () => console.log('Process Empty')
        },
        setOpen: (state, action) => {
            state.open = action.payload
        }

    },
});

export const { setConfirmState, setOpen } = confirmSlice.actions;
export const ConfirmReducer = confirmSlice.reducer;
