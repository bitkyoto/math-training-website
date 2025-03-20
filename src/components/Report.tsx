import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { ResultTask, Task } from '@/types/Task'
import { useNavigate } from 'react-router'

import { writeResults } from '@/lib/utils'

interface ReportProps {
  tasks: ResultTask[]
  setCurrentTask: any
  setIsCompleted: any
  setTimeLeft: any
}

export const Report = ({ tasks, setCurrentTask, setIsCompleted, setTimeLeft }: ReportProps) => {
  const navigate = useNavigate()
  console.log('report')
  useEffect(() => writeResults(tasks), [])
  return (
    <>
      <Card className="mt-[20px] mx-auto w-[350px] h-full">
        <CardHeader>
          <CardTitle>Результаты тестирования</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <ul className="font-semibold">
              {tasks.map((result, index) => (
                <li key={index} className={result.isCorrect ? 'text-green-500' : 'text-red-500'}>
                  {result.question} = {result.userAnswer}{' '}
                  {result.isCorrect ? 'Правильно' : result.userAnswer === undefined ? '' : 'Неправильно'}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <div className="flex flex-col justify-center mx-auto w-50 px-6 gap-4">
          <Button
            className="cursor-pointer bg-destructive"
            onClick={() => setCurrentTask(1) || setIsCompleted(false) || setTimeLeft(120)}
          >
            Пройти заново
          </Button>
          <Button className="cursor-pointer" onClick={() => navigate('/')}>
            Создать новый тест
          </Button>
        </div>
      </Card>
    </>
  )
}
