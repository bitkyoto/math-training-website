import { Mode } from '@/types/Mode'
import { createSlice } from '@reduxjs/toolkit'

const initialState: Mode = {
  selectedNumbers: [],
  selectedOperations: [],
  amountOfTasks: 20,
  time: 120,
}

export const calculusModeSlice = createSlice({
  name: 'calculusmodeSlice',
  initialState,
  reducers: {
    setCalculusMode(state, action) {
      return action.payload
    },
  },
})

export const { setCalculusMode } = calculusModeSlice.actions
