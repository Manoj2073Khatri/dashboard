import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "../reduxStore/reducer/authSlice"
import Sidebar from "../components/sidebar/Sidebar"
import HeaderTopBar from "../components/headerTopBar/HeaderTopBar"

const RequireAuth = () => {
   // const token = useSelector(selectCurrentToken)

   const localData=JSON.parse(sessionStorage.getItem('user')|| '')
    
   const location = useLocation()
  //console.log('token from requireAuth:',token)
    return (
        localData?.token ? <div className='wrapper'>
                    <div className='main'>
                            <Sidebar />
                            <div className='content'>
                                    <HeaderTopBar />
                                    <Outlet/>
                            </div>
                    </div>  
               </div>
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}
export default RequireAuth