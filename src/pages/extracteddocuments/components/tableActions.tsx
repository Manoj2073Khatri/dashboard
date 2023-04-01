import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { CgTrash } from 'react-icons/cg';
import { BsThreeDots } from 'react-icons/bs';
import { useMutation } from 'react-query';

import CRUDServices from '../../../services/crudService';
import { useNavigate } from "react-router-dom";
import DialogBox from '../../../components/dialogBox/dialog';
import { Flip, toast } from 'react-toastify';

const DocumentTableActions = ({ id , refreshData}: any) => {

  let navigate = useNavigate();
  const [showPopupModel, setShowPopupModel] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<boolean>(false)
  const [deleteCurrentItem, setDeleteCurrentItem] = useState<boolean>(false)
  const { mutate: deleteDocumentById } = useMutation<any, Error>(
    "query-deleteDocumentById",
    async () => {
      return await CRUDServices.deleteById(`/deleteDocument?id=${id}`);
    },
    {
     // enabled: false,
      onSuccess: (res: any) => {
        if(res){
          refreshData();
          toast.success('Document deleted successfully.', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            transition: Flip
            });
        }
       
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
  
  useEffect(() => {

  let isMounted=true;

    if (isMounted && deleteId) {
      try {
        if (deleteCurrentItem) {
          deleteDocumentById()
          setDeleteCurrentItem(false)
        }

      }
      catch (err: any) {
      }
    }
    return () => {
      isMounted=false;

    }
  }, [deleteId, deleteCurrentItem])

  const deleteDocById = (id: any) => {
    try {
      setShowPopupModel(true);
      setDeleteId(id); 
    } catch (err: any) {
      
    }
  }

  const onCancelClick = () => {
    setShowPopupModel(false)
  }
  const onSaveChangesClick = () => {
    setShowPopupModel(false)
    setDeleteCurrentItem(true);
  }

  const show = (id: any) => {
    navigate(`/extractedDocuments/edit/${id}`);
  }
  return (
    <>
      {showPopupModel && <DialogBox showM={showPopupModel} saveClick={onSaveChangesClick} cancelClick={onCancelClick} />}

      <DropdownButton
        align="end"
        variant='light'
        title={<BsThreeDots />}
      >
        <Dropdown.Item eventKey="1" onClick={() => show(id)} className='d-flex justify-content-start align-items-center'><MdOutlineRemoveRedEye className='me-2' />View</Dropdown.Item>
        <Dropdown.Item eventKey="3" className='text-danger d-flex justify-content-start align-items-center' onClick={() => deleteDocById(id)}><CgTrash className='me-2' />Delete</Dropdown.Item>
      </DropdownButton>
    </>

  )
}

export default DocumentTableActions