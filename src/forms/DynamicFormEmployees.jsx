/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import 'react-datepicker/dist/react-datepicker.css';
import { ButtonSendData, Header } from '../components';
import { Formik, Form, FieldArray } from 'formik'
import { MyInputArray, MySelect, MyTextInput } from '.'
import { MdOutlineCancel } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

export const DynamicFormEmployees = ({
    title,
    formJson,
    startSearchModel,
    closeModal,
    searchResults,
    activeEvent,
    onSubmit,

}) => {

    const formRef = useRef();

    const initialValues = {};
    const requiredFields = {}

    const [formValues, setFormValues] = useState(initialValues);
    const [formSubmitted, setFormSubmitted] = useState();



    useEffect(() => {
        if (activeEvent !== null) {
            const updatedValues = { ...initialValues, ...activeEvent };
            setFormValues(updatedValues);
        }
    }, [activeEvent]);


    for (const input of formJson) {
        initialValues[input.name] = input.value

        if (!input.validations) continue;

        let schema = Yup.string()


        for (const rule of input.validations) {
            if (rule.type === "required") {
                schema = schema.required('Este campo es requerido');
            }
            if (rule.type === "array") {
                schema = Yup.array().of(Yup.string()).required('Roles es requerido');
            }

            if (rule.type === 'minLength') {
                schema = schema.min((rule).value || 2, `Mínimo de ${(rule).value || 2} caracteres`);
            }
            if (rule.type === 'email') {
                schema = schema.email(`Revise el formato del email`);
            }
        }

        requiredFields[input.name] = schema;
    }

    const validationSchema = Yup.object({
        ...requiredFields,

    });


    const handleSubmit = () => {
        formRef.current.submitForm();

    };



    return (
        <>
            <div >
                <button
                    type="button"
                    onClick={() => closeModal()}
                    style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
                    className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray float-right"
                >
                    <MdOutlineCancel className='hover:text-red-500' />
                </button>
                <h1 className='text-center font-bold text-2xl pb-5 pt-5'>{activeEvent ? null : title}</h1>

                <Header
                    totalItems={formValues?.user}
                    title={formValues?.equipment}
                />



                <Formik
                    initialValues={formValues}
                    validationSchema={validationSchema}
                    enableReinitialize={true}
                    onSubmit={async (values, { resetForm }) => {
                        setFormSubmitted(true);
                        await onSubmit(values);
                        resetForm();
                        closeModal();
                        setFormSubmitted(false);
                    }}
                    innerRef={formRef}
                >
                    {
                        ({ formik, values }) => {
                            return (
                                <Form className='grid grid-cols-3 gap-1 '>
                                    {formJson.map(({ type, label, name, placeholder, options }) => {

                                        if (type === 'input' || type === 'password' || type === 'email' || type === 'number' || type === 'search' || type === "password" || type === "tel") {
                                            return (
                                                <MyTextInput
                                                    key={name}
                                                    type={type}
                                                    name={name}
                                                    label={label}
                                                    placeholder={placeholder}
                                                    startSearchModel={startSearchModel}
                                                />
                                            )
                                        } else if (type === 'select') {
                                            return (
                                                <MySelect
                                                    key={name}
                                                    type={type}
                                                    name={name}
                                                    label={label}
                                                >
                                                    <option value="">Select an option</option>
                                                    {
                                                        options ?
                                                            options.map(opt => (
                                                                <option key={opt.id} value={opt.value}>{opt.label}</option>
                                                            )) :
                                                            searchResults?.map(opt => (
                                                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                                                            ))
                                                    }
                                                </MySelect>
                                            )

                                        } else if (type === 'roles') {
                                            return (

                                                <FieldArray
                                                    key={type}
                                                    name={name}
                                                    render={({ remove, form }) => (
                                                        <>
                                                            {form.values.roles.map((role, index) => (
                                                                <MyInputArray
                                                                    key={index}
                                                                    value={role}
                                                                    name={name}
                                                                    remove={remove}
                                                                />
                                                            ))}
                                                        </>


                                                    )}
                                                />
                                            )
                                        }

                                        throw new Error(`El type :${type}, no es soportado`)
                                    })}

                                </Form>
                            )
                        }
                    }
                </Formik>
            </div>
            <ButtonSendData
                activeEvent={activeEvent}
                formSubmitted={formSubmitted}
                handleSubmit={handleSubmit}
            />

        </>
    )
}
