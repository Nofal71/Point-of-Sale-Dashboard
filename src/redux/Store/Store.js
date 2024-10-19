import { configureStore } from "@reduxjs/toolkit";
import { currentSelectionReducer } from "../Reducers/currentComponentSlice";
import { userReducer } from "../Reducers/userSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { AlertReducer } from "../Reducers/AlertSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'],
    blacklist: ['Alert'],
};

const rootReducer = combineReducers({
    currentSelection: currentSelectionReducer,
    user: userReducer,
    Alert: AlertReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
