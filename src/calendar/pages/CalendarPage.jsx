
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { localizer, getMessagesES } from '../../helpers';
import { useState } from 'react';



export const CalendarPage = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week');

    const eventStyleGetter = (event) => {

        const isEventFinish = (event.estado === 'COMPLETADO');

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

    const onViewChanged = (event) => {
        localStorage.setItem('lastView', event);
        setLastView(event)
    }



    return (
        <>

            <div className='calendar'>
                <Calendar
                    culture='es'
                    localizer={localizer}
                    // events={events}
                    // actividades={actividades}
                    defaultView={lastView}
                    startAccessor="start"
                    endAccessor="end"
                    style={{
                        paddingLeft: '0.3rem',
                        fontFamily: 'sans-serif',
                        paddingTop: '1rem'
                    }}
                    messages={getMessagesES()}
                    eventPropGetter={eventStyleGetter}
                    // components={{
                    //     event: CalendarEvent
                    // }}
                    // onDoubleClickEvent={onDoubleClick}
                    // onSelectEvent={onSelect}
                    onView={onViewChanged}
                />

            </div>



        </>
    )
}
export default CalendarPage;