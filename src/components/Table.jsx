/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import classnames from 'classnames';

export const Table = ({
    columnas,
    filas,
    activeElement,
    datos,
    onSelect,
    onDoubleClick,
    searchPerformed,
    terminosEncontrados,
    keyProp,
    ...rest
}) => {

    const hideOnSmallClass = 'hide-on-small';
    const hideOnMediumClass = 'hide-on-medium';



    return (
        <>

            <table
                className="mx-auto text-left w-11/12 dark:text-white"
            >
                <thead
                    style={{ background: rest.currentColor }}
                >
                    <tr className="">
                        <th className="px-3.5 py-2 font-bold hide-on-small">N°</th>
                        {columnas.map((columna, index) => (


                            <th
                                className={classnames('px-3.5 py-2', {
                                    [hideOnSmallClass]: rest.hideOnSmallColumns.includes(index),
                                    [hideOnMediumClass]: rest.hideOnMediumColumns.includes(index),
                                })}
                                key={index}
                            >

                                <b>{columna}</b>
                            </th>
                        ))}

                    </tr>

                </thead>
                <tbody >

                    {
                        searchPerformed ? terminosEncontrados.map((dato, i) => (

                            <tr
                                key={keyProp(dato)}
                                onClick={() => onSelect(dato)}
                                onDoubleClick={() => onDoubleClick(dato)}
                                className={`
                                ${i % 2 === 0 ? "bg-gray-50 dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-800"}`}
                                style={dato === activeElement ? { background: rest.currentColor } : {}}

                            >
                                <td className="px-3.5 py-2 hide-on-small">
                                    {i + 1}
                                </td>
                                {filas.map((columna, index) => (

                                    <td key={index}
                                        className={classnames('px-3.5 py-2 dark:text-gray-300', {
                                            [hideOnSmallClass]: rest.hideOnSmallColumns.includes(index),
                                            [hideOnMediumClass]: rest.hideOnMediumColumns.includes(index),
                                        })}
                                        style={rest.filasStyle && rest.filasStyle(columna, dato)}
                                    >
                                        {typeof columna === 'function' ? (
                                            Array.isArray(columna(dato)) ? (
                                                <ul>
                                                    {columna(dato).map((value, index) => (
                                                        <li key={index}>{value}</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <span>
                                                    {columna(dato)}
                                                </span>
                                            )
                                        ) : (
                                            <span>
                                                {dato[columna]}
                                            </span>
                                        )}
                                    </td>
                                ))}
                            </tr>


                        )) : datos.map((dato, i) => (

                            < tr
                                key={keyProp(dato)}
                                onClick={() => onSelect(dato)}
                                onDoubleClick={() => onDoubleClick(dato)}
                                className={`
                                ${i % 2 === 0 ? "bg-gray-50 dark:bg-gray-700" : "bg-gray-200 dark:bg-gray-800"}`}
                                style={dato === activeElement ? { background: rest.currentColor } : {}}
                            >
                                <td className="px-3.5 py-2 hide-on-small ">
                                    {i + 1}
                                </td>
                                {filas.map((columna, index) => {


                                    return (

                                        <td key={index}
                                            className={classnames('px-3.5 py-2 dark:text-gray-300', {
                                                [hideOnSmallClass]: rest.hideOnSmallColumns.includes(index),
                                                [hideOnMediumClass]: rest.hideOnMediumColumns.includes(index),
                                            })}
                                            style={rest.filasStyle && rest.filasStyle(columna, dato)}
                                        >
                                            {typeof columna === 'function' ? (
                                                Array.isArray(columna(dato)) ? (
                                                    <ul>
                                                        {columna(dato).map((value, index) => (
                                                            <li key={index}>{value}</li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <span>
                                                        {columna(dato)}
                                                    </span>
                                                )
                                            ) : (
                                                <span>
                                                    {dato[columna]}
                                                </span>
                                            )}
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                </tbody>
            </table >

        </>


    );

}
