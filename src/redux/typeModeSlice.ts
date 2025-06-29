import { Mode } from '@/types/Mode'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'calculus',
}

export const typeModeSlice = createSlice({
  name: 'typeModeSlice',
  initialState,
  reducers: {
    setTypeMode(state, action) {
      state.mode = action.payload
    },

  },
})

export const { setTypeMode, } = typeModeSlice.actions
