import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MemoryTask, Task } from '@/types/Task'

const initialState = {
  calculusTasks: [],
  memoryTasks: [],
}

export const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState,
  reducers: {
    setCalculusTasks(state, action: PayloadAction<Task[]>) {
      state.calculusTasks = action.payload
    },
    setMemoryTasks(state, action) {
      state.memoryTasks = action.payload
    },
    updateCalculusAnswer(state, action: PayloadAction<{ index: number; userAnswer: number }>) {
      const { index, userAnswer } = action.payload
      if (index >= 0 && index < state.calculusTasks.length) {
        state.calculusTasks[index].userAnswer = userAnswer
      }
    },
    updateMemoryAnswer(state, action) {
      const { index, userAnswer } = action.payload
      if (index >= 0 && index < state.memoryTasks.length) {
        state.memoryTasks[index].userAnswer = userAnswer
      }
    },
  },
})

export const { setCalculusTasks, setMemoryTasks, updateCalculusAnswer, updateMemoryAnswer } = tasksSlice.actions
