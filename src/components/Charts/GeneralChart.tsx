import React from 'react'
import { CartesianGrid, Label, Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'
import { getGeneralResults } from '@/lib/utils'
import { chartConfig, CustomTooltip } from '../ChartComponent'

export const GeneralChart = () => {
  const chartData = getGeneralResults()

  return (
    <Card className="my-10 w-fit">
      <CardHeader className="text-center">
        <CardTitle>Статистика по проценту правильных ответов</CardTitle>
        <CardDescription>Ваши результаты за все время</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <ChartContainer config={chartConfig} className="h-48">
          <LineChart
            width={800} // Увеличиваем ширину графика
            height={400}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="index"
              axisLine={false}
              padding={{ left: 20, right: 20 }}
              tickMargin={8}
              interval={Math.round(chartData.length / 5)} // Устанавливаем интервал между отметками на оси X
            >
              <Label value="Число вопросов" position="bottom" />
            </XAxis>
            <YAxis type="number" tickLine={false} axisLine={false}>
              <Label value="Процент" position="insideLeft" offset={25} angle={-90} style={{ textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip
              cursor={false}
              content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />}
            />
            <Line dataKey="correctPercentage" type="linear" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <div className="leading-none text-muted-foreground"></div>
    </Card>
  )
}
