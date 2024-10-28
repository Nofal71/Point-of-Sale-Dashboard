import { createSlice } from "@reduxjs/toolkit";

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        Alert: {
            severity: null,  // Alert type: 'error', 'warning', 'info', 'success'
            message: null,
        },
        confirm: {
            message: 'Hi This is confirm dialogue',
            process: null, // CallBack 
            open: false,
        },
        loader: false,
    },
    reducers: {

        setAlertAction: (state, action) => {
            const { msg, type } = action.payload;
            state.Alert.message = msg;
            state.Alert.severity = type;
        },
        clearAlert: (state) => {
            state.Alert.message = null;
            state.Alert.severity = null;
        },

        setConfirmState: (state, action) => {
            const { message, process } = action.payload
            state.confirm.message = message ? message : 'Confirm Popup'
            state.confirm.process = process ? process : () => console.log('Process Empty')
        },
        setOpen: (state, action) => {
            state.confirm.open = action.payload
        },


        setLoaderAction: (state, action) => {
            state.loader = action.payload
        },
    },
});

export const { setAlertAction, clearAlert, setConfirmState, setOpen, setLoaderAction } = feedbackSlice.actions;
export const feedbackReducer = feedbackSlice.reducer;
