import { FormData } from '@/components/SettingsCardForm'
import { createSlice } from '@reduxjs/toolkit'

const initialState: FormData = {
  selectedNumbers: [],
  selectedOperations: [],
  amountOfTasks: 20,
  time: 120,
}

export const modeSlice = createSlice({
  name: 'modeSlice',
  initialState,
  reducers: {
    setMode(state, action) {
      return action.payload
    },
  },
})

export const { setMode } = modeSlice.actions
