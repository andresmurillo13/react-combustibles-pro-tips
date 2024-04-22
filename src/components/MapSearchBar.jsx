import { useContext, useRef } from "react";
import { PlacesContext } from "../contexts";

export const MapSearchBar = () => {


    const debounceRef = useRef();
    const { searchPlacesByTerm } = useContext(PlacesContext)

    const onQueryChanged = (event) => {
        if (debounceRef.current)
            clearTimeout(debounceRef.current)

        debounceRef.current = setTimeout(() => {
            searchPlacesByTerm(event.target.value)
        }, 350);
    }

    return (
        <div className="fixed top-5 left-5 bg-white rounded-lg shadow-lg p-2 w-72 z-50">

            <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Search..."
                onChange={onQueryChanged}
            />
        </div>
    );
};