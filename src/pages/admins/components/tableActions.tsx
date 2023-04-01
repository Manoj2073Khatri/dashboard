import React, { useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { CgTrash } from 'react-icons/cg';
import { BsThreeDots } from 'react-icons/bs';
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";
import CRUDServices from '../../../services/crudService';
import DialogBox from '../../../components/dialogBox/dialog';
import { Flip, toast } from 'react-toastify';

const AdminTableActions = ({ id, refreshAdmin }: any) => {

  const [deleteCurrentAdmin, setDeleteCurrentAdmin] = useState<boolean>(false)
  const [showPopupModel, setShowPopupModel] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<string>('');
  let navigate = useNavigate();

  const { mutate: deleteAdminById } = useMutation<any, Error>(
    "query-deleteAdminById",
    async () => {
      return await CRUDServices.deleteById(`deleteAdmin?id=${deleteId}`);
    },
    {
      //enabled: false,
      onSuccess: (res: any) => {
       refreshAdmin();
       toast.success('Admin deleted Successfully.', {
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
  const deleteById = (id: any) => {
    setShowPopupModel(true);
    setDeleteId(id);
  }
  useEffect(() => {
    if (deleteId) {
      try {
        if (deleteCurrentAdmin) {
          deleteAdminById()
          setDeleteCurrentAdmin(false)
        }

      }
      catch (err: any) {
      }
    }
    return () => {

    }
  }, [deleteAdminById, deleteId, deleteCurrentAdmin])

  const editAdmin = (id: any) => {
    navigate(`/admins/edit/${id}`);
  }
  const onCancelClick = () => {
    setShowPopupModel(false)
  }
  const onSaveChangesClick = () => {
    setShowPopupModel(false)
    setDeleteCurrentAdmin(true);
  }
  return (
    <>
      {showPopupModel && <DialogBox showM={showPopupModel} saveClick={onSaveChangesClick} cancelClick={onCancelClick} />}

      <DropdownButton
        align="end"
        variant='light'
        title={<BsThreeDots />}
      >
        <Dropdown.Item eventKey="1" onClick={() => editAdmin(id)} className='d-flex justify-content-start align-items-center'><MdOutlineRemoveRedEye className='me-2' />Edit</Dropdown.Item>
        <Dropdown.Item eventKey="3" className='text-danger d-flex justify-content-start align-items-center' onClick={() => deleteById(id)}><CgTrash className='me-2' />Delete</Dropdown.Item>
      </DropdownButton>
    </>
  )
}

export default AdminTableActions