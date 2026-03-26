import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../components/ui/chart"
// Sample IT Data: CPU usage across different servers
const chartData = [
  { month: "Jan", revenue2024: 4000, revenue2025: 5200 },
  { month: "Feb", revenue2024: 5200, revenue2025: 5800 },
  { month: "Mar", revenue2024: 800, revenue2025: 6100 },
  { month: "Apr", revenue2024: 7100, revenue2025: 6800 },
  { month: "May", revenue2024: 4900, revenue2025: 7200 },
  { month: "Jun", revenue2024: 9700, revenue2025: 8100 },
]

const chartConfig = {
  revenue2024: {
    label: "Last Year (2024)",
    color: "#94a3b8", // Muted slate
  },
  revenue2025: {
    label: "This Year (2025)",
    color: "#2563eb", // Vibrant blue
  },
}

const Chartbar = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Revenue Comparison</CardTitle>
        <CardDescription>Monthly performance: 2024 vs 2025</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Note: Ensure you have run 'npx shadcn@latest add chart' for these components */}
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 10, left: 10 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={false} 
                tickMargin={10}
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              
              <Bar 
                dataKey="revenue2024" 
                fill="var(--color-revenue2024)" 
                radius={[4, 4, 0, 0]} 
                barSize={30}
              />
              <Bar 
                dataKey="revenue2025" 
                fill="var(--color-revenue2025)" 
                radius={[4, 4, 0, 0]} 
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
    
  )
}

export default Chartbar
