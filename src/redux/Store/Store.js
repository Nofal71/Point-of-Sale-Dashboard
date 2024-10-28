import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../Reducers/userSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { ProfileReducer } from "../Reducers/Profile";
import { feedbackReducer } from "../Reducers/feedbackSlice";
import { commonReducer } from "../Reducers/commonSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'profile', 'common'],
    blacklist: ['feedback' , 'common.Breadcrumbs'],
};

const rootReducer = combineReducers({
    user: userReducer,
    profile: ProfileReducer,
    feedback: feedbackReducer,
    common: commonReducer
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
