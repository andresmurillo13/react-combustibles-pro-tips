/* eslint-disable react/prop-types */
import { ErrorMessage, useField } from 'formik';



export const MyCheckbox = ({ label, ...props }) => {

    const [field] = useField({ ...props, type: 'checkbox' });

    return (
        <>
            <div className='p-2 items-center'>
                <label className='pr-2 text-sm'>
                    <input type="checkbox" {...field} {...props} />
                    {label}
                </label>
                <ErrorMessage className='text-red-600' name={props.name} component="span" />
            </div>

        </>
    )
}