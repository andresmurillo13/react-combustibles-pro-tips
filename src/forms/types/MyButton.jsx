/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */


export const MyButton = ({ onClick, label, ...props }) => {


    return (
        <div className='bg-white rounded px-8 pt-6 pb-2 '>
            <label
                className='block text-gray-700 text-sm font-bold mb-1'
                htmlFor={props.id || props.name}
            >
                {label}
            </label>
            <button
                type="button"
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                onClick={onClick}
            >
                {label}
            </button>
        </div>
    )
}
