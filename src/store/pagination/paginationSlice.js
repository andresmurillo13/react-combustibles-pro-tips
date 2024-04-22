import { createSlice } from '@reduxjs/toolkit';

export const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        limit: 10,
    
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },

        setPagination: (state, action) => {
            state.totalItems = action.payload.totalItems;
            state.totalPages = action.payload.totalPages;
            state.limit = action.payload.limit;
         
      
        },
    },
});

export const { setCurrentPage, setPagination } = paginationSlice.actions;

