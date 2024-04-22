/* eslint-disable react/prop-types */

import { MdDelete } from "react-icons/md"


export const ButtonDeleteEvents = ({ startDeleting, hasSelected, activeMenu }) => {
    return (

        <div className={`fixed bottom-20 ${activeMenu ? 'left-80' : 'left-4'}`}>
            <button
                className="text-3xl text-white bg-red-600 p-3 hover:drop-shadow-xl hover:bg-red-700 rounded-full"
                onClick={startDeleting}
                style={{
                    display: hasSelected ? '' : 'none'
                }}
            >
                <MdDelete />
            </button>

        </div>

    )
}
