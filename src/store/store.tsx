import {configureStore, combineReducers, ThunkAction, Action,} from '@reduxjs/toolkit';
import  userReducer from '../features/user/userSlice';
//import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: "root",
    version: 1,
    storage: AsyncStorage,
};

const reducer = combineReducers({
    user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

