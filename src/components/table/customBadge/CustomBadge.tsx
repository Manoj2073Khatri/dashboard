import React from 'react'
import Badge from 'react-bootstrap/Badge';

const CustomBadge = ({value}:any) => {
  return (
    <>
    {
        value?
        <Badge bg="success">Active</Badge>
        :
        <Badge bg="secondary">InActive</Badge>

    }
    </>
  )
}

export default CustomBadge