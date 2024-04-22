/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { ButtonDeleteEvents, ButtonOpenModals, ButtonSettings, Footer, Header, PageButtons, PageInformation, ReactModal, SearchInput, Table } from "../components";
import { DynamicFormEmployees } from "../forms";
import { FaCircle } from "react-icons/fa";
import { Loader } from "../router/components/Loader";
import { onDesactiveEmployeed } from "../store";
import { useAuthStore, useSearchTerm, useUiStore } from "../hooks"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useStateContext } from "../contexts/ContextProvider"
import formJson from '../forms/data/employees-form.json';
import Swal from 'sweetalert2';

export const EmployeesPage = () => {


    const dispatch = useDispatch();
    const { currentColor, activeMenu } = useStateContext();
    const { currentPage, totalPages, limit, totalItems } = useSelector(state => state.pages);
    const {
        employees,
        activeEmployeed,
        startLoadingUsers,
        isLoadingEmployees,
        setActiveEmployeed,
        startRegister,
        hasEmpleadoSelected,
        startDeletingEmpleados,
    } = useAuthStore();

    const {
        startSearchEmployees,
        searchResults,
        searchTerm,
        searchPerformed,
        totalResults,
        errorMessage
    } = useSearchTerm();

    const { openDateModal, closeDateModal, isDateModalOpen } = useUiStore()


    useEffect(() => {
        startLoadingUsers(limit, currentPage)
    }, [currentPage])

    const onSelect = (event) => {
        setActiveEmployeed(event)

    }

    const onDoubleClick = () => {
        openDateModal()
    }


    const closeModalEmployees = () => {
        closeDateModal()
        dispatch(onDesactiveEmployeed())
    }

    const onSubmit = async (values) => {

        const { selectRoles, password2, ...send } = values

        if (send.password !== password2) {
            Swal.fire('Error en el registro', 'Contraseñas no coinciden', 'error');
            return;
        }
        await startRegister(send);
    

    }


    const columnas = ['Nombre Completo', 'Correo Electronico', 'Estado', 'Cargo', 'Telefono']


    return (
        <>
            {
                isLoadingEmployees ? (
                    <Loader />
                ) : (
                    <div className="flex flex-col">
                        <>
                            <Header
                                totalItems={totalItems}
                                title={'Usuarios'} />
                            <PageInformation
                                searchPerformed={searchPerformed}
                                error={errorMessage}
                                searchTerm={searchTerm}
                                total={totalResults}

                            />
                            <SearchInput
                                placeholder={'Buscar empleados...'}
                                startSearch={startSearchEmployees}
                                searchResults={searchResults}
                                searchTerm={searchTerm}
                                searchPerformed={searchPerformed}
                            />

                            < Table
                                terminosEncontrados={searchResults}
                                activeElement={activeEmployeed}
                                onDoubleClick={onDoubleClick}
                                searchPerformed={searchPerformed}
                                onSelect={onSelect}
                                datos={employees}
                                keyProp={(employeed) => employeed.id}
                                columnas={columnas}
                                filas={[
                                    'fullName',
                                    'email',

                                    (item) => item.isActive ? (
                                        <div className="flex items-center">
                                            <FaCircle color="#86E598" className="rounded-full" />
                                            <p className="p-1">On</p>
                                        </div>

                                    ) : (
                                        <div className="flex items-center ">
                                            <FaCircle color="#FF6D6D" className="rounded-full" />
                                            <p className="p-1 ">Off</p>
                                        </div>
                                    ),
                                    'cargo',
                                    'telefono'
                                ]}
                                currentColor={currentColor}
                                hideOnSmallColumns={[]}
                                hideOnMediumColumns={[1, 3, 5]}
                            />


                            {!searchPerformed && (
                                <>
                                    <PageButtons
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                    />

                                    <Footer />
                                </>

                            )}
                        </>

                        <ButtonOpenModals
                            openModal={openDateModal}
                        />

                        <ReactModal
                            isDateModalOpen={isDateModalOpen}
                            closeModalCalendar={closeModalEmployees}
                        >
                            <DynamicFormEmployees
                                formJson={formJson}
                                closeModal={closeModalEmployees}
                                onSubmit={onSubmit}
                                activeEvent={activeEmployeed}
                                title={'Registra un usuario'}
                            />

                        </ReactModal>
                        <ButtonDeleteEvents
                            hasSelected={hasEmpleadoSelected}
                            activeMenu={activeMenu}
                            startDeleting={startDeletingEmpleados}

                        />
                        <ButtonSettings />

                    </div>

                )
            }


        </>
    )
}

export default EmployeesPage