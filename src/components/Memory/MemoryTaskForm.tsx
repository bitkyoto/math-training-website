import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card'
import { Input } from '../ui/input'
import { RootState } from '@/redux/store'
import { useSelector, useDispatch } from 'react-redux'
import { Report } from '../Report'
import { updateMemoryAnswer } from '@/redux/tasksSlice'
import { MemoryTask, ResultTask } from '@/types/Task'

export const MemoryTaskForm = () => {
  const tasks = useSelector((state: RootState) => state.tasksSlice.memoryTasks)
  const mode = useSelector((state: RootState) => state.memoryModeSlice)
  const dispatch = useDispatch()

  const [currentTask, setCurrentTask] = useState<number>(1)
  const [answer, setAnswer] = useState<number | undefined>(undefined)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number[]>([])
  const [showNumber, setShowNumber] = useState<boolean>(true)
  const [memorizationTimeLeft, setMemorizationTimeLeft] = useState<number>(0)

  // Инициализация состояний при загрузке или изменении tasks/mode
  useEffect(() => {
    if (tasks.length > 0 && mode.time > 0) {
      setTimeLeft(tasks.map(() => mode.time))
      setMemorizationTimeLeft(mode.timeToAnswer)
    }
  }, [tasks, mode.time, mode.timeToAnswer])

  // Таймер для времени запоминания
  useEffect(() => {
    if (!tasks.length || memorizationTimeLeft <= 0) return

    const timer = setInterval(() => {
      setMemorizationTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          setShowNumber(false)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [currentTask, memorizationTimeLeft, tasks.length])

  // Таймер для времени ответа
  useEffect(() => {
    if (showNumber || !tasks.length || timeLeft.length === 0) return

    const timer = setInterval(() => {
      setTimeLeft((prevTimes) => {
        const newTimes = [...prevTimes]
        const currentIndex = currentTask - 1

        if (currentIndex >= 0 && currentIndex < newTimes.length) {
          newTimes[currentIndex] -= 1

          if (newTimes[currentIndex] <= 0) {
            clearInterval(timer)
            if (currentTask < tasks.length) {
              setCurrentTask(currentTask + 1)
              setShowNumber(true)
              setMemorizationTimeLeft(mode.timeToAnswer)
              setAnswer(undefined)
            } else {
              setIsCompleted(true)
            }
          }
        }
        return newTimes
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [showNumber, currentTask, tasks.length, mode.timeToAnswer, timeLeft.length])

  const handleClick = () => {
    if (currentTask <= tasks.length && answer !== undefined) {
      dispatch(updateMemoryAnswer({ index: currentTask - 1, userAnswer: answer }))

      if (currentTask < tasks.length) {
        setCurrentTask(currentTask + 1)
        setAnswer(undefined)
        setShowNumber(true)
        setMemorizationTimeLeft(mode.timeToAnswer)
      } else {
        setIsCompleted(true)
      }
    }
  }

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleClick()
    }
  }

  const calculateResults = (tasks: MemoryTask[]): ResultTask[] => {
    return tasks.map((task, index) => ({
      question: `${task.num1}`,
      userAnswer: `${task.userAnswer ?? ''}`,
      isCorrect: task.userAnswer === task.num1,
    }))
  }

  const resetTest = () => {
    setCurrentTask(1)
    setAnswer(undefined)
    setIsCompleted(false)
    setTimeLeft(tasks.map(() => mode.time))
    setShowNumber(true)
    setMemorizationTimeLeft(mode.timeToAnswer)
  }

  const result = calculateResults(tasks)

  if (isCompleted) {
    return <Report tasks={result} resetTest={resetTest} />
  }

  if (tasks.length === 0 || timeLeft.length === 0) {
    return <div>Загрузка заданий...</div>
  }

  const currentTimeLeft = timeLeft[currentTask - 1] ?? 0
  const minutes = Math.floor(currentTimeLeft / 60)
  const seconds = currentTimeLeft % 60

  return (
    <Card className="mt-[20px] mx-auto w-[350px] h-full">
      <CardHeader>
        <CardTitle>
          Вопрос {currentTask} / {tasks.length}
        </CardTitle>
        <CardDescription>Предоставьте ответ на задание</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-7xl font-bold text-center mb-10">
          {showNumber ? <>{tasks[currentTask - 1]?.num1}</> : <div>Введите ответ</div>}
        </div>
        <div className="text-center my-4">Время на запоминание: {memorizationTimeLeft}</div>
        <Input
          autoFocus
          placeholder="Ответ"
          onKeyDown={handleEnter}
          value={answer ?? ''}
          onChange={(e) => {
            const value = e.target.value
            if (memorizationTimeLeft === 0) {
              setAnswer(value ? parseInt(value) : undefined)
            }
          }}
        />
        <div className="text-center mt-4">
          Осталось времени: {minutes}:{seconds < 10 ? '0' : ''}
          {seconds}
        </div>
        <CardFooter className="mt-4 flex justify-center">
          <Button
            className="cursor-pointer"
            onClick={handleClick}
            disabled={answer === undefined || memorizationTimeLeft !== 0}
          >
            Ответить
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
