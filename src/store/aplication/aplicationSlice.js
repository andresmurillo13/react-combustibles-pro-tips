import { createSlice } from '@reduxjs/toolkit'



export const aplicationSlice = createSlice({
    name: 'aplication',
    initialState: {
        isLoadingAplications: true,
        activeAplication: null,
        aplications: [],
        errorMessage: undefined,
    },
    reducers: {
        onSetActiveAplication: (state, { payload }) => {
            state.activeAplication = payload;
        },
        onDesactiveApplication: (state) => {
            state.activeAplication = null
        },

        onLoadAplication: (state, { payload = [] }) => {
            state.isLoadingAplications = false;
            payload.forEach(event => {
                const exists = state.aplications.some(dbEvent => dbEvent.id === event.id);
                if (!exists) {
                    state.aplications.push(event)
                }

            })
        },
        onAddNewAplication: (state, { payload }) => {
            state.aplications.push(payload);
            state.activeAplication = null;
        },
        onDeleteAplication: (state) => {
            if (state.activeAplication) {
                state.aplications = state.aplications.filter(aplication => aplication.id !== state.activeAplication.id);
                state.activeAplication = null;

            }
        },
        onUpdateApplication: (state, { payload }) => {
            state.aplications = state.aplications.map(application => {
                if (application.id === payload.id) {
                    return payload;
                }

                return application;
            });
        },
    }
});

export const {
    onSetActiveAplication,
    onLoadAplication,
    onAddNewAplication,
    onDesactiveApplication,
    onUpdateApplication,
    onDeleteAplication
} = aplicationSlice.actions

