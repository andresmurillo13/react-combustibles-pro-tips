/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import Modal from 'react-modal';
import es from 'date-fns/locale/es';
import { registerLocale } from 'react-datepicker';


registerLocale('es', es);

const customStyles = {
    content: {
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '6px',
        outline: 'none',
        padding: '20px'
    }
};

Modal.setAppElement('#root');

export const ReactModal = ({ children, isDateModalOpen, closeModalCalendar }) => {





    return (

        <Modal
            isOpen={isDateModalOpen}
            style={customStyles}
            closeTimeoutMS={200}
            overlayClassName='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30'
            onRequestClose={closeModalCalendar}
        >
            {children}
        </Modal>

    )
}

