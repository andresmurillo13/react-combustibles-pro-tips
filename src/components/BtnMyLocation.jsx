
import { useContext } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { MapContext, PlacesContext } from "../contexts";


export const BtnMyLocation = () => {

    const { map, isMapReady } = useContext(MapContext)
    const { userLocation } = useContext(PlacesContext)

    const onClick = () => {
        if (!isMapReady) throw new Error('Mapa no esta listo')
        if (!userLocation) throw new Error('No hay ubicacion del usuario')
        map?.flyTo({
            zoom: 14,
            center: userLocation
        })
    }
    return (

        <button
            className="rounded-full bg-blue-700 h-14 w-14 justify-center flex items-center"
            onClick={onClick}
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 999
            }}
        >
            <FaLocationCrosshairs
                className="h-7 w-7"
            />
        </button>
    )
}
