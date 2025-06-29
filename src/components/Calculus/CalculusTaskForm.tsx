import { RootState } from '@/redux/store'
import { updateCalculusAnswer } from '@/redux/tasksSlice'
import { Task, ResultTask } from '@/types/Task'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card'
import { Input } from '../ui/input'
import { Report } from '../Report'

export const CalculusTaskForm = () => {
  const tasks = useSelector((state: RootState) => state.tasksSlice.calculusTasks)
  const mode = useSelector((state: RootState) => state.calculusModeSlice)
  const dispatch = useDispatch()
  const [currentTask, setCurrentTask] = useState<number>(1)
  const [answer, setAnswer] = useState<string>('') // Изменено на string для лучшего контроля ввода
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const [timeLeft, setTimeLeft] = useState<number>(mode.time)

  useEffect(() => {
    setTimeLeft(mode.time) // Сбрасываем таймер при изменении режима
  }, [mode.time])

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
    if (currentTask <= tasks.length && answer !== '') {
      const numericAnswer = parseInt(answer)
      dispatch(updateCalculusAnswer({ index: currentTask - 1, userAnswer: numericAnswer }))

      if (currentTask < tasks.length) {
        setCurrentTask(currentTask + 1)
        setAnswer('') // Очищаем поле ввода вместо установки undefined
      } else {
        setIsCompleted(true)
      }
    }
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleClick()
    }
  }

  const calculateResults = (tasks: Task[]): ResultTask[] => {
    return tasks.map((task, index) => ({
      question: `${task.num1} ${task.operation} ${task.num2}`,
      userAnswer: `${task.userAnswer ?? ''}`,
      isCorrect: task.userAnswer === task.answer,
    }))
  }

  const resetTest = () => {
    setCurrentTask(1)
    setAnswer('')
    setIsCompleted(false)
  }

  const result = calculateResults(tasks)

  if (isCompleted) {
    return <Report tasks={result} resetTest={resetTest} />
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

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
            setAnswer(e.target.value) 
          }}
        />
        <div className="text-center mt-4">
          Осталось времени: {minutes}:{seconds < 10 ? '0' : ''}
          {seconds}
        </div>
        <CardFooter className="mt-4 flex justify-center">
          <Button className="cursor-pointer" onClick={handleClick} disabled={answer === ''}>
            Ответить
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  )
}
