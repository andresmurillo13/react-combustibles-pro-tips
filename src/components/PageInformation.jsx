/* eslint-disable react/prop-types */





export const PageInformation = ({ searchPerformed, searchTerm, total, error }) => {
    return (
        <>
            <div className="mx-auto w-11/12">
                {searchPerformed ? (
                    total === 0 ? (
                        <div className="text-lg text-gray-400">
                            {total === 0 ? (
                                <b>{error}</b>
                            ) : (
                                null
                            )}
                        </div>
                    ) : (
                        <div className="text-lg text-gray-400">
                            <b>Elementos encontrados con el término <b>{searchTerm}</b> : {total}</b>
                        </div>
                    )
                ) : (
                    null
                )}
            </div>

        </>
    )
}
