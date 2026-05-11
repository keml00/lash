"use client"

import React from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  Scissors,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { AppointmentsList } from "@/components/dashboard/appointments-list"
import { PopularServices } from "@/components/dashboard/popular-services"
import { MasterLoad } from "@/components/dashboard/master-load"

const stats = [
  {
    title: "Записей сегодня",
    value: "12",
    change: "+3",
    trend: "up",
    icon: Calendar,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Доход за неделю",
    value: "87 500 ₽",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "Новых клиентов",
    value: "24",
    change: "+8",
    trend: "up",
    icon: Users,
    color: "bg-violet-500/10 text-violet-600",
  },
  {
    title: "Средний чек",
    value: "3 200 ₽",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
    color: "bg-amber-500/10 text-amber-600",
  },
]

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  return (
    <>
      <Header title="Дашборд" subtitle="Обзор за сегодня" />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <motion.div key={stat.title} variants={fadeIn}>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-medium ${
                      stat.trend === "up" ? "text-emerald-600" : "text-red-500"
                    }`}>
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{stat.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>
          <PopularServices />
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          <AppointmentsList />
          <MasterLoad />
        </div>
      </div>
    </>
  )
}
