"use client"

import { Pie, PieChart, Cell,} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../components/ui/chart"

// Data: Contribution of each month to the Total Revenue for 2025
const chartData = [
  { month: "Jan", revenue: 5200, fill: "var(--color-jan)" },
  { month: "Feb", revenue: 5800, fill: "var(--color-feb)" },
  { month: "Mar", revenue: 6100, fill: "var(--color-mar)" },
  { month: "Apr", revenue: 6800, fill: "var(--color-apr)" },
  { month: "May", revenue: 7200, fill: "var(--color-may)" },
  { month: "Jun", revenue: 8100, fill: "var(--color-jun)" },
]

const chartConfig = {
  revenue: { label: "Revenue" },
  jan: { label: "January", color: "#2563eb" },
  feb: { label: "February", color: "#3b82f6" },
  mar: { label: "March", color: "#60a5fa" },
  apr: { label: "April", color: "#93c5fd" },
  may: { label: "May", color: "#bfdbfe" },
  jun: { label: "June", color: "#dbeafe" },
}

export function RevenuePieChart() {
  return (
    <Card className="flex ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Revenue Distribution</CardTitle>
        <CardDescription>H1 2025 Revenue Share by Month</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="revenue"
              nameKey="month"
              innerRadius={60} // Makes it a "Donut" chart (modern look)
              strokeWidth={5}
            >
               {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent />} className="-translate-y-2 flex-wrap" />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}