import React from 'react'
import { RiSearchLine } from 'react-icons/ri';
export const GlobalFilter = ({filter,setFilter}:any) => {
  return (
 
     <div className="dataTables_search">
            <div className="search-icon">
              <RiSearchLine />
            </div>
            <input type="text" className="form-control" id="searchTextField" placeholder="Search"
            value={filter || ''} onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)} 
            />
          </div> 
  )
}
