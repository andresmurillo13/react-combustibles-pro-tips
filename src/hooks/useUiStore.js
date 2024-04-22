
import { useDispatch, useSelector } from 'react-redux';
import { onCloseDateModal, onCloseMapModal, onOpenDateModal, onOpenMapModal } from '../store';


export const useUiStore = () => {

    const dispatch = useDispatch();

    const { isDateModalOpen, isMapModalOpen } = useSelector(state => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal())
    }
    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }
    const openMapModal = () => {
        dispatch(onOpenMapModal())
    }
    const closeMapModal = () => {
        dispatch(onCloseMapModal())
    }

    const toggleDateModal = () => {
        (isDateModalOpen)
            ? openDateModal()
            : closeDateModal();
    }
    const toggleMapModal = () => {
        (isMapModalOpen)
            ? openMapModal()
            : closeMapModal();
    }

    return {
        openDateModal,
        closeDateModal,
        toggleDateModal,

        //MAPA
        openMapModal,
        closeMapModal,
        toggleMapModal,

        isDateModalOpen,
        isMapModalOpen
    }
}
