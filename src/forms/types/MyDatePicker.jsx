/* eslint-disable react/prop-types */
import { ErrorMessage, useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import { addHours } from 'date-fns';
import { useEffect } from 'react';



export const MyDatePicker = ({ label, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const [field] = useField(props);


    useEffect(() => {
        if (field.name === "start" && !field.value) {
            setFieldValue(props.name, new Date());
        }
        if (field.name === "end" && !field.value) {
            setFieldValue(props.name, addHours(new Date(), 2));
        }
    }, [field.name, field.value, props.name, setFieldValue]);


    const handleDateChange = (date) => {
        setFieldValue(props.name, date);
    };

    return (
        <>
            <div className='bg-white rounded px-8 pt-6 pb-2'>
                <label
                    className='block text-gray-700 text-sm font-bold mb-1'
                    htmlFor={props.id || props.name}
                >
                    {label}
                </label>
                <div >
                    <DatePicker
                        {...field}
                        {...props}
                        selected={field.value}
                        onChange={handleDateChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        dateFormat="Pp"
                        timeFormat="hh:mm aa"
                        showTimeSelect
                        timeIntervals={15}
                        locale="es"
                        timeCaption="Hora"
                    />
                </div>

                <ErrorMessage
                    className='text-red-500 text-xs italic'
                    name={props.name}
                    component="span"
                />
            </div>
        </>
    );
};