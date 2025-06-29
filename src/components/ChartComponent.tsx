import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { GeneralChart } from './Charts/GeneralChart'

export function ChartComponent() {
  return (
    <>
      <div className="flex px-[10%] justify-start">
        <GeneralChart />
      </div>
    </>
  )
}

export const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig
export const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].value}%`}</p>
      </div>
    )
  }

  return null
}
