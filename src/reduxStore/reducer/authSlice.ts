import { createSlice } from "@reduxjs/toolkit"

export interface userCredentials {
    user: null | string,
    token:null | string,
    error:null | string,
  }
  
  const initialState: userCredentials = {
    user: null,
    token:null,
    error:null,
  }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state:any, action:any) => {
            const { user, accessToken,error } = action.payload
            state.user = user;
            state.token = accessToken;
            state.error = error;

                const userData={
                    name:user,
                    token:accessToken
                }
             
                sessionStorage.removeItem('user')
                sessionStorage.setItem('user', JSON.stringify(userData))
                
                console.log('data in storage after local storage fillup from redux store-------',JSON.parse(sessionStorage.getItem("user")|| '').token)
           
        },
      
        logOut: (state:any) => {
            state.user = null
            state.token = null
        
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: { auth: { user: string }; }) => state.auth.user
export const selectCurrentToken = (state: { auth: { token: string }; }) => state.auth.token