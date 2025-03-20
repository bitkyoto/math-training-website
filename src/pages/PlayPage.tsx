import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormData } from '@/components/SettingsCardForm'
import { TasksForm } from '@/components/TasksForm'
import { Task } from '@/types/Task'
import { setTasks } from '@/redux/tasksSlice'
import { generateTasks } from '@/lib/utils'
import { RootState } from '@/redux/store'

export const PlayPage = () => {
  const dispatch = useDispatch()
  const mode = useSelector((state: RootState) => state.modeSlice)
  useEffect(() => {
    const tasks: Task[] = generateTasks(mode)!
    dispatch(setTasks(tasks))
  }, [])
  return (
    <>
      <TasksForm />
    </>
  )
}
