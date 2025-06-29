import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TasksForm } from '@/components/TasksForm'
import { MemoryTask, Task } from '@/types/Task'
import { setCalculusTasks, setMemoryTasks } from '@/redux/tasksSlice'
import { generateCalculusTasks, generateMemoryTasks } from '@/lib/utils'
import { RootState } from '@/redux/store'

export const PlayPage = () => {
  const dispatch = useDispatch()
  const mode = useSelector((state: RootState) => state.calculusModeSlice)
  const typeMode = useSelector((state: RootState) => state.typeModeSlice.mode)
  if (typeMode === 'calculus') {
    const tasks: Task[] = useMemo(() => generateCalculusTasks(mode), [mode])
    useEffect(() => {
      dispatch(setCalculusTasks(tasks))
    }, [tasks])
  } else if (typeMode === 'memory') {
    const tasks: MemoryTask[] = useMemo(() => generateMemoryTasks(mode), [mode])
    useEffect(() => {
      dispatch(setMemoryTasks(tasks))
    }, [tasks])
  }
  return (
    <>
      <TasksForm />
    </>
  )
}
