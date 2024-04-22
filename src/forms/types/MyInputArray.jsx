/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { ErrorMessage, useField, } from "formik"
import { FaTimes } from "react-icons/fa";

export const MyInputArray = ({ label, form, remove, index, ...props }) => {
    const [field] = useField(props)
    return (

        <div className="bg-white rounded px-8 pt-12 pb-2 relative" >
            <div
                disabled
                className="relative"
                key={index}
            >
                <input

                    disabled
                    className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...field}
                    {...props}
                />
                <button
                    type='button'
                    className="absolute top-0 right-0 mt-3 mr-2 cursor-pointer"
                    onClick={() => { remove(index) }}
                >
                    <FaTimes color="red" fontSize="15px" />
                </button>
                <ErrorMessage
                    className='text-red-500 text-xs italic'
                    name={props.name}
                    component="span"
                />
            </div>

        </div>



    )
}
