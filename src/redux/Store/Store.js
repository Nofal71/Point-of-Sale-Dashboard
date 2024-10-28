import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../Reducers/userSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { ProfileReducer } from "../Reducers/Profile";
import { feedbackReducer } from "../Reducers/feedbackSlice";
import { ThemeReducer } from "../Reducers/themeSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'profile', 'theme'],
    blacklist: ['feedback'],
};

const rootReducer = combineReducers({
    user: userReducer,
    profile: ProfileReducer,
    feedback: feedbackReducer,
    theme: ThemeReducer
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
