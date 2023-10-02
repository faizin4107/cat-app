import React, { useState, useMemo } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import Card from "../../components/ui/Card";
import Icon from "../../components/ui/Icon";
import Tooltip from "../../components/ui/Tooltip";
import { useGetDataMutation } from "../../store/api/app/appSlice";
// import Button from "../../components/ui/Button";
import baseurl from "../../constant/baseurl";
import Breadcrumbschild from "../../components/ui/Breadcrumbschild";
// import { useImageViewer } from 'react-image-viewer-hook'

import {
    useTable,
    useRowSelect,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import { useEffect } from "react";
import { handleDelete } from "../components/delete-data";
import Loading from "../../components/Loading";

const COLUMNS = [
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
                            {row?.cell?.value === '' ? null : (
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
        Header: "Video / Audio",
        accessor: "video",
        Cell: (row) => {
            return (
                <div>
                    <span className="inline-flex items-center">
                        <span className="w-15 h-15 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
                            {row?.cell?.value === null || row?.cell?.value === '' || row?.cell?.value === 'null' ? null : (
                                <video class="" id="player" playsinline="playsinline" controls="controls" data-poster="https://vjs.zencdn.net/v/oceans.png">
                                <source src={`${baseurl.imageurl}/${row?.cell?.value}`} type="video/mp4" />
                            </video>
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
    // {
    //     Header: "Pilihan Jawaban",
    //     accessor: "pilihan_jawaban",
    //     Cell: (row) => {
    //         const json = JSON.parse(row?.cell?.value);
    //         // console.log('json', json)
    //         let list = [];
    //         for (var i = 0; i < json.length; i++) {
    //             list.push(json[i].value);
    //         }
    //         // console.log('list', list)
    //         return <span>{JSON.stringify(list)}</span>;
    //     },
    // },
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
            if (row?.cell?.value === null) {
                return <span></span>
            } else {
                return <span>{row?.cell?.value} Menit</span>
            }



        },
    },
    {
        Header: "action",
        accessor: "action",
        Cell: (row) => {
            const location = useLocation();
            const propsData = location.state;
            // const params = useParams();
            // const [state, setState] = useState();
            // const [tesId, setTesId] = useState();
            // const [sesiId, setSesiId] = useState();
            // console.log('indofen', propsData)
            // useEffect(() => {

            //     if(propsData.tes !== undefined){
            //         console.log('1 tes', propsData);
            //         delete propsData.tes

            //         const data = {
            //             'tes': row?.cell?.row.original
            //         }
            //         setState({propsData, ...data})
            //         setTesId(propsData.propsData.propsData[0].id);
            //         setSesiId(propsData.propsData.sesi.id);
            //         return;
            //     }else{
            //         console.log('2 tes', propsData);

            //         const data = {
            //             'tes': row?.cell?.row.original
            //         }
            //         setState({propsData, ...data})
            //         setTesId(propsData.propsData[0].id);
            //         setSesiId(propsData.sesi.id);
            //         return;
            //     }
            //     console.log('props cat', propsData)

            // }, [0])
            const data = {
                'tes': row?.cell?.row.original
            }
            // console.log('props tes', propsData)
            return (
                <div className="flex space-x-3 rtl:space-x-reverse">
                    <Tooltip content="View Pilihan Jawaban" placement="top" arrow animation="shift-away">
                        <Link className="action-btn" to={`/pilihan-jawaban/${row?.cell?.row.original.id}`} state={[propsData, data]}><Icon icon="heroicons:eye" /></Link>
                    </Tooltip>
                    <Tooltip content="Edit" placement="top" arrow animation="shift-away">
                        <Link className="action-btn" to={`/edit-tes-cat/${propsData.propsData[0].id}/${propsData.sesi.id}`}
                            state={[propsData, data]}>
                            <Icon icon="heroicons:pencil-square" /></Link>
                    </Tooltip>
                    <Tooltip
                        content="Delete"
                        placement="top"
                        arrow
                        animation="shift-away"
                        theme="danger"
                    >

                        <button className="action-btn" type="button" onClick={() => handleDelete(row?.cell?.row.original.id, 'soal-cat')}>
                            <Icon icon="heroicons:trash" />
                        </button>
                    </Tooltip>
                </div>
            );
        },
    },
];


const CATTable = () => {

    const [data, setData] = useState([]);
    const [getData, { isLoading, isError, error, isSuccess }] = useGetDataMutation();
    const columns = useMemo(() => COLUMNS, []);
    const params = useParams();
    const location = useLocation();
    const propsData = location.state;
    const [props, setProps] = useState();
    // const propsData2 = location.props1;

    // const test = useFetcher();
    console.log('propsData', propsData)

    const [title, setTitle] = useState();
    const [tesId, setTesId] = useState();
    const [sesiId, setSesiId] = useState();
    useEffect(() => {

        if (propsData.tes !== undefined) {
            console.log('1', propsData);
            setProps(propsData.propsData);
            // setState(propsData)
            // setTitle();
            setTesId(propsData.propsData.propsData[0].id);
            setSesiId(propsData.propsData.sesi.id)
            async function fetchData() {
                const response = await getData(`/soal-cat/${propsData.propsData.propsData[0].id}/${propsData.propsData.sesi.id}`);
                console.log('response soal', response)
                setData(response.data.data);
            }
            fetchData();
        } else {
            setProps(propsData);
            console.log('2', propsData);
            // setTitle(propsData.propsData[0].nama_tes_cat);
            setTesId(propsData.propsData[0].id);
            setSesiId(propsData.sesi.id)
            console.log('test id', propsData.propsData[0].id);
            console.log('sesi id', propsData.sesi.id);
            async function fetchData() {
                const response = await getData(`/soal-cat/${propsData.propsData[0].id}/${params.id}`);
                console.log('response soal', response)
                setData(response.data.data);
            }
            fetchData();
            // setState({ propsData, ...data })
        }
        // setTitle("Soal " + propsData.propsData[0].nama_tes_cat + " : " + propsData.sesi.nama_sesi_cat);

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
                    {/* <h4 className="card-title">{title}</h4> */}
                    <Breadcrumbschild menu={{ currentMenu: `Kelola Sesi`, path: `/sesi/${sesiId}`, childMenu: 'Soal CAT', state: props }} />
                    {/* <Button text="Create Soal" className="btn-primary btn-sm" icon="heroicons-outline:newspaper" link={`/create-tes-cat/${propsData.propsData[0].id}/${params.id}`} /> */}

                    {/* <Icon icon="heroicons-outline:newspaper" className="ltr:mr-2 rtl:ml-2"/> */}
                    <Link className="btn-primary btn-sm btn btn inline-flex justify-center" to={`/create-tes-cat/${tesId}/${sesiId}`} state={propsData}>
                        <Icon icon="uiw:plus-square-o" className="ltr:mr-2 rtl:ml-2" /><span>Tambah</span>

                    </Link>

                </div>
                {isLoading ? (
                    <Loading />
                ) : (
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
                )}

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

export default CATTable;
