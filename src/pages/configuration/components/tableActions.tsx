import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { VscEdit } from 'react-icons/vsc';
import { CgTrash } from 'react-icons/cg';
import { BsThreeDots } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";

const TableActions = ({id}:any) => {
  
 
  let navigate = useNavigate();
  const show=(id:any)=>{
    navigate(`/document/edit/${id}`); 
  }

  return (
  
    <DropdownButton
          align="end"
          variant='light'
          title={<BsThreeDots />}
        >
          <Dropdown.Item eventKey="1" onClick={()=>show(id)} className='d-flex justify-content-start align-items-center'><MdOutlineRemoveRedEye className='me-2'/>View</Dropdown.Item>
          <Dropdown.Item eventKey="2" className='d-flex justify-content-start align-items-center'><VscEdit className='me-2'/>Edit</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="3" className='text-danger d-flex justify-content-start align-items-center'><CgTrash className='me-2'/>Delete</Dropdown.Item>
        </DropdownButton>
  )
}

export default TableActions