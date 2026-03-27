import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartTooltipContent,
  ChartLegendContent,
} from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { type ChartConfig } from "../../components/ui/chart";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../db";
import { ChartCandlestick } from 'lucide-react'

export const Attendschart = () => {
  const Employeesdatadb = useLiveQuery(() => db.Employeesdata.toArray());
  const chartConfig = {
    desktop: {
      label: "Total Days",
      color: "#2563eb",
    },
    mobile: {
      label: "Login Days",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const totalDays = new Date(year, month, 0).getDate();
  const chartData =
    Employeesdatadb?.map((item) => ({
      month: item.Employeename,
      desktop: totalDays,
      mobile: 15,
    })) || [];
  return (
    <>
      <div className="bg-white w-full p-4 sm:p-6 rounded-2xl border border-gray-300">
        <div className="mb-4">
          <span className="font-semibold text-sm sm:text-base">
            <div className="flex gap-1.5 "><ChartCandlestick className="text-blue-500" /><p>Employees Attendance Chart</p></div>
          </span>
        </div>

        <div className="w-full h-[250px] sm:h-[300px] md:h-[350px]">
          <ChartContainer config={chartConfig} className="w-full h-full">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </>
  );
};
