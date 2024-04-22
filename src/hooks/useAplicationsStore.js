import { useDispatch, useSelector } from "react-redux"
import { combustibleApi } from "../api";
import { onAddNewAplication, onDeleteAplication, onLoadAplication, onSetActiveAplication, onUpdateApplication } from "../store";
import { convertEventsToDate } from "../helpers";
import Swal from 'sweetalert2';

export const useAplicationsStore = () => {

    const dispatch = useDispatch();

    const {
        activeAplication,
        aplications,
        isLoadingAplications,
    } = useSelector(state => state.aplication);

    const { user } = useSelector(state => state.auth);

    const setActiveAplication = (aplication) => {
        dispatch(onSetActiveAplication(aplication))
    }

    const startLoadingAplications = async () => {
        const { data } = await combustibleApi.get(`/applications/get`);
        const aplications = convertEventsToDate(data)
        dispatch(onLoadAplication(aplications))


    }

    const startDeletingAplication = async () => {

        try {
            await combustibleApi.delete(`/applications/${activeAplication.id}`);
            dispatch(onDeleteAplication());
            Swal.fire({

                icon: 'success',
                title: `Se elimno la aplicacion: ${activeAplication.id}`,
                showConfirmButton: false,
                timer: 1500
            })
        } catch (error) {

            console.log(error)
        }

    }

    const startSavingApplication = async (calendarEvent) => {


        try {
            if (calendarEvent.id) {

                await combustibleApi.patch(`/applications/${calendarEvent.id}`, calendarEvent);
                dispatch(onUpdateApplication({ ...calendarEvent, user: user.fullName }));


                Swal.fire({

                    icon: 'success',
                    title: 'Se ha actualizado una aplicación.',
                    showConfirmButton: false,
                    timer: 1500
                })
                return;
            }

            const { data } = await combustibleApi.post(`/applications/post/${calendarEvent.results}`, calendarEvent);

            dispatch(onAddNewAplication({ ...calendarEvent, equipment: data.equipment, user: data.user, id: data.id }));


            Swal.fire({

                icon: 'success',
                title: 'Se ha insertado una aplicación.',
                showConfirmButton: false,
                timer: 1500
            })

        } catch (error) {
            console.log(error)
        }

    }

    return {
        setActiveAplication,
        startLoadingAplications,
        startSavingApplication,
        startDeletingAplication,


        aplications,
        activeAplication,
        isLoadingAplications,
        hasApplicationSelected: !!activeAplication
    }
}
