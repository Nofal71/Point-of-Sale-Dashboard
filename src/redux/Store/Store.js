import { configureStore } from "@reduxjs/toolkit";
import { currentSelectionReducer } from "../Reducers/currentComponentSlice";


export const store = configureStore({
    reducer: {
        currentSelection: currentSelectionReducer
    }
})