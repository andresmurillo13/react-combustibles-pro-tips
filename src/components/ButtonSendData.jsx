/* eslint-disable react/prop-types */


export const ButtonSendData = ({ activeEvent, formSubmitted, handleSubmit }) => {
    return (
        <button
            className='ml-8 mt-4 mb-2 h-12 w-24 border-none bg-blue-500 rounded-lg italic font-bold'
            style={{ display: formSubmitted ? 'none' : 'block' }}
            type='button'
            disabled={formSubmitted}
            onClick={handleSubmit}
        >
            {activeEvent ? 'Actualizar' : 'Enviar'}
        </button>
    )
}

