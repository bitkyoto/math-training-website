import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { Label } from '../ui/label'
import { RadioGroupItem } from '../ui/radio-group'
import { useDispatch, useSelector } from 'react-redux'
import { setTypeMode } from '@/redux/typeModeSlice'
export function OptionsCardForm() {
  const dispatch = useDispatch()
  const [selectedValue, setSelectedValue] = useState('calculus')
  useEffect(() => {
    dispatch(setTypeMode(selectedValue))
  }, [selectedValue, dispatch])

  return (
    <Card className="w-[350px] h-full">
      <CardHeader>
        <CardTitle>Режим тестирования</CardTitle>
        <CardDescription>Выберите желаемый режим, в котором вы хотите потренировать свои навыки</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
          <div className="flex items-center gap-3 mb-3">
            <RadioGroupItem value="calculus" id="r1" />
            <Label htmlFor="r1">Алгебраические операции</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="memory" id="r2" />
            <Label htmlFor="r2">Память</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
