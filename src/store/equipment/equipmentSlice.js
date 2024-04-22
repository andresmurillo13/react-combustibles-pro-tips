import { createSlice } from '@reduxjs/toolkit'



export const equipmentSlice = createSlice({
  name: 'equipment',
  initialState: {
    isLoadingEquipments: true,
    activeEquipment: null,
    equipments: [],
    errorMessage: undefined,
  },
  reducers: {


    onSetActiveEquipment: (state, { payload }) => {
      state.activeEquipment = payload;
    },

    onLoadEquipment: (state, action) => {
      state.isLoadingEquipments = false;
      state.equipments = action.payload;
    },
    onDesasctiveEquipment: (state) => {
      state.activeEquipment = null
    },
    onAddNewEquipment: (state, { payload }) => {
      state.equipments.push(payload);
      state.activeEquipment = null;
    },
    onDeleteEquipment: (state) => {
      if (state.activeEquipment) {
        state.equipments = state.equipments.filter(equipment => equipment.id !== state.activeEquipment.id);
        state.activeEquipment = null;

      }
    },
    onUpdateEquipment: (state, { payload }) => {
      state.equipments = state.equipments.map(equipment => {
        if (equipment.id === payload.id) {
          return payload;
        }

        return equipment;
      });
    },

  }
});

export const {
  onLoadEquipment,
  onSetActiveEquipment,
  onDesasctiveEquipment,
  onAddNewEquipment,
  onDeleteEquipment,
  onUpdateEquipment

} = equipmentSlice.actions

