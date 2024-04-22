/* eslint-disable react/prop-types */
import { BtnCloseMap, BtnMyLocation, Mapbox, MapLogo, MapSearchBar, ReactModal, SearchResults } from "../components"


export const MapBoxComponents = ({ isModalOpen, closeModal }) => {
    return (
        <ReactModal
            isDateModalOpen={isModalOpen}
            closeModalCalendar={closeModal}
        >
            <Mapbox />
            <BtnMyLocation />
            <MapLogo />
            <MapSearchBar />
            <SearchResults />
            <BtnCloseMap
                onClick={closeModal}
            />
        </ReactModal>
    )
}
