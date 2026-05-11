"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const masters = [
  {
    name: "Анна Морозова",
    role: "Колорист",
    appointments: 6,
    maxAppointments: 8,
    revenue: "42 000 ₽",
    status: "online",
  },
  {
    name: "Ольга Кузнецова",
    role: "Мастер маникюра",
    appointments: 7,
    maxAppointments: 8,
    revenue: "28 500 ₽",
    status: "online",
  },
  {
    name: "Дарья Соколова",
    role: "Стилист",
    appointments: 4,
    maxAppointments: 8,
    revenue: "18 000 ₽",
    status: "online",
  },
  {
    name: "Екатерина Лебедева",
    role: "Бровист",
    appointments: 5,
    maxAppointments: 6,
    revenue: "22 500 ₽",
    status: "break",
  },
]

export function MasterLoad() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Загруженность мастеров</CardTitle>
        <Badge variant="secondary" className="text-xs">Сегодня</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {masters.map((master) => {
          const load = Math.round((master.appointments / master.maxAppointments) * 100)
          return (
            <div key={master.name} className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                    {master.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                  master.status === "online" ? "bg-emerald-500" : "bg-amber-500"
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{master.name}</p>
                  <span className="text-xs text-muted-foreground">{master.revenue}</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        load >= 85 ? "bg-red-500" : load >= 60 ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                      style={{ width: `${load}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {master.appointments}/{master.maxAppointments}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
