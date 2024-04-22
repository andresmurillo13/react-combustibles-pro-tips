import { useContext, useState } from 'react';
import { MapContext, PlacesContext } from '../contexts';
import { LoadingPlaces } from './';

export const SearchResults = () => {
    const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
    const { map, getRouteBetweenPoints } = useContext(MapContext);

    const [activeId, setActiveId] = useState('');

    const onPlaceClicked = (place) => {
        setActiveId(place.id);
        const [lng, lat] = place.center;
        map?.flyTo({
            zoom: 14,
            center: [lng, lat]
        });
    };

    const getRoute = (place) => {
        if (!userLocation) return;
        const [lng, lat] = place.center;

        getRouteBetweenPoints(userLocation, [lng, lat]);
    };

    if (isLoadingPlaces) {
        return <LoadingPlaces />;
    }

    if (places.length === 0) {
        return <></>;
    }
   

    return (
        <ul className="fixed top-5 left-5 bg-white rounded-lg shadow-lg p-2 w-72 z-50 mt-14 overflow-y-auto h-5/6">
            {places.map((place) => (
                <li
                    key={place.id}
                    className={`bg-white border border-gray-200 p-4 mb-2 rounded-md cursor-pointer ${activeId === place.id ? 'bg-blue-200' : ''
                        }`}
                    onClick={() => onPlaceClicked(place)}
                >
                    <h6 className="font-semibold">{place.text_es}</h6>
                    <p className="text-sm text-gray-500">{place.place_name}</p>

                    <button
                        onClick={() => getRoute(place)}
                        className={`px-3 py-1 m-2 rounded-md hover:border-blue-600 text-blue-500 border-blue-500 hover:bg-blue-100 ${activeId === place.id
                            ? 'text-blue-500 border-blue-500 hover:bg-blue-100'
                            : 'text-primary border-primary hover:bg-primary-light'
                            } border`}
                    >
                        Trazar ruta
                    </button>
                </li>
            ))}
        </ul>
    );
};
