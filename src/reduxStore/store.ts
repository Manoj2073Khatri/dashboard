import sidebarToggleReducer from './reducer/sidebarToggleSlice';
import toasterToggleReducer from './reducer/toastStateSlice';

import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from "./reducer/apiSlice"
import authReducer from './reducer/authSlice'



export const store = configureStore({
  reducer: {
              [apiSlice.reducerPath]: apiSlice.reducer,
              auth: authReducer,
              sidebarToggle:sidebarToggleReducer,
              toasterToggle:toasterToggleReducer,

           },
             middleware: getDefaultMiddleware =>getDefaultMiddleware().concat(apiSlice.middleware),
             devTools: true,
  
           })
 
   

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch