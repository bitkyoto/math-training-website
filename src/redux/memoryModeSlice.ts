import { Mode } from '@/types/Mode'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  amountOfTasks: 10,
  time: 10,
  timeToAnswer: 5,
}

export const memoryModeSlice = createSlice({
  name: 'memoryModeSlice',
  initialState,
  reducers: {
    setMemoryMode(state, action) {
      state.amountOfTasks = action.payload.amountOfTasks
      state.time = action.payload.time
      state.timeToAnswer = action.payload.timeToAnswer
    },
  },
})

export const { setMemoryMode } = memoryModeSlice.actions
