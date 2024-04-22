/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Formik, Form } from 'formik'
import { MapBoxComponents, MyButton, MyDatePicker, MySelect, MyTextInput } from '.'
import * as Yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineCancel } from 'react-icons/md';
import { useEffect, useRef, useState } from 'react';
import { ButtonSendData, Header } from '../components';
import { useUiStore } from '../hooks';


export const DynamicFormCalendar = ({
    title,
    formJson,
    startSearchModel,
    closeModal,
    searchResults,
    errorMessage,
    activeEvent,
    onSubmit,
    resetSearch
}) => {


    const formRef = useRef();
    const initialValues = {};
    const requiredFields = {}

    const [formValues, setFormValues] = useState(initialValues);
    const [formSubmitted, setFormSubmitted] = useState();

    const { openMapModal, isMapModalOpen, closeMapModal } = useUiStore();


    useEffect(() => {
        if (activeEvent !== null) {
            const updatedValues = { ...initialValues, ...activeEvent };
            setFormValues(updatedValues);
        }
    }, [activeEvent]);


    for (const input of formJson) {
        initialValues[input.name] = input.value;

        if (!input.validations) continue;

        let schema = Yup.string();
        let schemaDate = Yup.date();

        if (!(activeEvent && (input.name === 'buscar' || input.name === 'results'))) {
            for (const rule of input.validations) {
                if (rule.type === "required") {
                    schema = schema.required('Este campo es requerido');
                }
                if (errorMessage !== undefined && rule.results === true) {

                    schema = schema.test({
                        message: errorMessage,
                        test: () => {
                            resetSearch()
                            return false;
                        }
                    });
                }
                if (rule.type === "required") {
                    schemaDate = schemaDate.required('La fecha es obligatoria');
                }

                if (rule.type === 'minLength') {
                    schema = schema.min((rule).value || 2, `Mínimo de ${(rule).value || 2} caracteres`);
                }
                if (rule.type === 'email') {
                    schema = schema.email(`Revise el formato del email`);
                }

            }
        }
        requiredFields[input.name] = schema;
    }

    const validationSchema = Yup.object({ ...requiredFields });

    const handleSubmit = () => {
        formRef.current.submitForm();
    };

    const onClickButton = () => {
        openMapModal();
    }
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
                        resetForm();
                        await onSubmit(values);
                        setFormSubmitted(false);
                    }}
                    innerRef={formRef}
                >
                    {
                        ({ formik }) => {
                            return (
                                <Form className='grid grid-cols-3 gap-1 '>


                                    {formJson.map(({ type, label, name, placeholder, options }) => {
                                        if (activeEvent && (name === 'buscar' || name === 'results')) {
                                            return null;
                                        }
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
                                        } else if (type === 'date') {
                                            return (
                                                <MyDatePicker
                                                    key={name}
                                                    type={type}
                                                    label={label}
                                                    name={name}
                                                />
                                            )
                                        } else if (type === 'button') {
                                            return (
                                                <MyButton
                                                    key={name}
                                                    label={label}
                                                    onClick={onClickButton}
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
                <ButtonSendData
                    activeEvent={activeEvent}
                    formSubmitted={formSubmitted}
                    handleSubmit={handleSubmit}
                />
            </div>
            <MapBoxComponents
                closeModal={closeMapModal}
                isModalOpen={isMapModalOpen}
            />
        </>
    )
}
