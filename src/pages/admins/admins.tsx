import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Spinner from 'react-bootstrap/Spinner';
import AdminTableDataColumn from '../../services/utils/dataTypes/configurationPageData';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useMemo } from "react";
import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
import { GlobalFilter } from '../../components/table/globalTableSearch/GlobalTableSearch';
import AdminTableActions from './components/tableActions';
import CRUDServices from '../../services/crudService';
import { useNavigate } from "react-router-dom";

const Admins = () => {

  const [getResult, setGetResult] = useState<{} | null>(null);
  const [tableBodyData, setTableBodyData] = useState<AdminTableDataColumn[]>([]);
  const [showData, setShowData] = useState<boolean>(false);
  const [refreshTable, setRefreshTable] = useState<boolean>();

  const { isLoading: isLoadingData, refetch: getAllReferenceTableData } = useQuery<{}, Error>(
    "query-AdminTableData",
    async () => {
      return await CRUDServices.findAll('/adminlist');
    },
    {
      enabled: false,
      onSuccess: (res: any) => {
        setGetResult(res?.data);
        setTableBodyData(res?.data);
        //reset to default
        setRefreshTable(false);
      },
      onError: (err: any) => {

      },
    }
  );

  useEffect(() => {
    function getAllData() {
      try {
        getAllReferenceTableData();
      } catch (err: any) {
        setGetResult(err);
      }
    }
    getAllData();
    if (!isLoadingData) {
      setShowData(true)
    }

  }, [getAllReferenceTableData, getResult, isLoadingData, tableBodyData, refreshTable]);

  const refreshAdmin =()=>{
    setRefreshTable(true);
  }

  const data = useMemo(() => tableBodyData, [tableBodyData])

  const columns: any = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'userName', // accessor is the "key" in the data
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Role',
        accessor: 'role'
      },
      
      {
        accessor: 'id',
        disableSortBy: true,
        Cell: (props: { value: string }) => {
          return <span className="dataTables_actions"><AdminTableActions id={props.value} refreshAdmin={refreshAdmin}/></span>;
        }
      },
    ],
    [])
  let navigate = useNavigate();
  const addNewAdmin = () => {
    //path
    navigate(`/admins/createAdmin`);
  }

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
                <li className="breadcrumb-item active">Admin List</li>

              </ol>
            </nav>
            <h1 className="page-title">Admin List</h1>
          </div>
          <div className="page-toolbar">

            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <Button variant="primary" className='d-flex justify-content-center align-items-center' onClick={() => addNewAdmin()}>Add Admins</Button>
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
export default Admins;