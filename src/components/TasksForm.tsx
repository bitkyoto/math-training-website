import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import { useSelector, useDispatch } from 'react-redux'
import { Input } from '@/components/ui/input'
import { updateCalculusAnswer } from '@/redux/tasksSlice' // Импортируем действие updateAnswer
import { ResultTask, Task } from '@/types/Task'
import { Report } from './Report'
import { RootState } from '@/redux/store'
import { CalculusTaskForm } from './Calculus/CalculusTaskForm'
import { MemoryTaskForm } from './Memory/MemoryTaskForm'

export const TasksForm = () => {
  const typeMode = useSelector((state: RootState) => state.typeModeSlice.mode)
  if (typeMode === 'calculus') {
    return <CalculusTaskForm />
  } else if (typeMode === 'memory') {
    return <MemoryTaskForm />
  }
}
