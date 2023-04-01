import React from 'react'

export const Error = ({message}:any) => {
  return (
    <div className='text-danger mb-2 small'>{message}</div>
  )
}
