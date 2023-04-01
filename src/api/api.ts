import { useNavigate } from 'react-router-dom';
import axios  from 'axios';


export const URL='http://localhost:45000';

export const apiClient = axios.create({
  baseURL: URL,
  headers: {
    "Content-type": "application/json",
  },
  
  withCredentials: true
});



apiClient.interceptors.request.use(
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


apiClient.interceptors.response.use(
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
        sessionStorage.removeItem('user')
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

