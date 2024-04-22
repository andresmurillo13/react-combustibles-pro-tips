/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useEquipmentStore, useSearchTerm, useUiStore } from "../hooks"
import { useSelector } from "react-redux"
import { ButtonOpenModals, Footer, Header, PageButtons, PageInformation, ReactModal, SearchInput, Table } from "../components";
import { Loader } from "../router/components/Loader";
import { FaCircle } from "react-icons/fa";
import { DynamicForm } from "../forms";
import { useDispatch } from "react-redux"
import { onDesasctiveEquipment } from "../store";
import formJson from '../forms/data/equipment-form.json';

export const EquipmentPage = () => {

    const dispatch = useDispatch();
    const { activeEquipment, setActiveEquipment, startLoadingEquipment, isLoadingEquipments, equipments, startSavingEquipments } = useEquipmentStore();
    const { startSearchEquipment, searchResults, searchTerm, searchPerformed, totalResults, errorMessage } = useSearchTerm();
    const { currentColor } = useStateContext();
    const { currentPage, totalPages, limit, totalItems } = useSelector(state => state.pages);

    useEffect(() => {
        startLoadingEquipment(limit, currentPage)
    }, [currentPage])

    const onSelect = (event) => {
        setActiveEquipment(event)

    }
    const { openDateModal, isDateModalOpen, closeDateModal } = useUiStore();


    const columnas = ['Nombre', 'Placa', 'Modelo', 'Km', '#Motor', 'Estado']

    const closeModalEquipment = () => {
        closeDateModal();
        dispatch(onDesasctiveEquipment())
    }

    const onSubmit = async (values) => {
        await startSavingEquipments(values)
    }


    return (
        <>
            {
                isLoadingEquipments ? (
                    <Loader />
                ) : (
                    <div className="flex flex-col">
                        <>
                            <Header
                                totalItems={totalItems}
                                title={'Equipos'} />
                            <PageInformation
                                searchPerformed={searchPerformed}
                                error={errorMessage}
                                searchTerm={searchTerm}
                                total={totalResults}

                            />
                            <SearchInput
                                placeholder={'Buscar equipos...'}
                                startSearch={startSearchEquipment}
                                searchResults={searchResults}
                                searchTerm={searchTerm}
                                searchPerformed={searchPerformed}
                            />

                            < Table
                                onDoubleClick={openDateModal}
                                terminosEncontrados={searchResults}
                                activeElement={activeEquipment}
                                searchPerformed={searchPerformed}
                                onSelect={onSelect}
                                datos={equipments}
                                keyProp={(employeed) => employeed.id}
                                columnas={columnas}
                                filas={[
                                    'name',
                                    'placa',
                                    'modelo',
                                    'kilometraje',
                                    'numeroMotor',
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

                        <ReactModal
                            isDateModalOpen={isDateModalOpen}
                            closeModalCalendar={closeModalEquipment}
                        >

                            <DynamicForm
                                formJson={formJson}
                                onSubmit={onSubmit}
                                activeEvent={activeEquipment}
                                closeModal={closeModalEquipment}
                                title={'Registra un equipo'}
                            />
                        </ReactModal>

                        <ButtonOpenModals
                            openModal={openDateModal} />
                    </div>

                )
            }


        </>
    )
}
export default EquipmentPage;