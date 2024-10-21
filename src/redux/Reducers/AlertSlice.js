import { createSlice } from "@reduxjs/toolkit";

export const AlertSlice = createSlice({
    name: 'Alert',
    initialState: {
        severity: null,  // Alert type: 'error', 'warning', 'info', 'success'
        message: null,   
    },
    reducers: {
        setAlertAction: (state, action) => {
            const { msg, type } = action.payload;
            state.message = msg;
            state.severity = type;
        },
        clearAlert: (state) => {
            state.message = null;
            state.severity = null;
        },
    },
});

export const { setAlertAction, clearAlert } = AlertSlice.actions;
export const AlertReducer = AlertSlice.reducer;
