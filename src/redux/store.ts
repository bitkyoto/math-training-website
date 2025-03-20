import { configureStore } from '@reduxjs/toolkit'
import { modeSlice } from './modeSlice'
import { Store } from 'lucide-react'
import { tasksSlice } from './tasksSlice'

export const store = configureStore({
    reducer: {
        modeSlice: modeSlice.reducer,
        tasksSlice: tasksSlice.reducer,
    }
})

