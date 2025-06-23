import { configureStore } from '@reduxjs/toolkit';
import reposReducer from './reposSlice';

export const store = configureStore({
    reducer: {
        repos: reposReducer,
    },
});

// Define RootState and AppDispatch types for better TypeScript inference
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;