


import { AiOutlineEdit } from 'react-icons/ai'
import { TiTick } from 'react-icons/ti'
import { RiCloseLine } from 'react-icons/ri'
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import CRUDServices from '../../../services/crudService';
import { Spinner } from 'react-bootstrap';
import { Flip, toast } from 'react-toastify';

function ViewDocuments() {

  const [refreshData, setRefreshData] = useState(false);
  const [cp12Status, setCP12Status] = useState(false)
  const [tenancyStatus, setTenancyStatus] = useState(false)
  const [data, setData] = useState<any | {} | null>(null);
  const [docResult, setDocResult] = useState<any | {}>({});
  const [tenancyResult, setTenancyResult] = useState<any>([])
  const [innerTenancyResult, setInnerTenancyResult] = useState({})
  const [CP12, setCP12] = useState(false)
  const [cP12Result, setCP12Result] = useState({})
  const [tenancy, setTenancy] = useState(false)
  const [noCategory, setNoCategory] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showEditAddress, setShowEditAddress] = useState(false)
  const [showEditDate, setShowEditDate] = useState(false)
  const [showEditNumber, setShowEditNumber] = useState(false)

  const [indexCount, setIndexCount] = useState<number>(-1)
  const [indexCountAddress, setIndexCountAddress] = useState<number>(-1)

  const { Id } = useParams();

  const { refetch: viewDocumentById } = useQuery<any, Error>(
    "query-viewDocumentById",
    async () => {
      return await CRUDServices.findById(`/viewDocument?id=${Id}`);
    },
    {
      enabled: false,
      onSuccess: (res: any | {}) => {
        debugger
        if (res) {
          let result = res.data[0].cP12ViewModel.result;
          setDocResult(result);
          console.log(res.data[0]);
          let tenancyResult = res.data[0].tenancyViewModel.result;
          setTenancyResult(tenancyResult);

          setData(res?.data[0])
          if (res?.data[0]?.cP12ViewModel.fileName !== null) {
            if (res?.data[0]?.cP12ViewModel.status) {
              setCP12Status(true);
            }
            setCP12(true);
            setCP12Result(res?.data[0]?.cP12ViewModel.result);
          }
          else if (res?.data[0]?.tenancyViewModel.fileName !== null) {
            if (res?.data[0]?.tenancyViewModel.status) {
              setTenancyStatus(true);
            }
            setTenancy(true);
          }
          else if (res?.data[0]?.noCategoryViewModel?.fileName !== null) {
            setNoCategory(true);
          }
        }
      },
      onError: (err: any) => {
        // setGetResult(err.response?.data || err);
      },
    }
  );


  useEffect(() => {
    try {
      viewDocumentById();
      setRefreshData(false);
    } catch (err: any) {
      // setGetResult(err);
    }

    return () => {

    }
  }, [viewDocumentById, refreshData])

  const handleValueChange = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    setDocResult({ ...docResult, [name]: value });
  };

  const { mutate: SaveCP12ResultData } = useMutation<any, Error>(
    "query-saveCP12ResultData",
    async () => {
      return await CRUDServices.post(`/cp12/saveData`, docResult)
    },
    {
      onSuccess: (res: any) => {

        //reset the textbox
        setShowEditNumber(false);
        setShowEditDate(false);
        setShowEditAddress(false)
        setShowEdit(false);

        setRefreshData(true);
        toast.success('Data saved Successfully.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Flip
        });
      },
      onError: (err: any) => {
        toast.error('Error occured.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Flip
        });
      },
    }
  );

  const { mutate: SaveTenancyResultData } = useMutation<any, Error>(
    "query-saveTenancyResultData",
    async () => {
      return await CRUDServices.post(`/tenancy/saveData`, innerTenancyResult)
    },
    {
      onSuccess: (res: any) => {
        setRefreshData(true);

        //reset the text box
        setIndexCount(-1);
        setIndexCountAddress(-1);

        toast.success('Data saved Successfully.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Flip
        });
      },
      onError: (err: any) => {
        toast.error('Error occured.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Flip
        });
      },
    }
  );

  const handleValueChangeForTenancy = (e: any, index: number) => {
    let _tenancyResult = tenancyResult;
    let tenancyResultItem = {};
    let name = e.target.name;
    let value = e.target.value;
    tenancyResultItem = _tenancyResult[index];
    let updatedTenancyResultItem = { ...tenancyResultItem, [name]: value }
    setInnerTenancyResult(updatedTenancyResultItem);
    // _tenancyResult[index] = updatedTenancyResultItem

    // setInnerTenancyResult(_tenancyResult);
  };

  const saveTenancyResult = () => {
    SaveTenancyResultData();
  }

  const saveCP12Result = () => {
    SaveCP12ResultData();
  }

  return (

    data ?
      <div className="page page-view">
        <div className="page-header has-toolbar">
          <div>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
                <li className="breadcrumb-item"><a href="/extractedDocuments">Extracted Documents</a></li>
                <li className="breadcrumb-item active">View Documents</li>
              </ol>
            </nav>
            <h1 className="page-title">View Documents</h1>
          </div>
        </div>
        <div className="page-content">
          <div className='row bg-white  mt-4 p-4 rounded-3 shadow-sm'>
            {
              data && CP12 && cp12Status && <h5>Extracted Details</h5>
            }
            {
              data && CP12 && cp12Status && <iframe className='col-5' src={data.sasUrl} title={"iframe"} height={500} width={430} />
            }

            <div className='col-7'>
              {
                data && CP12 &&
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Document Location</td>
                      <td>{data.cP12ViewModel?.documentLocation}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Document Type</td>
                      <td>CP12</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Format</td>
                      <td>{data.cP12ViewModel?.format}</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>File Name</td>
                      <td>{data.cP12ViewModel?.fileName}</td>
                    </tr>
                    {cp12Status &&
                      <>
                        <tr>
                          <td>5</td>
                          <td>Gas Engineer ID Number</td>
                          <td>
                            {
                              !showEditNumber &&
                              <>
                                {docResult.gasEngineerNumber}
                                <span className="float-end"><AiOutlineEdit role='button' onClick={() => setShowEditNumber(!showEditNumber)} /></span>
                              </>
                            }
                            {
                              showEditNumber && <div className="d-flex justify-content-between align-items-center">
                                <textarea className="form-control flex-grow-1" id="text-edit" name="gasEngineerNumber" aria-describedby="text-edit" onChange={(e) => handleValueChange(e)}>{docResult.gasEngineerNumber}</textarea>
                                <div className="ml-5 d-flex justify-content-between align-items-center px-3">
                                  <button role='button' className="float-end btn btn-outline-danger px-2 py-1 me-2" onClick={() => setShowEditNumber(!showEditNumber)}><RiCloseLine /></button>|<button role="button" onClick={() => saveCP12Result()} className="float-end btn btn-primary px-2 py-1 ms-2"><TiTick /></button>
                                </div>
                              </div>
                            }
                          </td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td>Data Check</td>
                          <td>
                            {
                              !showEditDate &&
                              <>
                                {docResult.inspectionDate}
                                <span className="float-end"><AiOutlineEdit role='button' onClick={() => setShowEditDate(!showEditDate)} /></span>
                              </>
                            }

                            {
                              showEditDate && <div className="d-flex justify-content-between align-items-center">
                                <textarea className="form-control flex-grow-1" id="text-edit" name="inspectionDate" aria-describedby="text-edit" onChange={(e) => handleValueChange(e)}>{docResult.inspectionDate}</textarea>
                                <div className="ml-5 d-flex justify-content-between align-items-center px-3">
                                  <button role='button' className="float-end btn btn-outline-danger px-2 py-1 me-2" onClick={() => setShowEditDate(!showEditDate)}><RiCloseLine /></button>|<button role="button" onClick={() => saveCP12Result()} className="float-end btn btn-primary px-2 py-1 ms-2"><TiTick /></button>
                                </div>
                              </div>
                            }
                          </td>
                        </tr>

                        <tr>
                          <td>7</td>
                          <td>Address</td>
                          <td>
                            {
                              !showEditAddress &&
                              <>
                                {docResult.address}
                                <span className="float-end"><AiOutlineEdit role='button' onClick={() => setShowEditAddress(!showEditAddress)} /></span>
                              </>
                            }

                            {
                              showEditAddress && <div className="d-flex justify-content-between align-items-center">
                                <textarea className="form-control flex-grow-1" id="text-edit" name="address" aria-describedby="text-edit" onChange={(e) => handleValueChange(e)} >
                                  {docResult.address}
                                </textarea>
                                <div className="ml-5 d-flex justify-content-between align-items-center px-3">
                                  <button role='button' className="float-end btn btn-outline-danger px-2 py-1 me-2" onClick={() => setShowEditAddress(!showEditAddress)}><RiCloseLine /></button>|<button role="button" onClick={() => saveCP12Result()} className="float-end btn btn-primary px-2 py-1 ms-2"><TiTick /></button>
                                </div>
                              </div>
                            }
                          </td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td>Message</td>
                          <td>
                            {
                              !showEdit &&
                              <>
                                {docResult.message}
                                <span className="float-end"><AiOutlineEdit role='button' onClick={() => setShowEdit(!showEdit)} /></span>
                              </>
                            }

                            {
                              showEdit && <div className="d-flex justify-content-between align-items-center">
                                <textarea className="form-control flex-grow-1" name="message" id="text-edit" aria-describedby="text-edit" onChange={(e) => handleValueChange(e)}>{docResult.message} </textarea>
                                <div className="ml-5 d-flex justify-content-between align-items-center px-3">
                                  <button role='button' className="float-end btn btn-outline-danger px-2 py-1 me-2" onClick={() => setShowEdit(!showEdit)}><RiCloseLine /></button>|<button role="button" onClick={() => saveCP12Result()} className="float-end btn btn-primary px-2 py-1 ms-2"><TiTick /></button>
                                </div>
                              </div>
                            }

                          </td>
                        </tr>
                      </>
                    }

                  </tbody>
                </Table>
              }
            </div>


          </div>
          {
            data && tenancy &&
            <>
              <Table striped bordered hover className=' bg-white  mt-4 p-4 rounded-3 shadow-sm'>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Document Location</td>
                    <td>
                      {
                        data.tenancyViewModel?.documentLocation.map((item: string, index: number) => {
                          return <div key={index}>{item}</div>
                        })
                      }

                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Document Type</td>
                    <td>Tenancy</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Format</td>
                    <td>{data.tenancyViewModel?.format}</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>File Name</td>
                    <td>{data.tenancyViewModel?.fileName}</td>
                  </tr>

                </tbody>
              </Table>
            </>
          }
          {
            data && tenancy && tenancyStatus && data?.tenancyViewModel?.result.length > 0 &&
            <>
              <h5 className=''>Extracted Details</h5>
              <div className='row mb-4  bg-white  mt-4 p-4 rounded-3 shadow-sm'>
                <iframe className='col-5 mb-4' style={{ height: "450px" }} src={data.sasUrl} title={"iframe"} />

                <div className='col-7'>
                  <Table striped bordered hover className=''>
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Page No</th>
                        <th>Date</th>
                        <th>Address</th>
                      </tr>
                    </thead>
                    <tbody >
                      {
                        data?.tenancyViewModel?.result?.map((data: any, index: any) => {
                          return (

                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{data?.page}</td>
                              <td>

                                {
                                  (index !== indexCount) ?
                                    <>
                                      {data?.date.toString()}
                                      <span className="float-end"><AiOutlineEdit role='button' onClick={() => setIndexCount(index)} /></span>
                                    </>
                                    :
                                    <div className="d-flex justify-content-between align-items-center">
                                      <textarea className="form-control flex-grow-1" id="text-edit" name="date" aria-describedby="text-edit" onChange={(e) => handleValueChangeForTenancy(e, index)} >{data?.date.toString()}</textarea>
                                      <div className="ml-5 d-flex justify-content-between align-items-center px-3">
                                        <button role='button' className="float-end btn btn-outline-danger px-2 py-1 me-2" onClick={() => setIndexCount(-1)}><RiCloseLine /></button>|<button role="button" onClick={() => saveTenancyResult()} className="btn btn-primary px-2 py-1 ms-2 float-end"><TiTick /></button>
                                      </div>
                                    </div>
                                }

                              </td>
                              <td>
                                {
                                  (index !== indexCountAddress) ?
                                    <>
                                      {data?.address.toString()}
                                      <span className="float-end"><AiOutlineEdit role='button' onClick={() => setIndexCountAddress(index)} /></span>
                                    </>
                                    :
                                    <div className="d-flex justify-content-between align-items-center">
                                      <textarea className="form-control flex-grow-1" id="text-edit" name="address" aria-describedby="text-edit" onChange={(e) => handleValueChangeForTenancy(e, index)} >{data?.address.toString()}</textarea>
                                      <div className="ml-5 d-flex justify-content-between align-items-center px-3">
                                        <button role='button' className="float-end btn btn-outline-danger px-2 py-1 me-2" onClick={() => setIndexCountAddress(-1)}><RiCloseLine /></button>|<button role="button" onClick={() => saveTenancyResult()} className="btn btn-primary px-2 py-1 ms-2 float-end"><TiTick /></button>
                                      </div>
                                    </div>
                                }

                              </td>
                            </tr>
                          )
                        })

                      }
                    </tbody>
                  </Table>
                </div>

              </div>

            </>

          }

          {
            data && noCategory &&
            <Table striped>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Document Location</td>
                  <td>{data.noCategoryViewModel?.documentLocation}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Document Type</td>
                  <td>No Category</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Format</td>
                  <td>{data.noCategoryViewModel?.format}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>File Name</td>
                  <td>{data.noCategoryViewModel?.fileName}</td>
                </tr>

              </tbody>
            </Table>
          }
        </div>

      </div>
      :
      <div className=" w-100 h-75 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
  );
}

export default ViewDocuments;
