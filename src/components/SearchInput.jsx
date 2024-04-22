/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { IoMdSearch } from "react-icons/io";
import { useDispatch } from "react-redux"
import { resetSearch, setSearchPerformed, setSearchTerm } from "../store";
import { FaTimes } from "react-icons/fa";

export const SearchInput = ({
    startSearch,
    searchPerformed,
    searchTerm,
    placeholder
}) => {



    const dispatch = useDispatch();




    const handleSearchClick = () => {
        if (searchTerm) {
            startSearch(searchTerm)
            dispatch(setSearchPerformed(true))
        }
    };
    const handleClearInput = () => {
        dispatch(resetSearch())
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleSearchClick();
        }
    };



    return (

        <form className="mx-auto m-4 w-11/12">
            <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <IoMdSearch size={'1.3rem'} />
                </div>
                <input
                    type="text"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    disabled={searchPerformed}
                    value={searchTerm}
                    onChange={event => dispatch(setSearchTerm(event.target.value))}
                />
                {
                    searchPerformed ? (
                        <span
                            className="absolute inset-y-0 right-1 flex items-center pr-3"
                            onClick={handleClearInput}

                        >
                            <FaTimes color="red" fontSize="15px" />
                        </span>
                    ) : (
                        <button
                            type="button"
                            className="text-white absolute end-2.5 bottom-2.5
                    bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:outline-none
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600
                    dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleSearchClick}

                        >Buscar
                        </button>
                    )
                }

            </div>
        </form>

    )
}
