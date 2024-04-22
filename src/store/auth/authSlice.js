import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        user: {
        },
        isLoadingEmployees: true,
        activeEmployeed: null,
        employees: [],
        errorMessage: undefined,
    },
    reducers: {

        onSetActiveEmployeed: (state, { payload }) => {
            state.activeEmployeed = payload;
        },

        onLoadEmployees: (state, action) => {
            state.isLoadingEmployees = false;
            state.employees = action.payload;
        },
        onDeleteEmployeed: (state) => {
            if (state.activeEmployeed) {
                state.employees = state.employees.map(employeed => {
                    if (employeed.id === state.activeEmployeed.id) {

                        return { ...employeed, isActive: false };
                    } else {
                        return employeed;
                    }
                });
                state.activeEmployeed = null;
            }
        },
        onUpdateEmployeed: (state, { payload }) => {
            state.employees = state.employees.map(employeed => {
                if (employeed.id === payload.id) {
                    return payload;
                }

                return employeed;
            });
        },

        onSaveEmployeed: (state, { payload }) => {
            state.employees.push(payload);

        },
        onDesactiveEmployeed: (state) => {
            state.activeEmployeed = null;
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

        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
            state.isLoadingEmployees = true
            state.activeEmployeed = null
            state.employees = []
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
    onLoadEmployees,
    onSaveEmployeed,
    onSetActiveEmployeed,
    onDeleteEmployeed,
    onUpdateEmployeed,
    onLogoutEmployees,
    searchEmployees,
    onDesactiveEmployeed,
    clearEmployeesFind
} = authSlice.actions;
