import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../slices/movie.slice"
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";


const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, movieReducer)


const store = configureStore({
    reducer: {
        movie: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
})


const persistor = persistStore(store);
export { store, persistor };

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const appDispatch = store.dispatch;