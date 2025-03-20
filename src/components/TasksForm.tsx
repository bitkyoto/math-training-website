import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card'
import { useSelector, useDispatch } from 'react-redux'
import { Input } from '@/components/ui/input'
import { updateAnswer } from '@/redux/tasksSlice' // Импортируем действие updateAnswer
import { ResultTask, Task } from '@/types/Task'
import { Report } from './Report'

export const TasksForm = () => {
  const tasks = useSelector((state) => state.tasksSlice)
  const mode = useSelector((state) => state.modeSlice)
  const dispatch = useDispatch()
  const [currentTask, setCurrentTask] = useState<number>(1)
  const [answer, setAnswer] = useState<number | undefined>(0)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(mode.time)

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isCompleted) {
      setIsCompleted(true)
    }
  }, [timeLeft, isCompleted])

  const handleClick = () => {
    if (currentTask <= tasks.length) {
      dispatch(updateAnswer({ index: currentTask - 1, userAnswer: answer! }))
      if (currentTask < tasks.length) {
        setCurrentTask(currentTask + 1)
        setAnswer(0)
      } else {
        setIsCompleted(true)
      }
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleClick()
    }
  }

  const calculateResults = (tasks: Task[]): ResultTask[] => {
    return tasks.map((task, index) => ({
      question: `${task.num1} ${task.operation} ${task.num2}`,
      userAnswer: `${task.userAnswer}`,
      isCorrect: task.userAnswer === task.answer,
    }))
  }

  const result = calculateResults(tasks)

  if (isCompleted) {
    return (
      <Report
        tasks={result}
        setCurrentTask={setCurrentTask}
        setIsCompleted={setIsCompleted}
        setTimeLeft={setTimeLeft}
      />
    )
  }

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
          {tasks[currentTask - 1]?.num1} {tasks[currentTask - 1]?.operation} {tasks[currentTask - 1]?.num2}
        </div>
        <Input
          autoFocus
          placeholder="Ответ"
          onKeyDown={handleEnter}
          value={answer}
          onChange={(e) => {
            if (e.target.value) {
              setAnswer(parseInt(e.target.value))
            } else {
              setAnswer(0)
            }
          }}
        />
        <div className="text-center mt-4">
          Осталось времени: {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}
          {timeLeft % 60}
        </div>
        <CardFooter className="mt-4 flex justify-center">
          <Button className="cursor-pointer" onClick={handleClick}>
            Ответить
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
