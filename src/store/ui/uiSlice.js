import { createSlice } from '@reduxjs/toolkit'


export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false,
        isMapModalOpen: false


    },
    reducers: {

        onOpenDateModal: (state) => {
            state.isDateModalOpen = true;
        },
        onCloseDateModal: (state) => {
            state.isDateModalOpen = false;
        },
        onOpenMapModal: (state) => {
            state.isMapModalOpen = true;
        },
        onCloseMapModal: (state) => {
            state.isMapModalOpen = false;
        },
    }
});

export const {
    onOpenDateModal,
    onCloseDateModal,
    onOpenMapModal,
    onCloseMapModal

} = uiSlice.actions

