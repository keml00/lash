"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Plus,
  Filter,
  PieChart,
  BarChart3,
  Wallet,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const monthlyRevenue = [
  { name: "Янв", income: 320000, expenses: 85000 },
  { name: "Фев", income: 345000, expenses: 92000 },
  { name: "Мар", income: 410000, expenses: 105000 },
  { name: "Апр", income: 385000, expenses: 98000 },
  { name: "Май", income: 450000, expenses: 112000 },
]

const expensesByCategory = [
  { name: "Материалы", value: 45000, color: "#7c3aed" },
  { name: "Аренда", value: 80000, color: "#3b82f6" },
  { name: "Зарплаты", value: 180000, color: "#10b981" },
  { name: "Маркетинг", value: 25000, color: "#f59e0b" },
  { name: "Прочее", value: 15000, color: "#6b7280" },
]

const revenueByMaster = [
  { name: "Анна М.", revenue: 185000, appointments: 42 },
  { name: "Ольга К.", revenue: 124000, appointments: 56 },
  { name: "Дарья С.", revenue: 98000, appointments: 38 },
  { name: "Екатерина Л.", revenue: 76000, appointments: 34 },
]

const revenueByService = [
  { name: "Окрашивание", revenue: 192000, color: "#7c3aed" },
  { name: "Маникюр", revenue: 134000, color: "#3b82f6" },
  { name: "Стрижка", revenue: 89000, color: "#10b981" },
  { name: "Ресницы", revenue: 72000, color: "#f43f5e" },
  { name: "Брови", revenue: 48000, color: "#f59e0b" },
]

const transactions = [
  { id: 1, type: "income", description: "Окрашивание — Елена С.", amount: 6500, date: "Сегодня, 12:00", category: "Услуги" },
  { id: 2, type: "income", description: "Маникюр + педикюр — Мария И.", amount: 4800, date: "Сегодня, 11:30", category: "Услуги" },
  { id: 3, type: "expense", description: "Закупка красок Wella", amount: -12400, date: "Сегодня, 09:00", category: "Материалы" },
  { id: 4, type: "income", description: "Стрижка + укладка — Анастасия К.", amount: 3200, date: "Вчера, 15:00", category: "Услуги" },
  { id: 5, type: "expense", description: "Аренда за май", amount: -80000, date: "1 мая", category: "Аренда" },
  { id: 6, type: "income", description: "Наращивание ресниц — Ирина В.", amount: 4500, date: "Вчера, 16:30", category: "Услуги" },
  { id: 7, type: "expense", description: "Реклама Instagram", amount: -15000, date: "Вчера", category: "Маркетинг" },
  { id: 8, type: "income", description: "Брови + ресницы — Татьяна М.", amount: 5200, date: "Вчера, 14:00", category: "Услуги" },
]

export default function FinancesPage() {
  const [period, setPeriod] = useState("month")

  const totalIncome = 450000
  const totalExpenses = 112000
  const profit = totalIncome - totalExpenses
  const profitMargin = ((profit / totalIncome) * 100).toFixed(1)

  return (
    <>
      <Header title="Финансы" subtitle="Доходы, расходы и аналитика" />

      <div className="p-6 space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +16.8%
                </span>
              </div>
              <p className="text-2xl font-bold">{totalIncome.toLocaleString("ru-RU")} ₽</p>
              <p className="text-sm text-muted-foreground">Доход за май</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-red-600" />
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-red-500">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +14.2%
                </span>
              </div>
              <p className="text-2xl font-bold">{totalExpenses.toLocaleString("ru-RU")} ₽</p>
              <p className="text-sm text-muted-foreground">Расходы за май</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-violet-500">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-violet-600" />
                </div>
                <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +18.4%
                </span>
              </div>
              <p className="text-2xl font-bold">{profit.toLocaleString("ru-RU")} ₽</p>
              <p className="text-sm text-muted-foreground">Чистая прибыль</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl font-bold">{profitMargin}%</p>
              <p className="text-sm text-muted-foreground">Маржинальность</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">Динамика доходов и расходов</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <Download className="w-3.5 h-3.5 mr-1" /> Экспорт
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenue} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", fontSize: "13px" }}
                      formatter={(value) => [`${Number(value).toLocaleString("ru-RU")} ₽`]}
                    />
                    <Bar dataKey="income" fill="#7c3aed" radius={[6, 6, 0, 0]} name="Доход" />
                    <Bar dataKey="expenses" fill="#f43f5e" radius={[6, 6, 0, 0]} name="Расходы" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Expenses Pie */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Структура расходов</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={expensesByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {expensesByCategory.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                      formatter={(value) => [`${Number(value).toLocaleString("ru-RU")} ₽`]}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {expensesByCategory.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-muted-foreground">{cat.name}</span>
                    </div>
                    <span className="font-medium">{cat.value.toLocaleString("ru-RU")} ₽</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue by Master & Service */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Доход по мастерам</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {revenueByMaster.map((master, i) => (
                <div key={master.name} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-muted-foreground w-5">{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium">{master.name}</span>
                      <span className="text-sm font-bold">{master.revenue.toLocaleString("ru-RU")} ₽</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                          style={{ width: `${(master.revenue / revenueByMaster[0].revenue) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{master.appointments} зап.</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Доход по услугам</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueByService} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#64748b" }} width={100} />
                    <Tooltip
                      contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "13px" }}
                      formatter={(value) => [`${Number(value).toLocaleString("ru-RU")} ₽`]}
                    />
                    <Bar dataKey="revenue" radius={[0, 6, 6, 0]} name="Доход">
                      {revenueByService.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-semibold">Последние транзакции</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1.5 h-8">
                <Filter className="w-3.5 h-3.5" /> Фильтр
              </Button>
              <Button size="sm" className="gap-1.5 h-8">
                <Plus className="w-3.5 h-3.5" /> Добавить
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      tx.type === "income" ? "bg-emerald-50" : "bg-red-50"
                    }`}>
                      {tx.type === "income" ? (
                        <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-bold ${tx.type === "income" ? "text-emerald-600" : "text-red-500"}`}>
                      {tx.type === "income" ? "+" : ""}{tx.amount.toLocaleString("ru-RU")} ₽
                    </p>
                    <Badge variant="secondary" className="text-[10px]">{tx.category}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
