import { createSlice } from "@reduxjs/toolkit";
import { tabs } from "../../Components/Tabs/DashboardTabs";

export const currentSelectionSlice = createSlice({
    name: 'currentSelection',
    initialState: {
        name: tabs[0]?.subItems ? tabs[0].subItems[0] : tabs[0]?.name,
        nestedComponent: [],
        values: null,
        selectedIndex: null
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
            state.nestedComponent = []
        },
        setNestedComponent: (state, action) => {
            state.nestedComponent.push(action.payload);
            state.values = null;
        },
        setValues: (state, action) => {
            state.values = action.payload
        },
        setIndexState: (state, action) => {
            state.selectedIndex = action.payload
        },
    }
});

export const { setName, setNestedComponent, setValues, setIndexState } = currentSelectionSlice.actions;
export const currentSelectionReducer = currentSelectionSlice.reducer;
