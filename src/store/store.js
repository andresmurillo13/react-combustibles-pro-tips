import { configureStore } from '@reduxjs/toolkit';
import {
    authSlice,
    equipmentSlice,
    paginationSlice,
    searchSlice,
    uiSlice,
    aplicationSlice
} from './';



export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        aplication: aplicationSlice.reducer,
        equipment: equipmentSlice.reducer,
        pages: paginationSlice.reducer,
        ui: uiSlice.reducer,
        results: searchSlice.reducer,


    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})



