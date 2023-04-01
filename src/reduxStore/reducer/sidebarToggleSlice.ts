import { createSlice } from '@reduxjs/toolkit'

export interface toggleState {
  value: boolean;
}

const initialState: toggleState = {
  value: false,
}

export const sidebarToggleSlice = createSlice({
  name: 'sidebarToggle',
  initialState,
  reducers: {
    toggleArrowState: (state:any) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value=!state.value;
      if(state.value){
        document.body.classList.add('sidebar-mini');
        }
        else{
           document.body.classList.remove('sidebar-mini');
        }
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { toggleArrowState } = sidebarToggleSlice.actions

export default sidebarToggleSlice.reducer