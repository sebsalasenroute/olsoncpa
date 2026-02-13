"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { CalculatorChart as CalculatorChartType } from "@/lib/calculators/types";

type CalculatorChartProps = {
  chart: CalculatorChartType;
};

export function CalculatorChart({ chart }: CalculatorChartProps) {
  return (
    <div className="h-80 w-full rounded-lg border border-slate-200 bg-white p-3">
      <ResponsiveContainer>
        {chart.type === "bar" ? (
          <BarChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
            <XAxis dataKey={chart.xKey} fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            {chart.series.map((series) => (
              <Bar key={series.key} dataKey={series.key} name={series.name} fill={series.color} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        ) : chart.type === "area" ? (
          <AreaChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
            <XAxis dataKey={chart.xKey} fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            {chart.series.map((series) => (
              <Area
                key={series.key}
                type="monotone"
                dataKey={series.key}
                name={series.name}
                stroke={series.color}
                fill={series.color}
                fillOpacity={0.2}
              />
            ))}
          </AreaChart>
        ) : (
          <LineChart data={chart.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
            <XAxis dataKey={chart.xKey} fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip />
            <Legend />
            {chart.series.map((series) => (
              <Line
                key={series.key}
                type="monotone"
                dataKey={series.key}
                name={series.name}
                stroke={series.color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
