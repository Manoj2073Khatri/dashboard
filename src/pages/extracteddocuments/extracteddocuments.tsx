import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Spinner from 'react-bootstrap/Spinner';
import ExtractedDocumentData from '../../services/utils/dataTypes/configurationPageData';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { GlobalFilter } from '../../components/table/globalTableSearch/GlobalTableSearch';
import CustomBadge from '../../components/table/customBadge/CustomBadge';
import DocumentTableActions from './components/tableActions';
import CRUDServices from '../../services/crudService';
import Badge from 'react-bootstrap/Badge';

import type { RootState } from '../../reduxStore/store'
import { useSelector, useDispatch } from 'react-redux'
import { toasterToggleState } from '../../reduxStore/reducer/toastStateSlice'

const ExtractedDocuments = () => {

  const show = useSelector((state: RootState) => state.sidebarToggle.value)
  const dispatch = useDispatch()

  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [getResult, setGetResult] = useState<any | null>(null);
  const [tableBodyData, setTableBodyData] = useState<ExtractedDocumentData[]>([]);
  const [showData, setShowData] = useState<boolean>(false);
  const [refreshTable, setRefreshTable] = useState<any>(false);

  const { isLoading: isLoadingData, refetch: ExtractedDocumentTableData } = useQuery<any, Error>(
    "query-ExtractedDocumentTableData",
    async () => {
      return await CRUDServices.findAll('/processedDocument');
    },
    {
      enabled: false,
      onSuccess: (res: any) => {
        setTableBodyData(res?.data)
        //to reload page
        setRefreshTable(false);

      },
      onError: (err) => {
        setGetResult(err || err);
      },
    }
  );

  useEffect(() => {
    function getAllData() {
      try {
        ExtractedDocumentTableData();
      } catch (err: any) {
        setGetResult(err);
      }
    }
    getAllData();
    
    if (!isLoadingData) {
      setShowData(true)
    }

  }, [ExtractedDocumentTableData, getResult, isLoadingData, tableBodyData, refreshTable]);


  useEffect(() => {
    return () => {

    }
  }, [isSuccess])


  const refreshData = () => {
    setRefreshTable(true);
  }
  const data = useMemo(() => tableBodyData, [tableBodyData])
  const columns: any = useMemo(
    () => [
      {
        Header: 'File Name',
        accessor: 'fileName', // accessor is the "key" in the data
      },
      {
        Header: 'Document Type',
        accessor: 'documentType', // accessor is the "key" in the data
      },

      {
        Header: 'Last Updated',
        accessor: 'updatedAt',
        Cell: (props: { value: any }) => {
          const date = new Date(props.value);
          const formattedDate = date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })
          return formattedDate;
        },

      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: (props: { value: boolean }) => {
          if (props.value === true) {
            return <Badge bg="success">True</Badge>
          }
          else {
            return <Badge bg="danger">False</Badge>
          }
          
        },
      },
      {
        Header: 'Extracted Status',
        accessor: 'extractedStatus',
        Cell: (props: { value: boolean }) => {
          if (props.value === true) {
            return <Badge bg="success">Success</Badge>
          }
          else {
            return <Badge bg="primary">Pending</Badge>
          }
        },
      },
      {
        id: "multipleCellValue",
        accessor: (d: any) => `${d.id},${d.extractedStatus}`,
        disableSortBy: true,
        Cell: (props: { value: string }) => {
          var arrayList = props.value.split(',')
          if (arrayList[1] === "true") {
            return <span className="dataTables_actions"><DocumentTableActions id={arrayList[0]} refreshData={refreshData} /></span>;
          }

        }
      },
    ],
    [])

  const {
    headerGroups,
    getTableBodyProps,
    page,
    prepareRow,
    pageOptions,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    setPageSize,
    canNextPage,
    canPreviousPage,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <div className="page page-view">
        <div className="page-header has-toolbar">
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
                <li className="breadcrumb-item active">Extracted Documents</li>

              </ol>
            </nav>
            <h1 className="page-title">Extracted Documents</h1>
          </div>
          <div className="page-toolbar">

            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
        <div className="page-content">

          <div className="bg-white client-users-list mt-4 p-4 page-table rounded-3 shadow-sm table-responsive">
            <table className="table table-hover dataTable" >

              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers?.map((column) => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())} scope="col" className={`${column.canSort ? 'sorting' : ''} ${column.isSorted ? (column.isSortedDesc ? 'activeUp' : 'activeDown') : ''}`}>
                        {column.render("Header")}

                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              {
                showData &&
                <tbody {...getTableBodyProps()}>
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                        })}

                      </tr>
                    );
                  })}
                </tbody>

              }

            </table>
            {
              !showData &&
              <div className='dataTables_loader'><Spinner animation="border" variant="primary" /></div>

            }

            <div className='dataTables_bottom'>

              <div className='dataTables_length'>
                Show
                <Form.Select className='mx-2 form-select-sm' aria-label="form select"
                  value={pageSize}
                  onChange={(e: { target: { value: any; }; }) => { setPageSize(Number(e.target.value)) }}
                >
                  {
                    [10, 20, 30, 40, 50].map((pageSize) => (<option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>))
                  }

                </Form.Select>
                entries

              </div>

              <div className='dataTables_info'>
                showing page{''}
                <span className='mx-1'>
                  {pageIndex + 1} of {pageOptions.length}
                </span>
              </div>

              <div>

                <InputGroup>
                  <Button variant="outline-secondary" size="sm" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    prev
                  </Button>
                  <span className='align-self-center px-3 py-1 text-white bg-primary'>{pageIndex + 1}</span>
                  <Button variant="outline-secondary" size="sm" onClick={() => nextPage()} disabled={!canNextPage}>
                    next
                  </Button>
                </InputGroup>

              </div>

            </div>

          </div>


        </div>
      </div>
    </>
  )
}
export default ExtractedDocuments;