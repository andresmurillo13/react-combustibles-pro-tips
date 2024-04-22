/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { ErrorMessage, useField, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { resetSearch, setSearchTerm } from '../../store';
import { useDispatch } from "react-redux"


export const MyTextInput = ({ startSearchModel, label, ...props }) => {
    const dispatch = useDispatch();
    const [field] = useField(props)
    const { setFieldValue } = useFormikContext();


    useEffect(() => {
        let timeout;
        if (field.name === "buscar" && field.value) {
            dispatch(setSearchTerm(field.value));
            timeout = setTimeout(() => {
                startSearchModel(field.value);
            }, 300);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [field.value]);

    useEffect(() => {
        if (field.name === 'telefono' && field.value) {
            const valueAsString = String(field.value);
            const numericValue = Number(valueAsString.replace(/\D/g, ''));
            setFieldValue(field.name, numericValue);
        }
    }, [field.value, setFieldValue]);

    useEffect(() => {
        if (field.name === 'buscar' && field.value && field.value.length == 0) {
            dispatch(resetSearch())
        }
    }, [field.value])



    return (
        <>

            <div className='bg-white rounded px-8 pt-6 pb-2 '>
                <label
                    className='block text-gray-700 text-sm font-bold mb-1'
                    htmlFor={props.id || props.name}
                >
                    {label}
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    {...field}
                    {...props}

                />
                <ErrorMessage
                    className='text-red-500 text-xs italic'
                    name={props.name}
                    component="span"
                />
            </div>


        </>
    )
}