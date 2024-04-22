/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { ErrorMessage, useField, useFormikContext } from 'formik';
import { useEffect } from 'react';





export const MySelect = ({ label, setFormValues, ...props }) => {
    const [field, meta, helpers] = useField(props);
    const { setFieldValue, values } = useFormikContext();
    useEffect(() => {

        if (field.value === 'true' || field.value === 'false') {
            const newValue = field.value === 'true' ? true : false;
            helpers.setValue(newValue);
        }
    }, [field.value, helpers]);


    useEffect(() => {
        if (field.name === 'selectRoles' && field.value) {
            const currentRoles = values.roles || [];

            if (!currentRoles.includes(field.value)) {
                setFieldValue('roles', [...currentRoles, field.value]);
                helpers.setValue('');
            } else {
                helpers.setValue('');
            }
        }
    }, [field.value, setFieldValue, helpers, values.roles]);

    return (
        <>
            <div className='bg-white  rounded px-8 pt-6 pb-2 mb-1'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={props.id || props.name}>{label}</label>
                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...field} {...props} />
                <ErrorMessage className='text-red-500 text-xs italic' name={props.name} component="span" />
            </div>
        </>
    )
}