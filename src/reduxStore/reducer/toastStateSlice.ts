import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { stat } from 'fs';

export interface toasterState {
  value: boolean;
}

const initialState: toasterState = {
  value: false,
}

export const toasterStateSlice = createSlice({
  name: 'toasterToggle',
  initialState,
  reducers: {
    toasterToggleState: (state:any, action: PayloadAction<boolean>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      action.payload = !action.payload
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { toasterToggleState } = toasterStateSlice.actions

export default toasterStateSlice.reducer