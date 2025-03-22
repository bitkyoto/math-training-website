import React, { useEffect, useMemo } from 'react'
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
  const tasks: Task[] = useMemo(() => generateTasks(mode), [mode])
  useEffect(() => {
    dispatch(setTasks(tasks))
  }, [tasks])
  return (
    <>
      <TasksForm />
    </>
  )
}
