import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL } from '../../api/api'
import { setCredentials, logOut } from './authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }:any) => {

        const token = getState().auth.token
        if (token) {

            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args:any, api:any, extraOptions:any) => {
    let result:any = await baseQuery(args, api, extraOptions)
      console.log('404 eroo-----------',result)
      console.log('token before expiry',api.getState().auth.token)
    if (result?.status === 401) {

        // send refresh token to get new access token 
        const refreshResult = await baseQuery(`/api/login/refresh-tokens`, api, extraOptions)
        if (refreshResult) {
            console.log('new refresh data after expiry:',refreshResult)
            const user = api.getState().auth.user
           
            // store the new token 
            api.dispatch(setCredentials({ ...refreshResult, user }))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {    
            api.dispatch(logOut())
        }
    }

    else if(result?.error?.status!==200){

        const error=result?.error?.data?.message
        api.dispatch(setCredentials({ error}))

    }

     return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})