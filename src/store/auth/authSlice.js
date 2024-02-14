import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        user: {
        },
        isLoadingEmpleados: true,
        activeEmpleado: null,
        empleados: [],
        errorMessage: undefined,
    },
    reducers: {
        searchEmpleados: (state, { payload }) => {

            state.empleadosEncontrados = payload;
        },
        clearEmpleadosEncontrados: (state) => {
            state.empleadosEncontrados = [];
        },

        onSetActiveEmpleados: (state, { payload }) => {
            state.activeEmpleado = payload;

        },

        onLoadEmpleados: (state, action) => {
            state.isLoadingEmpleados = false;
            state.empleados = action.payload;

        },
        onDeleteEmpleados: (state) => {
            if (state.activeEmpleado) {
                state.empleados = state.empleados.filter(event => event.uid !== state.activeEmpleado.uid);
                state.activeEmpleado = null;
            }
        },
        onUpdateEmpleados: (state, { payload }) => {
            state.empleados = state.empleados.map(event => {
                if (event.uid === payload.uid) {
                    return payload;
                }

                return event;
            });
        },

        onSaveEmpleados: (state, { payload }) => {
            state.empleados.push(payload);

        },
        onDesactiveEmpleado: (state) => {
            state.activeEmpleado = null;
        },


        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;

        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;



        },
        onLogoutEmpleados: (state) => {
            state.isLoadingEmpleados = true
            state.activeEmpleado = null
            state.empleados = []
         
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined;
        }
    }
});


export const { onChecking,
    onLogin,
    onLogout,
    clearErrorMessage,
    onLoadEmpleados,
    onSaveEmpleados,
    onSetActiveEmpleados,
    onDeleteEmpleados,
    onUpdateEmpleados,
    onLogoutEmpleados,
    searchEmpleados,
    onDesactiveEmpleado,
    clearEmpleadosEncontrados
} = authSlice.actions;
