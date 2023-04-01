import { useNavigate } from 'react-router-dom';
import { apiClient } from "./api";
import { useEffect } from "react";

const AxiosPrivateRoute = () => {
    // const refresh = useRefreshToken();
    // const { auth } = useAuth();
    const navigate=useNavigate()

    useEffect(() => {

        const requestIntercept = apiClient.interceptors.request.use(
          (config) => {
            const local = JSON.parse(sessionStorage.getItem('user')||'');
           
            if (local) {
               config.headers!.Authorization= 'Bearer ' + local?.token;  
            }
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
        
        
        // apiClient.interceptors.request.use(
        //     config => {
        //         if (!config.headers['Authorization']) {
        //             config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        //         }
        //         return config;
        //     }, (error) => Promise.reject(error)
        // );

        const responseIntercept = apiClient.interceptors.response.use(
          (res) => {
            return res;
          },
          async (err) => {
        
            
        
            const originalConfig = err.config;
        
            if (originalConfig.url !== "/api/login/gettoken" && err.response) {
        
              // Access Token was expired
              if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                  const local=JSON.parse(sessionStorage.getItem('user')||'');
                  console.log(' old token data------------',local?.token)
                  const rs = await apiClient.post("/api/login/refresh-token", {
        
                    refreshtoken:local?.token,
        
                  });
                  const { username,jwtToken } = rs.data.data[0];
        
                  originalConfig.headers!.Authorization= 'Bearer ' + jwtToken;  
        
                  console.log('new token data------------',jwtToken)
        
                  // const user=username
                  // const accessToken=jwtToken
                  // const dispatch = useDispatch()
                  // dispatch(setCredentials({ accessToken, user }))
        
                  const newData={
                    user:username,
                    token:jwtToken
                  }
                  sessionStorage.removeItem('user')
                  sessionStorage.setItem('user',JSON.stringify(newData))
        
                  return apiClient(originalConfig);
        
        
                } catch (_error) {
        
                  return Promise.reject(_error);
                  
                }
              }
              else if(err.response.status===403){
        
                console.log('token expired log out')
                sessionStorage.removeItem('user')
                 navigate('/login');
              }
            }
            return Promise.reject(err);
          }
        );
        
        return () => {
          apiClient.interceptors.request.eject(requestIntercept);
          apiClient.interceptors.response.eject(responseIntercept);
        }
    }, [])

    return apiClient;
}

export default AxiosPrivateRoute;