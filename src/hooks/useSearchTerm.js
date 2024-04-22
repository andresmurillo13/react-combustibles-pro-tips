import { combustibleApi } from "../api";

import { useDispatch, useSelector } from "react-redux"
import { onError, onLoadResults } from "../store";




export const useSearchTerm = () => {
    const dispatch = useDispatch();

    const { searchResults, searchTerm, searchPerformed, totalResults, errorMessage } = useSelector(state => state.results);




    const startSearchEmployees = async (termino) => {
        try {
            const { data } = await combustibleApi.get(`/common/user/${termino}`)
            dispatch(onLoadResults({ searchResults: data.users, totalResults: data.totalUsers }));
        } catch (error) {
            dispatch(onError(error.response.data.message))
        }
    }

    const startSearchEquipment = async (termino) => {
        try {
            const { data } = await combustibleApi.get(`/common/equipment/${termino}`)
            dispatch(onLoadResults({ searchResults: data.equipments, totalResults: data.totalEquipments }));
          
        } catch (error) {
            dispatch(onError(error.response.data.message))
        }
    }

    return {

        searchResults,
        searchTerm,
        searchPerformed,
        totalResults,
        errorMessage,

        startSearchEmployees,
        startSearchEquipment
    }
}
