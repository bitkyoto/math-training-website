import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Input } from '../ui/input'
import { useEffect, useState } from 'react'
import { setMemoryMode } from '@/redux/memoryModeSlice'

const memorySchema = z.object({
  amountOfTasks: z.number().min(10, 'Минимальное число вопросов 10').max(100, 'Максимальное число вопросов 100'),
  time: z.number().min(5, 'Минимальное время 5 секунд').max(20, 'Максимальное время 20 секунд'),
  timeToAnswer: z.number().min(1, 'Минимальное время 1 секунда').max(10, 'Максимальное время 10 секунд'),
})

type MemoryFormData = z.infer<typeof memorySchema>

export const MemorySettingsForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<MemoryFormData>({
    resolver: zodResolver(memorySchema),
    defaultValues: {
      amountOfTasks: 10,
      time: 10,
      timeToAnswer: 5,
    },
  })
  const [amountOfTasks, setAmountOfTasks] = useState<number>(10)
  const [time, setTime] = useState<number>(10)
  const [timeToAnswer, setTimeToAnswer] = useState<number>(5)
  useEffect(() => {
    setValue('amountOfTasks', amountOfTasks)
  }, [amountOfTasks, setValue])

  useEffect(() => {
    setValue('time', time)
  }, [time, setValue])

  useEffect(() => {
    setValue('timeToAnswer', timeToAnswer)
  }, [timeToAnswer, setValue])

  const onSubmit = (data: MemoryFormData) => {
    dispatch(setMemoryMode(data))
    navigate('/play')
  }
  return (
    <>
      <Card className="w-[350px] h-full">
        <CardHeader>
          <CardTitle>Настройки тестирования</CardTitle>
          <CardDescription>Выберите желаемые настройки для вашего задания</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
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
              </div>
              <div>
                <p className="mb-4">Время на ответ на вопрос (5 - 20с):</p>
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
              <div>
                <p className="mb-4">Время на запоминание (1 - 10с):</p>
                <Input
                  className="mb-2"
                  value={timeToAnswer}
                  onChange={(e) => {
                    if (e.target.value) {
                      setTimeToAnswer(parseInt(e.target.value))
                    } else {
                      setTimeToAnswer(0)
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
