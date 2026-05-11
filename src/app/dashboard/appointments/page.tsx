"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Scissors,
  MoreVertical,
  Filter,
} from "lucide-react"
import { NewAppointmentModal } from "@/components/modals/new-appointment-modal"
import { FilterModal } from "@/components/modals/filter-modal"

// Mock data for appointments
const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]

const calendarAppointments = [
  { id: 1, day: 0, startHour: 9, duration: 2, client: "Елена С.", service: "Окрашивание", master: "Анна М.", color: "bg-violet-500", textColor: "text-violet-50" },
  { id: 2, day: 0, startHour: 12, duration: 1.5, client: "Мария И.", service: "Маникюр", master: "Ольга К.", color: "bg-blue-500", textColor: "text-blue-50" },
  { id: 3, day: 1, startHour: 10, duration: 1, client: "Анастасия К.", service: "Стрижка", master: "Дарья С.", color: "bg-emerald-500", textColor: "text-emerald-50" },
  { id: 4, day: 1, startHour: 14, duration: 2, client: "Ирина В.", service: "Наращивание ресниц", master: "Анна М.", color: "bg-pink-500", textColor: "text-pink-50" },
  { id: 5, day: 2, startHour: 11, duration: 1, client: "Татьяна М.", service: "Брови", master: "Екатерина Л.", color: "bg-amber-500", textColor: "text-amber-50" },
  { id: 6, day: 2, startHour: 15, duration: 1.5, client: "Светлана П.", service: "Педикюр", master: "Ольга К.", color: "bg-teal-500", textColor: "text-teal-50" },
  { id: 7, day: 3, startHour: 9, duration: 1, client: "Ольга Н.", service: "Укладка", master: "Дарья С.", color: "bg-indigo-500", textColor: "text-indigo-50" },
  { id: 8, day: 3, startHour: 13, duration: 2.5, client: "Наталья Б.", service: "Окрашивание + стрижка", master: "Анна М.", color: "bg-violet-500", textColor: "text-violet-50" },
  { id: 9, day: 4, startHour: 10, duration: 1.5, client: "Юлия Г.", service: "Маникюр + педикюр", master: "Ольга К.", color: "bg-blue-500", textColor: "text-blue-50" },
  { id: 10, day: 4, startHour: 16, duration: 1, client: "Алина Д.", service: "Брови + ресницы", master: "Екатерина Л.", color: "bg-pink-500", textColor: "text-pink-50" },
  { id: 11, day: 5, startHour: 9, duration: 2, client: "Вероника Ш.", service: "Окрашивание", master: "Анна М.", color: "bg-violet-500", textColor: "text-violet-50" },
  { id: 12, day: 5, startHour: 12, duration: 1, client: "Кристина Р.", service: "Стрижка", master: "Дарья С.", color: "bg-emerald-500", textColor: "text-emerald-50" },
]

const listAppointments = [
  { id: 1, client: "Елена Смирнова", phone: "+7 (999) 123-45-67", service: "Окрашивание волос", master: "Анна Морозова", date: "Сегодня", time: "10:00 - 12:00", price: "6 500 ₽", status: "confirmed" },
  { id: 2, client: "Мария Иванова", phone: "+7 (925) 987-65-43", service: "Маникюр + покрытие гель-лак", master: "Ольга Кузнецова", date: "Сегодня", time: "11:30 - 13:00", price: "2 800 ₽", status: "in_progress" },
  { id: 3, client: "Анастасия Козлова", phone: "+7 (916) 555-33-22", service: "Стрижка + укладка", master: "Дарья Соколова", date: "Сегодня", time: "13:00 - 14:00", price: "3 200 ₽", status: "pending" },
  { id: 4, client: "Ирина Волкова", phone: "+7 (903) 222-11-00", service: "Наращивание ресниц 2D", master: "Анна Морозова", date: "Сегодня", time: "14:30 - 16:30", price: "4 500 ₽", status: "confirmed" },
  { id: 5, client: "Татьяна Морозова", phone: "+7 (977) 444-55-66", service: "Коррекция + окрашивание бровей", master: "Екатерина Лебедева", date: "Сегодня", time: "15:00 - 16:00", price: "2 200 ₽", status: "pending" },
  { id: 6, client: "Светлана Петрова", phone: "+7 (926) 777-88-99", service: "Педикюр", master: "Ольга Кузнецова", date: "Завтра", time: "10:00 - 11:30", price: "3 000 ₽", status: "confirmed" },
  { id: 7, client: "Ольга Новикова", phone: "+7 (915) 111-22-33", service: "Укладка праздничная", master: "Дарья Соколова", date: "Завтра", time: "12:00 - 13:00", price: "2 500 ₽", status: "confirmed" },
]

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "info" | "destructive" }> = {
  confirmed: { label: "Подтверждена", variant: "success" },
  in_progress: { label: "В процессе", variant: "info" },
  pending: { label: "Ожидает", variant: "warning" },
  cancelled: { label: "Отменена", variant: "destructive" },
}

export default function AppointmentsPage() {
  const [view, setView] = useState("calendar")
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const [showFilter, setShowFilter] = useState(false)

  return (
    <>
      <Header title="Записи" subtitle="Управление записями клиентов" />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Tabs value={view} onValueChange={setView}>
            <TabsList>
              <TabsTrigger value="calendar" className="gap-1.5">
                <Calendar className="w-4 h-4" />
                Календарь
              </TabsTrigger>
              <TabsTrigger value="list" className="gap-1.5">
                <Clock className="w-4 h-4" />
                Список
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setShowFilter(true)}>
              <Filter className="w-4 h-4" />
              Фильтр
            </Button>
            <Button size="sm" className="gap-1.5 shadow-lg shadow-primary/25" onClick={() => setShowNewAppointment(true)}>
              <Plus className="w-4 h-4" />
              Новая запись
            </Button>
          </div>
        </div>

        <NewAppointmentModal open={showNewAppointment} onOpenChange={setShowNewAppointment} />
        <FilterModal open={showFilter} onOpenChange={setShowFilter} type="appointments" />

        {/* Calendar View */}
        {view === "calendar" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <CardTitle className="text-base font-semibold">12 — 18 мая 2025</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm">Сегодня</Button>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <div className="min-w-[800px]">
                  {/* Day headers */}
                  <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border/50">
                    <div className="p-2" />
                    {weekDays.map((day, i) => (
                      <div key={day} className={`p-3 text-center border-l border-border/50 ${i === 0 ? "bg-primary/5" : ""}`}>
                        <p className="text-xs text-muted-foreground">{day}</p>
                        <p className={`text-lg font-semibold mt-0.5 ${i === 0 ? "text-primary" : ""}`}>
                          {12 + i}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Time grid */}
                  <div className="relative">
                    {timeSlots.map((time) => (
                      <div key={time} className="grid grid-cols-[60px_repeat(7,1fr)] h-16 border-b border-border/30">
                        <div className="p-2 text-xs text-muted-foreground text-right pr-3 -mt-2">
                          {time}
                        </div>
                        {weekDays.map((_, i) => (
                          <div key={i} className="border-l border-border/30 hover:bg-muted/30 transition-colors cursor-pointer" />
                        ))}
                      </div>
                    ))}

                    {/* Appointment blocks */}
                    {calendarAppointments.map((apt) => {
                      const top = (apt.startHour - 9) * 64 + 4
                      const height = apt.duration * 64 - 8
                      const left = `calc(60px + ${apt.day} * ((100% - 60px) / 7) + 4px)`
                      const width = `calc((100% - 60px) / 7 - 8px)`

                      return (
                        <div
                          key={apt.id}
                          className={`absolute rounded-lg ${apt.color} ${apt.textColor} p-2 cursor-pointer hover:opacity-90 transition-opacity shadow-sm overflow-hidden`}
                          style={{ top: `${top}px`, height: `${height}px`, left, width }}
                        >
                          <p className="text-xs font-semibold truncate">{apt.client}</p>
                          <p className="text-[10px] opacity-80 truncate">{apt.service}</p>
                          {height > 50 && (
                            <p className="text-[10px] opacity-70 mt-0.5">{apt.master}</p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* List View */}
        {view === "list" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left text-xs font-medium text-muted-foreground p-4">Клиент</th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-4">Услуга</th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-4 hidden md:table-cell">Мастер</th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-4">Дата и время</th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-4 hidden lg:table-cell">Стоимость</th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-4">Статус</th>
                        <th className="p-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {listAppointments.map((apt) => (
                        <tr key={apt.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                  {apt.client.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{apt.client}</p>
                                <p className="text-xs text-muted-foreground">{apt.phone}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <p className="text-sm">{apt.service}</p>
                          </td>
                          <td className="p-4 hidden md:table-cell">
                            <p className="text-sm text-muted-foreground">{apt.master}</p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-medium">{apt.date}</p>
                            <p className="text-xs text-muted-foreground">{apt.time}</p>
                          </td>
                          <td className="p-4 hidden lg:table-cell">
                            <p className="text-sm font-semibold">{apt.price}</p>
                          </td>
                          <td className="p-4">
                            <Badge variant={statusConfig[apt.status].variant}>
                              {statusConfig[apt.status].label}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </>
  )
}
