import { createSlice } from '@reduxjs/toolkit'


export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchResults: [],
        totalResults: 0,
        searchTerm: '',
        searchPerformed: false,
        errorMessage: undefined,
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;

        },
        setSearchPerformed: (state, action) => {
            state.searchPerformed = action.payload
        },

        onLoadResults: (state, action) => {
            state.searchPerformed = true
            state.searchResults = action.payload.searchResults;
            state.totalResults = action.payload.totalResults;
        },
        onError: (state, { payload }) => {
            state.errorMessage = payload
            state.searchResults = []

        },
        resetSearch: (state) => {
            state.searchTerm = '';
            state.searchPerformed = false;
            state.searchResults = [];
            state.totalResults = 0;
            state.errorMessage = undefined
        },
    }
});

export const { setSearchTerm, resetSearch, setSearchPerformed, onLoadResults, onError } = searchSlice.actions

