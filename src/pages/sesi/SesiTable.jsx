import React, { useState, useMemo } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import { useGetDataMutation } from "@/store/api/app/appSlice";
import Breadcrumbschild from "@/components/ui/Breadcrumbschild";

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
    Header: "Nama Sesi CAT",
    accessor: "nama_sesi_cat",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Tanggal",
    accessor: "tanggal",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Waktu Pengerjaan",
    accessor: "waktu_pengerjaan",
    Cell: (row) => {
      return <span>{row?.cell?.value} Menit</span>;
    },
  },
  {
    Header: "status",
    accessor: "status",
    Cell: (row) => {
      return (
        <span className="block w-full">
          <span
            className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${row?.cell?.value === "Aktif"
              ? "text-success-500 bg-success-500"
              : ""
              } 
            ${row?.cell?.value === "Tidak"
                ? "text-warning-500 bg-warning-500"
                : ""
              }
            ${row?.cell?.value === "Tidak Aktif"
                ? "text-danger-500 bg-danger-500"
                : ""
              }
            
             `}
          >
            {row?.cell?.value}
          </span>
        </span>
      );
    },
  },
  {
    Header: "action",
    accessor: "action",
    Cell: (row) => {
      // const navigate = useNavigate();
      const location = useLocation();
      const propsData = location.state;
      const [state, setState] = useState()
      useEffect(() => {
        if (propsData.propsData !== undefined) {
          setState(propsData)
        } else {
          const data = {
            'sesi': row?.cell?.row.original
          }
          setState({ propsData, ...data })
        }
      }, [])
      console.log('props sesi tes', state)

      const data = {
        'sesi': row?.cell?.row.original
      }
      return (
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Tooltip content="View Soal" placement="top" arrow animation="shift-away">
            <Link className="action-btn" to={`/cat/${row?.cell?.row.original.id}`} state={state}><Icon icon="heroicons:eye" /></Link>
            {/* <button className="action-btn" type="button" onClick={() => dispatch(editKelolaTest(row.data[0]))}>
              <Icon icon="heroicons:pencil-square" />
            </button> */}
          </Tooltip>
          <Tooltip content="View Peraturan" placement="top" arrow animation="shift-away">
            <Link className="action-btn" to={`/peraturan/${row?.cell?.row.original.id}`} state={state}><Icon icon="heroicons:eye" /></Link>
            {/* <button className="action-btn" type="button" onClick={() => dispatch(editKelolaTest(row.data[0]))}>
              <Icon icon="heroicons:pencil-square" />
            </button> */}
          </Tooltip>
          <Tooltip content="Edit" placement="top" arrow animation="shift-away">
            <Link className="action-btn" to={`/edit-sesi/${row?.cell?.row.original.id}`} state={[propsData, data]}><Icon icon="heroicons:pencil-square" /></Link>
            {/* <button className="action-btn" type="button" onClick={() => dispatch(editKelolaTest(row.data[0]))}>
              <Icon icon="heroicons:pencil-square" />
            </button> */}
          </Tooltip>
          <Tooltip
            content="Delete"
            placement="top"
            arrow
            animation="shift-away"
            theme="danger"
          >

            <button className="action-btn" type="button" onClick={() => handleDelete(row?.cell?.row.original.id, 'kelola-sesi')}>
              <Icon icon="heroicons:trash" />
            </button>
          </Tooltip>
        </div>
      );
    },
  },
];


const SesiTable = () => {
  const [data, setData] = useState([]);
  const [getData, { isLoading, isError, error, isSuccess }] = useGetDataMutation();
  const columns = useMemo(() => COLUMNS, []);
  const params = useParams();
  const location = useLocation();
  const propsData = location.state;
  const [title, setTitle] = useState('');

  // const data = [];
  useEffect(() => {
    console.log('prosp 2', propsData);
    if (propsData.propsData === undefined) {
      console.log('from kelola tes', propsData[0])
      setTitle(propsData[0].nama_tes_cat);
      async function fetchData() {
        // You can await here
        const response = await getData(`/kelola-sesi/${params.id}`);
        console.log('response sesi', response)
        setData(response.data.data);
        // ...
      }
      fetchData();
    } else {
      setTitle(propsData.propsData[0].nama_tes_cat);
      console.log('from cat', propsData)
      async function fetchData() {
        // You can await here
        const response = await getData(`/kelola-sesi/${propsData.propsData[0].id}`);
        console.log('response sesi', response)
        setData(response.data.data);
        // ...
      }
      fetchData();
    }
    // console.log('propsdata from cat', propsData);
    // console.log('propsdata from cat params', params);

  }, [])
  // const data = useMemo(async() => {
  //   const response = await getKelolaTest();
  //   console.log('response', response.data.data)
  //   return response.data.data;
  // }, []);

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
          <Breadcrumbschild menu={{ currentMenu: 'Kelola Tes/' + title, path: `/kelola-tes`, childMenu: 'Kelola Sesi' }} />
          <Link className="btn-primary btn-sm btn btn inline-flex justify-center" to={`/create-sesi/${params.id}`} state={propsData}>
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

export default SesiTable;
