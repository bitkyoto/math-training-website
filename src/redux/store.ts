import { configureStore } from '@reduxjs/toolkit'
import { modeSlice } from './modeSlice'
import { tasksSlice } from './tasksSlice'

export const store = configureStore({
  reducer: {
    modeSlice: modeSlice.reducer,
    tasksSlice: tasksSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
