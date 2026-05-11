"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock } from "lucide-react"

const appointments = [
  {
    id: 1,
    client: "Елена Смирнова",
    service: "Окрашивание",
    master: "Анна М.",
    time: "10:00",
    duration: "2ч",
    status: "confirmed",
    color: "bg-blue-500",
  },
  {
    id: 2,
    client: "Мария Иванова",
    service: "Маникюр + покрытие",
    master: "Ольга К.",
    time: "11:30",
    duration: "1.5ч",
    status: "in_progress",
    color: "bg-violet-500",
  },
  {
    id: 3,
    client: "Анастасия Козлова",
    service: "Стрижка + укладка",
    master: "Дарья С.",
    time: "13:00",
    duration: "1ч",
    status: "pending",
    color: "bg-amber-500",
  },
  {
    id: 4,
    client: "Ирина Волкова",
    service: "Наращивание ресниц",
    master: "Анна М.",
    time: "14:30",
    duration: "2ч",
    status: "confirmed",
    color: "bg-pink-500",
  },
  {
    id: 5,
    client: "Татьяна Морозова",
    service: "Брови",
    master: "Екатерина Л.",
    time: "15:00",
    duration: "1ч",
    status: "pending",
    color: "bg-emerald-500",
  },
]

const statusMap: Record<string, { label: string; variant: "success" | "warning" | "info" }> = {
  confirmed: { label: "Подтверждена", variant: "success" },
  in_progress: { label: "В процессе", variant: "info" },
  pending: { label: "Ожидает", variant: "warning" },
}

export function AppointmentsList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Ближайшие записи</CardTitle>
        <Badge variant="secondary" className="text-xs">Сегодня</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
          >
            <div className={`w-1 h-10 rounded-full ${apt.color}`} />
            <Avatar className="h-9 w-9">
              <AvatarFallback className="text-xs bg-muted">
                {apt.client.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{apt.client}</p>
              <p className="text-xs text-muted-foreground truncate">{apt.service} • {apt.master}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-center gap-1 text-sm font-medium">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                {apt.time}
              </div>
              <Badge variant={statusMap[apt.status].variant} className="mt-1 text-[10px]">
                {statusMap[apt.status].label}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
