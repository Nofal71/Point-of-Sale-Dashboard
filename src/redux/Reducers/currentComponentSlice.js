import { createSlice } from "@reduxjs/toolkit";
import { tabs } from "../../Pages/Tabs/DashboardTabs";

export const currentSelectionSlice = createSlice({
    name: 'currentSelection',
    initialState: {
        name: tabs[0]?.subItems ? tabs[0].subItems[0] : tabs[0]?.name,
        nestedComponent: []
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
            state.nestedComponent = []
        },
        setNestedComponent: (state, action) => {
            state.nestedComponent.push(action.payload);
        },
    }
});

export const { setName, setNestedComponent } = currentSelectionSlice.actions;
export const currentSelectionReducer = currentSelectionSlice.reducer;
