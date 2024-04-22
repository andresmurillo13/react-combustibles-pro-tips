/* eslint-disable react/prop-types */

import { IoMdAdd } from "react-icons/io"
import { useStateContext } from "../contexts/ContextProvider";



export const ButtonOpenModals = ({ openModal }) => {

    const { currentColor } = useStateContext();



    return (
        <>


            <div className="fixed right-4 bottom-20" >

                <button
                    onClick={openModal}
                    style={{ background: currentColor, borderRadius: '50%' }}
                    className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                    <IoMdAdd />
                </button>


            </div>
        </>



    )
}
