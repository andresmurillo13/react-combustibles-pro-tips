
import { useDispatch, useSelector } from "react-redux"
import { combustibleApi } from "../api";
import {
    clearErrorMessage,
    onChecking,
    onLogin,
    onLogout,
    clearEmpleadosEncontrados,
    onLoadEmpleados,
} from "../store";



export const useAuthStore = () => {

    const dispatch = useDispatch();
    const { status,
        user,
        errorMessage,
        empleados,
        activeEmpleado,
        paginaActual,
        usuariosEnPagina,
        paginasTotalesEmpleados,
        empleadosEncontrados,
        mecanicos,
        isLoadingEmpleados
    } = useSelector(state => state.auth);



    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await combustibleApi.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin(data));

        } catch (error) {
            dispatch(onLogout('El correo o la contraseña son incorrectos'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startLoadingUsers = async () => {

        try {
            const { data } = await combustibleApi.get('/auth/get');
            dispatch(onLoadEmpleados(data))

        } catch (error) {
            console.log(error)
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');

        if (!token) return dispatch(onLogout());

        try {

            const { data } = await combustibleApi.get('/auth/check');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin(data));
        } catch (error) {
            console.log(error)
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }



    return {

        errorMessage,
        status,
        paginaActual,
        usuariosEnPagina,
        paginasTotalesEmpleados,
        user,
        empleados,
        mecanicos,
        activeEmpleado,
        hasEmpleadoSelected: !!activeEmpleado,
        empleadosEncontrados,
        clearEmpleadosEncontrados,
        isLoadingEmpleados,


        checkAuthToken,
        startLogin,
        startLogout,
        startLoadingUsers

    }
}