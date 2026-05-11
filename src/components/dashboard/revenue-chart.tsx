"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const weekData = [
  { name: "Пн", revenue: 12500, expenses: 3200 },
  { name: "Вт", revenue: 18200, expenses: 4100 },
  { name: "Ср", revenue: 15800, expenses: 2800 },
  { name: "Чт", revenue: 22400, expenses: 5600 },
  { name: "Пт", revenue: 28900, expenses: 4200 },
  { name: "Сб", revenue: 35200, expenses: 6800 },
  { name: "Вс", revenue: 8400, expenses: 1200 },
]

const monthData = [
  { name: "1 нед", revenue: 87500, expenses: 22000 },
  { name: "2 нед", revenue: 95200, expenses: 24500 },
  { name: "3 нед", revenue: 102800, expenses: 28000 },
  { name: "4 нед", revenue: 91400, expenses: 21000 },
]

export function RevenueChart() {
  const [period, setPeriod] = React.useState("week")
  const data = period === "week" ? weekData : monthData

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">Доходы и расходы</CardTitle>
        <Tabs value={period} onValueChange={setPeriod}>
          <TabsList className="h-8">
            <TabsTrigger value="week" className="text-xs px-2.5">Неделя</TabsTrigger>
            <TabsTrigger value="month" className="text-xs px-2.5">Месяц</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#94a3b8" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  fontSize: "13px",
                }}
                formatter={(value) => [`${Number(value).toLocaleString("ru-RU")} ₽`]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#7c3aed"
                strokeWidth={2.5}
                fill="url(#colorRevenue)"
                name="Доход"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#f43f5e"
                strokeWidth={2}
                fill="url(#colorExpenses)"
                name="Расходы"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-violet-600" />
            <span className="text-sm text-muted-foreground">Доход</span>
            <span className="text-sm font-semibold">141 400 ₽</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="text-sm text-muted-foreground">Расходы</span>
            <span className="text-sm font-semibold">27 900 ₽</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
