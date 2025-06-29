import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { useDispatch, useSelector } from 'react-redux'
import { setCalculusMode } from '@/redux/calculusModeSlice'
import { useNavigate } from 'react-router'
import { Input } from '../ui/input'
import { useEffect, useState } from 'react'

type Operation = {
  id: number
  title: string
}

const operations: Operation[] = [
  { id: 1, title: 'Сложение' },
  { id: 2, title: 'Вычитание' },
  { id: 3, title: 'Умножение' },
  { id: 4, title: 'Деление' },
]

type NumberType = {
  id: number
  title: string
}

const numbers: NumberType[] = [
  { id: 1, title: 'Однозначные' },
  { id: 2, title: 'Двузначные' },
  { id: 3, title: 'Трехзначные' },
]

const schema = z.object({
  selectedOperations: z.array(z.number()).refine((value) => value.length > 0, {
    message: 'Выберите хотя бы одну операцию',
  }),
  selectedNumbers: z.array(z.number()).refine((value) => value.length > 0, {
    message: 'Выберите хотя бы одно число',
  }),
  amountOfTasks: z.number().min(10, 'Минимальное число вопросов 10').max(100, 'Максимальное число вопросов 100'),
  time: z.number().min(20, 'Минимальное время 20 секунд').max(3600, 'Максимальное время 1 час'),
})

export type FormData = z.infer<typeof schema>

export const CalculusSettingsForm = () => {
  const dispatch = useDispatch()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      selectedOperations: [2],
      selectedNumbers: [1],
      amountOfTasks: 20,
      time: 120,
    },
  })

  const [selectedOperations, setSelectedOperations] = useState<number[]>([1])
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([1])
  const [amountOfTasks, setAmountOfTasks] = useState<number>(20)
  const [time, setTime] = useState<number>(120)

  const navigate = useNavigate()

  useEffect(() => {
    setValue('selectedOperations', selectedOperations)
  }, [selectedOperations, setValue])

  useEffect(() => {
    setValue('selectedNumbers', selectedNumbers)
  }, [selectedNumbers, setValue])

  useEffect(() => {
    setValue('amountOfTasks', amountOfTasks)
  }, [amountOfTasks, setValue])

  useEffect(() => {
    setValue('time', time)
  }, [time, setValue])

  const onSubmit = (data: FormData) => {
    dispatch(setCalculusMode(data))
    navigate('/play')
  }

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Настройки тестирования</CardTitle>
          <CardDescription>Выберите желаемые настройки для вашего задания</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <p>Выберите желаемые операции:</p>
              {errors.selectedOperations && <p className="text-red-500 text-sm">{errors.selectedOperations.message}</p>}
              <div className="flex flex-col gap-y-3">
                {operations.map((op) => (
                  <div key={op.id} className="flex items-center space-x-2 text-muted-foreground">
                    <Checkbox
                      className="cursor-pointer"
                      id={`op-${op.id}`}
                      checked={selectedOperations.includes(op.id)}
                      onCheckedChange={(checked) => {
                        setSelectedOperations((prev) =>
                          checked ? [...prev, op.id] : prev.filter((id) => id !== op.id)
                        )
                      }}
                    />
                    <label
                      htmlFor={`op-${op.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {op.title}
                    </label>
                  </div>
                ))}
              </div>
              <p>Выберите желаемые числа:</p>
              {errors.selectedNumbers && <p className="text-red-500 text-sm">{errors.selectedNumbers.message}</p>}
              <div className="flex flex-col gap-y-3">
                {numbers.map((num) => (
                  <div key={num.id} className="flex items-center space-x-2 text-muted-foreground">
                    <Checkbox
                      className="cursor-pointer"
                      id={`num-${num.id}`}
                      checked={selectedNumbers.includes(num.id)}
                      onCheckedChange={(checked) => {
                        setSelectedNumbers((prev) => (checked ? [...prev, num.id] : prev.filter((id) => id !== num.id)))
                      }}
                    />
                    <label
                      htmlFor={`num-${num.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {num.title}
                    </label>
                  </div>
                ))}
              </div>
              <div>
                <p className="mb-4">Число вопросов (10 - 100):</p>
                <Input
                  className="mb-2"
                  value={amountOfTasks}
                  onChange={(e) => {
                    if (e.target.value) {
                      setAmountOfTasks(parseInt(e.target.value))
                    } else {
                      setAmountOfTasks(0)
                    }
                  }}
                />
                {errors.amountOfTasks && <p className="text-red-500 text-base">{errors.amountOfTasks.message}</p>}
                <p className="mb-4">Время в секундах (20 - 3600с):</p>
                <Input
                  className="mb-2"
                  value={time}
                  onChange={(e) => {
                    if (e.target.value) {
                      setTime(parseInt(e.target.value))
                    } else {
                      setTime(0)
                    }
                  }}
                />
                {errors.time && <p className="text-red-500 text-base">{errors.time.message}</p>}
              </div>
            </div>
            <CardFooter className="mt-4 flex justify-center">
              <Button className="cursor-pointer" type="submit" autoFocus>
                Начать
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
