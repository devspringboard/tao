import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./reducers/authSlice";
import verificationSlice from "./reducers/verificationSlice";
import signupSlice from "./reducers/signupSlice"; //

// Configure persistor
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "verification", "signup"], // Specify the reducers you want to persist
};

const rootReducer = combineReducers({
    auth: authSlice,
    verification: verificationSlice,
    signup: signupSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
