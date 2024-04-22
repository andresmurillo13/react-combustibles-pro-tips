
import { useDispatch, useSelector } from "react-redux"
import { combustibleApi } from "../api";
import {
    clearErrorMessage,
    onChecking,
    onLogin,
    onLogout,
    onLoadEmployees,
    clearEmployeesFind,
    setPagination,
    onSetActiveEmployeed,
    onUpdateEmployeed,
    onSaveEmployeed,
    onDeleteEmployeed
} from "../store";
import Swal from 'sweetalert2';


export const useAuthStore = () => {

    const dispatch = useDispatch();
    const { status,
        user,
        errorMessage,
        employees,
        activeEmployeed,
        isLoadingEmployees
    } = useSelector(state => state.auth);

    const setActiveEmployeed = async (employeed) => {
        dispatch(onSetActiveEmployeed(employeed))
    }

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await combustibleApi.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin(data));


        } catch (error) {
            dispatch(onLogout(error.response.data.message));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startLoadingUsers = async (limit, currentPage) => {
        const { data } = await combustibleApi.get(`/auth/get?limit=${limit}&offset=${(currentPage - 1) * limit}`);

        dispatch(onLoadEmployees(data.employees))
        dispatch(setPagination({
            totalPages: data.totalPages,
            totalItems: data.totalUsers,
            limit: data.limit,
            offset: data.offset
        }))

    }

    const startRegister = async (usuarioEmpleado) => {

        try {

            if (usuarioEmpleado.id) {
                const { data } = await combustibleApi.patch(`/auth/${usuarioEmpleado.id}`, usuarioEmpleado);
                dispatch(onUpdateEmployeed(data));
         

                Swal.fire({
                    icon: 'success',
                    title: 'Empleado Actualizado',
                    showConfirmButton: false,
                    timer: 1500

                })

                return;
            }
            const { data } = await combustibleApi.post('/auth/register', usuarioEmpleado);
            dispatch(onSaveEmployeed(data))

            Swal.fire({
                icon: 'success',
                title: 'Se ha guardado un nuevo empleado',
                showConfirmButton: false,
                timer: 1500
            })

        } catch (error) {
     
            let errorMessage = error.response.data.message;
            if (Array.isArray(errorMessage)) {
                errorMessage = errorMessage.join(', ');
            }

            Swal.fire('Error en la petición', errorMessage, 'error');
        }
    }

    const startDeletingEmpleados = async () => {

        const confirmation = await Swal.fire({
            title: `Esta seguro que desea eliminar este usuario? ${activeEmployeed.fullName}`,
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'

        });

        if (!confirmation.isConfirmed) return;

        try {
            await combustibleApi.delete(`/auth/${activeEmployeed.id}`);
            dispatch(onDeleteEmployeed())

            Swal.fire({
                icon: 'success',
                title: 'Se ha eliminado',
                showConfirmButton: false,
                timer: 1500
            })

        } catch (error) {
           
            Swal.fire('Error al eliminar empleado', error.response.data.message, 'error');
        }
    }



    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');

        if (!token) return dispatch(onLogout());

        try {

            const { data } = await combustibleApi.get('/auth/check');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin(
                {
                    fullName: data.fullName,
                    id: data.id,
                    email: data.email,
                    roles: data.roles,
                    token: data.token,
                    isActive: data.isActive
                }));

        } catch (error) {
          
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
        user,
        employees,
        activeEmployeed,
        hasEmpleadoSelected: !!activeEmployeed,
        clearEmployeesFind,
        isLoadingEmployees,


        checkAuthToken,
        startLogin,
        startLogout,
        startLoadingUsers,
        setActiveEmployeed,
        startRegister,
        startDeletingEmpleados

    }
}