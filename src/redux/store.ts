import { configureStore } from '@reduxjs/toolkit'
import { calculusModeSlice } from './calculusModeSlice'
import { tasksSlice } from './tasksSlice'
import { typeModeSlice } from './typeModeSlice'
import { memoryModeSlice } from './memoryModeSlice'

export const store = configureStore({
  reducer: {
    calculusModeSlice: calculusModeSlice.reducer,
    memoryModeSlice: memoryModeSlice.reducer,
    tasksSlice: tasksSlice.reducer,
    typeModeSlice: typeModeSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
