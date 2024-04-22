import { useDispatch, useSelector } from "react-redux"
import { onAddNewEquipment, onLoadEquipment, onSetActiveEquipment, onUpdateEquipment, setPagination } from "../store";
import { combustibleApi } from "../api";
import Swal from 'sweetalert2';
import { useAuthStore } from "./useAuthStore";

export const useEquipmentStore = () => {


    const dispatch = useDispatch();
    const {
        activeEquipment,
        equipments,
        isLoadingEquipments,
    } = useSelector(state => state.equipment);

    const { user } = useAuthStore()

    const setActiveEquipment = (employeed) => {
        dispatch(onSetActiveEquipment(employeed))
    }

    const startLoadingEquipment = async (limit, currentPage) => {
        const { data } = await combustibleApi.get(`/equipment/get?limit=${limit}&offset=${(currentPage - 1) * limit}`);

        dispatch(onLoadEquipment(data.results))
        dispatch(setPagination({
            totalPages: data.totalPages,
            totalItems: data.totalEquipments,
            limit: data.limit,
            offset: data.offset
        }))

    }

    const startSavingEquipments = async (equiposEquipo) => {
        try {
            if (equiposEquipo._id) {


                await combustibleApi.put(`/equipment/${equiposEquipo._id}`, equiposEquipo);
                dispatch(onUpdateEquipment({ ...equiposEquipo, user }));

                Swal.fire({

                    icon: 'success',
                    title: 'Equipo Actualizado',
                    showConfirmButton: false,
                    timer: 1500

                })

                return;
            }


            const { data } = await combustibleApi.post('/equipment/post', equiposEquipo);

            dispatch(onAddNewEquipment(data.equipo));

            Swal.fire({

                icon: 'success',
                title: 'Se agrego un nuevo equipo',
                showConfirmButton: false,
                timer: 1500

            })

        } catch (error) {
            console.log(error)
        }
    }


    return {

        activeEquipment,
        equipments,
        isLoadingEquipments,
        hasEquipmentSelected: !!activeEquipment,

        setActiveEquipment,
        startLoadingEquipment,
        startSavingEquipments

    }
}
