import React from 'react'

const configuration = () => {
  return (
    <div>configuration</div>
  )
}

export default configuration

// import React, { useEffect, useState } from 'react'
// import { Button } from 'react-bootstrap';
// import { BiPlusCircle } from 'react-icons/bi';
// import { useQuery } from 'react-query';
// import Spinner from 'react-bootstrap/Spinner';
// import PlatformReferenceTableData from '../../services/utils/dataTypes/configurationPageData';
// // import PlatformReferenceTableService from '../../services/configurationService';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import { useMemo } from "react";
// import { useTable, useSortBy, useGlobalFilter, usePagination } from "react-table";
// import { GlobalFilter } from '../../components/table/globalTableSearch/GlobalTableSearch';
// import AddTable from './components/addTable';
// import TableActions from './components/tableActions';
// import CustomBadge from '../../components/table/customBadge/CustomBadge';


// const Configuration = () => {

//   const [getResult, setGetResult] = useState<any | null>(null);
//   const [tableBodyData, setTableBodyData] = useState<PlatformReferenceTableData[]>([]);
//   const [showData, setShowData] = useState<boolean>(false);
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
  
//   const { isLoading: isLoadingData, refetch: getAllReferenceTableData } = useQuery<any, Error>(
//     "query-ExtractedDocumentTableData",
//     async () => {
//       // return await PlatformReferenceTableService.findAll();
//     },
//     {
//       enabled: false,
//       onSuccess: (res:any) => {

//         if (res.succeeded) {
//           console.log(res)
//           setGetResult(res);
//           setTableBodyData(res);
//         }
//       },
//       onError: (err: any) => {
//         setGetResult(err || err);
//       },
//     }
//   );

//   useEffect(() => {
//     function getAllData() {
//       try {
//         getAllReferenceTableData();
//       } catch (err: any) {
//         setGetResult(err);
//       }
//     }
//     getAllData();
//     if (!isLoadingData) {
//       setShowData(true)
//     }

//   }, [getAllReferenceTableData, getResult, isLoadingData, tableBodyData]);

//   const data = useMemo(() => tableBodyData, [tableBodyData])
//   console.log('data:',data)
//   const columns: any = useMemo(
//     () => [
//       {
//         Header: 'Name',
//         accessor: 'name', // accessor is the "key" in the data
//       },
//       {
//         Header: 'Description',
//         accessor: 'description',
      
//       },
//       {
//         Header: 'Created',
//         accessor: 'createdAt',
//         Cell: (props: { value: any }) => {
//           const date = new Date(props.value);
//           const formattedDate = date.toLocaleDateString("en-GB", {
//             day: "numeric",
//             month: "long",
//             year: "numeric"
//           })
//           return formattedDate;
//         },
//       },
//       {
//         Header: 'Last Updated',
//         accessor: 'updatedAt',
//         Cell: (props: { value: any }) => {
//           const date = new Date(props.value);
//           const formattedDate = date.toLocaleDateString("en-GB", {
//             day: "numeric",
//             month: "long",
//             year: "numeric"
//           })
//           return formattedDate;
//         },

//       },
//       {
//         Header: 'Status',
//         accessor: 'status',
//         Cell: (props: { value: boolean }) => {
//           return <CustomBadge value={props.value}/>;
//         },
//       },
//       {
       
//         accessor: 'id',
//         disableSortBy: true,
//         Cell: (props: { value: number }) => {
//           return <span className="dataTables_actions"><TableActions id={props.value}/></span>;
//         },
//       },
//     ],
//     [])


//   const {
//     headerGroups,
//     getTableBodyProps,
//     page,
//     prepareRow,
//     pageOptions,
//     state,
//     setGlobalFilter,
//     nextPage,
//     previousPage,
//     setPageSize,
//     canNextPage,
//     canPreviousPage,
//   } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

//   const { globalFilter, pageIndex, pageSize } = state;

//   return (
//     <> 
//     <div className="page page-view">
//       <div className="page-header has-toolbar">
//         <div>
//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb">
//               <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
//               <li className="breadcrumb-item active">Extracted Documents</li>

//             </ol>
//           </nav>
//           <h1 className="page-title">Extracted Documents</h1>
//         </div>
//         <div className="page-toolbar">

//           <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
//           {/* <Button variant="primary" className='d-flex justify-content-center align-items-center' onClick={handleShow}><BiPlusCircle className='me-2' />Add Table</Button> */}
//         </div>
//       </div>
//       <div className="page-content">

//         <div className="page-table client-users-list table-responsive">
//           <table className="table table-hover dataTable" >

//             <thead>
//               {headerGroups.map((headerGroup) => (
//                 <tr {...headerGroup.getHeaderGroupProps()}>
//                   {headerGroup.headers?.map((column) => (
//                     <th {...column.getHeaderProps(column.getSortByToggleProps())} scope="col" className={`${column.canSort ?'sorting':''} ${column.isSorted ? (column.isSortedDesc ? 'activeUp' : 'activeDown') : ''}`}>
//                       {column.render("Header")}
                  
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>

//             {
//               showData &&
//                 <tbody {...getTableBodyProps()}>
//                   {page.map((row) => {
//                     prepareRow(row);
//                     return (
//                       <tr {...row.getRowProps()}>
//                         {row.cells.map((cell) => {
//                           return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
//                         })}
                        
//                       </tr>
//                     );
//                   })}
//                 </tbody>
               
//             }
            
//           </table>
//           {
//               !showData &&
//               <div className='dataTables_loader'><Spinner animation="border" variant="primary" /></div>
               
//             }
         
//           <div className='dataTables_bottom'>

//             <div className='dataTables_length'>
//               Show
//               <Form.Select className='mx-2 form-select-sm' aria-label="form select"
//                 value={pageSize}
//                 onChange={(e: { target: { value: any; }; }) => { setPageSize(Number(e.target.value)) }}
//               >
//                 {
//                   [10, 20, 30, 40, 50].map((pageSize) => (<option key={pageSize} value={pageSize}>
//                     {pageSize}
//                   </option>))
//                 }

//               </Form.Select>
//               entries

//             </div>

//             <div className='dataTables_info'>
//               showing page{''}
//               <span className='mx-1'>
//                 {pageIndex + 1} of {pageOptions.length}
//               </span>
//             </div>

//             <div>

//               <InputGroup>
//                 <Button variant="outline-secondary" size="sm" onClick={() => previousPage()} disabled={!canPreviousPage}>
//                   prev
//                 </Button>
//                 <span className='align-self-center px-3 py-1 text-white bg-primary'>{pageIndex + 1}</span>
//                 <Button variant="outline-secondary" size="sm" onClick={() => nextPage()} disabled={!canNextPage}>
//                   next
//                 </Button>
//               </InputGroup>


//             </div>

//           </div> 

//         </div>


//       </div>
//     </div>
//     <AddTable show={show} handleClose={handleClose}/>
//     </>
//   )
// }
// export default Configuration;