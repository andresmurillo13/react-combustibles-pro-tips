/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store";

export const PageButtons = ({ totalPages, currentPage }) => {
    const dispatch = useDispatch();

    const handlePageClick = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            dispatch(setCurrentPage(pageNumber));
        }
    };

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
        pageButtons.push(
            <div key={i}>
                <button
                    href="#"
                    className={`
                    flex items-center justify-center px-4 h-10 leading-tight
                    ${currentPage === i ? 'text-blue-800 border border-gray-300 bg-blue-100 hover:bg-blue-100  hover:text-blue-900 dark:bg-gray-900 dark:text-white' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}
                     dark:text-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white`}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </button>
            </div>
        );
    }

    const isPrevDisabled = currentPage == 1;
    const isNextDisabled = currentPage == totalPages;

    return (
        <>
            <div className="mx-auto m-6"

            >
                <ul className="inline-flex -space-x-px text-base h-10">

                    <button
                        className={`flex items-center justify-center px-4 h-10 leading-tight
                         text-gray-500 bg-white border border-e-0 border-gray-300
                         rounded-s-lg hover:bg-gray-100 hover:text-gray-700
                         dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
                         dark:hover:bg-gray-700 dark:hover:text-white
                         ${isPrevDisabled ? 'cursor-not-allowed' : ''}`}
                        onClick={() => handlePageClick(currentPage - 1)}
                        disabled={currentPage == 1}
                    >
                        Anterior
                    </button>
                    {pageButtons}
                    <button
                        className={`flex items-center justify-center px-4 h-10 leading-tight
                         text-gray-500 bg-white border border-gray-300 rounded-e-lg
                         hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800
                         dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700
                         dark:hover:text-white ${isNextDisabled ? 'cursor-not-allowed' : ''}`}
                        onClick={() => handlePageClick(currentPage + 1)}
                        disabled={currentPage == totalPages || totalPages == 0}
                    >
                        Siguiente
                    </button>

                </ul>
            </div>
        </>
    );
};
