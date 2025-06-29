import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { ResultTask } from '@/types/Task'
import { useNavigate } from 'react-router'
import { writeResults } from '@/lib/utils'

interface ReportProps {
  tasks: ResultTask[]
  resetTest: () => void
}

export const Report = ({ tasks, resetTest }: ReportProps) => {
  const navigate = useNavigate()
  useEffect(() => writeResults(tasks), [tasks])

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
                  <div className="flex justify-between">
                    <span>
                      {result.question} = {result.userAnswer}
                    </span>
                    <span>{result.isCorrect ? 'Правильно' : result.userAnswer === undefined ? '' : 'Неправильно'}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <div className="flex flex-col justify-center mx-auto w-50 px-6 gap-4">
          <Button className="cursor-pointer bg-destructive" onClick={resetTest}>
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
