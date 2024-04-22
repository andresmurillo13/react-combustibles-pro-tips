/* eslint-disable react/prop-types */

import { IoMdClose } from "react-icons/io"


export const BtnCloseMap = ({ onClick }) => {
    return (
        <button
            className="rounded-full bg-red-600 h-14 w-14 justify-center flex items-center"
            onClick={onClick}
            style={{
                position: 'fixed',
                top: '90px',
                right: '20px',
                zIndex: 999
            }}
        >
            <IoMdClose
                className="h-8 w-8"
            />
        </button>
    )
}
