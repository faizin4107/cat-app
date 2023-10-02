import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../../../components/ui/Card";
import Icon from "../../../components/ui/Icon";
import Tooltip from "../../../components/ui/Tooltip";
import { useGetDataMutation } from "../../../store/api/app/appSlice";
import Button from "../../../components/ui/Button";
import baseurl from "../../../constant/baseurl";

import {
    useTable,
    useRowSelect,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import { useEffect } from "react";
import { handleDelete } from "../../components/delete-data";
var id = 0;
const COLUMNS = [
    //   {
    //     Header: "No",
    //     accessor: "id",
    //     Cell: (row) => {
    //         id += 1;

    //         let data = row.rows.map((item, i) => {
    //             return item.index;
    //             // console.log('rows', item.index + 1)
    //         })

    //         // for(var i = 0; i < row.rowsById.length; i++){
    //             console.log('rows',id)
    //         //     id = data[i];
    //         // }
    //         let minus = row?.cell?.value - 1;
    //         // console.log('minus', minus)

    //         // return <span>{row.rows.index}</span>;
    //         return (
    //             <>
    //             {
    //             row.rows.map((item, i) => {
    //                 return <span>{item[i]}</span>
    //             })
    //         }
    //             </>
    //         )
    //     },
    //   },
    {
        Header: "Soal CAT",
        accessor: "soal_cat",
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },
    {
        Header: "Gambar",
        accessor: "gambar",
        Cell: (row) => {
            return (
                <div>
                    <span className="inline-flex items-center">
                        <span className="w-12 h-12 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
                            {row?.cell?.value === 'null' ? null : (
                                <img
                                    src={`${baseurl.imageurl}/${row?.cell?.value}`}
                                    alt=""
                                    className="object-cover w-full h-full rounded-full"
                                />
                            )}

                        </span>
                        {/* <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
              {row?.cell?.value.name}
            </span> */}
                    </span>
                </div>
            );
        },
    },
    {
        Header: "Pilihan Jawaban",
        accessor: "pilihan_jawaban",
        Cell: (row) => {
            const json = JSON.parse(row?.cell?.value);
            console.log('json', json)
            let list = [];
            for(var i = 0; i < json.length; i++){
                list.push(json[i].value);
            }
            console.log('list', list)
            return <span>{JSON.stringify(list)}</span>;
        },
    },
    {
        Header: "Kunci Jawaban",
        accessor: "kunci_jawaban",
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },
    {
        Header: "Timer",
        accessor: "timer",
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },
    {
        Header: "Sesi",
        accessor: "sesi",
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },
    {
        Header: "action",
        accessor: "action",
        Cell: (row) => {
            return (
                <div className="flex space-x-3 rtl:space-x-reverse">
                    <Tooltip content="Edit" placement="top" arrow animation="shift-away">
                        <Link className="action-btn" to={`/edit-tes-psikologi/${row?.cell?.row.original.id}`} state={row?.cell?.row.original}><Icon icon="heroicons:pencil-square" /></Link>
                    </Tooltip>
                    <Tooltip
                        content="Delete"
                        placement="top"
                        arrow
                        animation="shift-away"
                        theme="danger"
                    >

                        <button className="action-btn" type="button" onClick={() => handleDelete(row?.cell?.row.original.id, 'tes-psikologi')}>
                            <Icon icon="heroicons:trash" />
                        </button>
                    </Tooltip>
                </div>
            );
        },
    },
];


const TesPsikologiTable = ({ title = "Soal Tes Psikologi" }) => {
    const [data, setData] = useState([]);
    const [getData, { isLoading, isError, error, isSuccess }] = useGetDataMutation();
    const columns = useMemo(() => COLUMNS, []);

    useEffect(() => {
        async function fetchData() {
            const response = await getData('/tes-psikologi');
            setData(response.data.data);
        }
        fetchData();
    }, [])

    const tableInstance = useTable(
        {
            columns,
            data,
        },

        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,

        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: "selection",
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            {/* <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} /> */}
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            {/* <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} /> */}
                        </div>
                    ),
                },
                ...columns,
            ]);
        }
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        setGlobalFilter,
        prepareRow,
    } = tableInstance;

    const { globalFilter, pageIndex, pageSize } = state;
    return (
        <>
            <Card>
                <div className="md:flex justify-between items-center mb-6">
                    <h4 className="card-title">{title}</h4>
                    <Button text="Create Tes Psikologi" className="btn-primary btn-sm" icon="heroicons-outline:newspaper" link="/create-tes-psikologi" />
                </div>
                <div className="overflow-x-auto -mx-6">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table
                                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                                {...getTableProps}
                            >
                                <thead className="bg-slate-200 dark:bg-slate-700">
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            <>
                                                <th scope="col" className=" table-th "><span>No</span></th>
                                                {headerGroup.headers.map((column) => (
                                                    <th
                                                        {...column.getHeaderProps(
                                                            column.getSortByToggleProps()
                                                        )}
                                                        scope="col"
                                                        className=" table-th "
                                                    >
                                                        {column.render("Header")}
                                                        <span>
                                                            {column.isSorted
                                                                ? column.isSortedDesc
                                                                    ? " 🔽"
                                                                    : " 🔼"
                                                                : ""}
                                                        </span>
                                                    </th>
                                                ))}
                                            </>

                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                                    {...getTableBodyProps}
                                >
                                    {page.map((row, number) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()}>
                                                <>
                                                    <td className="table-td">{number + 1}</td>
                                                    {row.cells.map((cell) => {
                                                        return (
                                                            <td {...cell.getCellProps()} className="table-td">
                                                                {cell.render("Cell")}
                                                            </td>
                                                        );
                                                    })}
                                                </>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            className="form-control py-2 w-max"
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                        >
                            {[10, 25, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Page{" "}
                            <span>
                                {pageIndex + 1} of {pageOptions.length}
                            </span>
                        </span>
                    </div>
                    <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                            >
                                <Icon icon="heroicons:chevron-double-left-solid" />
                            </button>
                        </li>
                        <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                Prev
                            </button>
                        </li>
                        {pageOptions.map((page, pageIdx) => (
                            <li key={pageIdx}>
                                <button
                                    href="#"
                                    aria-current="page"
                                    className={` ${pageIdx === pageIndex
                                            ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                                            : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                                        }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                                    onClick={() => gotoPage(pageIdx)}
                                >
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                        <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                Next
                            </button>
                        </li>
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                                className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                <Icon icon="heroicons:chevron-double-right-solid" />
                            </button>
                        </li>
                    </ul>
                </div>
                {/*end*/}
            </Card>
        </>
    );
};

export default TesPsikologiTable;
