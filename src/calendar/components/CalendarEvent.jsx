/* eslint-disable react/prop-types */


export const CalendarEvent = ({ event }) => {

    const { equipment } = event;

    return (
        <>
            <strong className="italic text-sm">{equipment}  </strong>


        </>
    )
}
