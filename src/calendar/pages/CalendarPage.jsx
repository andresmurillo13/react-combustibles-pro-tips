/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Calendar } from 'react-big-calendar';
import { CalendarEvent } from '../components/CalendarEvent';
import { DynamicFormCalendar } from '../../forms';
import { localizer, getMessagesES } from '../../helpers';
import { onDesactiveApplication, resetSearch } from '../../store';
import { ReactModal, ButtonOpenModals, ButtonDeleteEvents, Mapbox, BtnMyLocation, MapLogo, MapSearchBar, SearchResults } from '../../components';
import { useAplicationsStore, useSearchTerm, useUiStore } from '../../hooks';
import { useDispatch } from "react-redux"
import { useEffect, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import formJson from '../../forms/data/calendar-form.json';



export const CalendarPage = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');
    const { openDateModal, isDateModalOpen, closeDateModal } = useUiStore();
    const {
        startSavingApplication,
        startLoadingAplications,
        startDeletingAplication,
        setActiveAplication,
        hasApplicationSelected,
        aplications,
        activeAplication,
    } = useAplicationsStore();
    const { startSearchEquipment, searchResults, errorMessage } = useSearchTerm();

    const { activeMenu } = useStateContext();
    const dispatch = useDispatch();

    const eventStyleGetter = (event) => {


        const isEventFinish = (event.estado === true);

        const style = {
            backgroundColor: isEventFinish ? '#D1FFAD' : '#FFC3C3',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black'
        }

        return {
            style
        }
    }

    useEffect(() => {
        startLoadingAplications()
    }, [])


    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event);
        setLastView(event)
    }

    const handleOpenModal = () => {
        openDateModal()
    }
    const onDoubleClick = () => {
        openDateModal();
    }

    const onSelect = (event) => {
        setActiveAplication(event);
    }

    const resetResults = () => {
        dispatch(resetSearch())
    }

    const closeModalCalendar = () => {
        closeDateModal()
        dispatch(onDesactiveApplication())
    }

    const onSubmit = async (values) => {

        await startSavingApplication(values);
        closeModalCalendar()
        if (searchResults) {
            resetResults()
        }
    }


    return (
        <>

            <div className='calendar'>
                <Calendar
                    culture='es'
                    localizer={localizer}
                    events={aplications}
                    eventPropGetter={eventStyleGetter}
                    defaultView={lastView}
                    startAccessor="start"
                    endAccessor="end"
                    className='dark:bg-white'
                    style={{
                        paddingLeft: '0.3rem',
                        fontFamily: 'sans-serif',
                        paddingTop: '1rem',
                        height: '46rem'
                    }}
                    messages={getMessagesES()}
                    components={{
                        event: CalendarEvent
                    }}
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelect}
                    onView={onViewChanged}
                />
                <ReactModal
                    isDateModalOpen={isDateModalOpen}
                    closeModalCalendar={closeModalCalendar}
                >

                    <DynamicFormCalendar
                        title={'Inserta una solicitud'}
                        formJson={formJson}
                        startSavingModel={startSavingApplication}
                        closeModal={closeModalCalendar}
                        startSearchModel={startSearchEquipment}
                        searchResults={searchResults}
                        errorMessage={errorMessage}
                        activeEvent={activeAplication}
                        onSubmit={onSubmit}
                        resetSearch={resetResults}
                    />
                </ReactModal>

                <ButtonOpenModals
                    openModal={handleOpenModal}
                />
                <ButtonDeleteEvents
                    hasSelected={hasApplicationSelected}
                    activeMenu={activeMenu}
                    startDeleting={startDeletingAplication}
                />

            </div>



        </>
    )
}
export default CalendarPage;