/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useLayoutEffect, useRef } from "react"
import { PlacesContext, MapContext } from "../contexts"
import { LoadingMap } from "../router"
import { Map } from "mapbox-gl";



export const Mapbox = () => {

    const { userLocation, isLoading } = useContext(PlacesContext);
    const { setMap } = useContext(MapContext);
    const mapDiv = useRef(null)



    useLayoutEffect(() => {

        if (!isLoading) {
            const map = new Map({
                container: mapDiv.current,
                style: 'mapbox://styles/mapbox/dark-v10',
                center: userLocation,
                zoom: 14
            });
            setMap(map)
        }
    }, [isLoading])


    if (isLoading) {
        return (<LoadingMap />)
    }
    return (

        <div
            ref={mapDiv}
            style={{
                backgroundColor: 'red',
                height: '100%',
                left: 0,
                position: 'fixed',
                top: 0,
                width: '100vw'
            }}
        >
            {userLocation?.join(', ')}


        </div>
    )
}
