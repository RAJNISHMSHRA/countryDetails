import { configureStore } from '@reduxjs/toolkit';
import countryReducer from '../features/countries/countrySlice';
import { TypedUseSelectorHook, useDispatch as rawUseDispatch, useSelector as rawUseSelector } from 'react-redux';

const store = configureStore({
    reducer: {
        countries: countryReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed versions of the hooks
export const useDispatch = () => rawUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;

export default store;
