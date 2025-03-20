import { CartesianGrid, Label, Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { getAveragePercentage, getResults } from '@/lib/utils'

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function ChartComponent() {
  const chartData = getResults()
  const averagePercentage = getAveragePercentage(chartData)

  return (
    <Card className="my-10 max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle>Статистика по проценту правильных ответов</CardTitle>
        <CardDescription>Ваши результаты за все время</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <ChartContainer config={chartConfig} className="h-48">
          <LineChart
            width={400}
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
            <XAxis dataKey="tasks" axisLine={false} padding={{ left: 20, right: 0 }} tickMargin={8}>
              <Label value="Число вопросов" position="top" offset={147.5} />
            </XAxis>
            <YAxis type="number" tickLine={false} axisLine={false}>
              <Label value="Процент" position="insideLeft" offset={25} angle={-90} style={{ textAnchor: 'middle' }} />
            </YAxis>
            <Tooltip
              cursor={false}
              content={<CustomTooltip active={undefined} payload={undefined} label={undefined} />}
            />
            <Line dataKey="correctPercentage" type="natural" stroke="var(--chart-1)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <div className="flex flex-col gap-2 font-medium leading-none text-center justify-center items-center">
        <p>Ваш средний процент правильных ответов: {averagePercentage.toFixed(1)}%</p>
      </div>
      <div className="leading-none text-muted-foreground"></div>
    </Card>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value}%`}</p>
      </div>
    )
  }

  return null
}
