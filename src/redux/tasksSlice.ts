import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '@/types/Task';

const initialState: Task[] = [];

export const tasksSlice = createSlice({
  name: 'tasksSlice',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      return action.payload;
    },
    updateAnswer(state, action: PayloadAction<{ index: number; userAnswer: number }>) {
      const { index, userAnswer } = action.payload;
      if (index >= 0 && index < state.length) {
        state[index].userAnswer = userAnswer;
      }
    },
  },
});

export const { setTasks, updateAnswer } = tasksSlice.actions;
