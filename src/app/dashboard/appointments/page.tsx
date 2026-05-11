"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Plus,
  ChevronLeft,
  ChevronRight,
  Clock,
  MoreVertical,
  Filter,
  Trash2,
} from "lucide-react"
import { NewAppointmentModal } from "@/components/modals/new-appointment-modal"
import { FilterModal } from "@/components/modals/filter-modal"
import { useStore } from "@/lib/store"
import { useToast } from "@/components/ui/toast"

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"]

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "info" | "destructive" }> = {
  confirmed: { label: "Подтверждена", variant: "success" },
  in_progress: { label: "В процессе", variant: "info" },
  pending: { label: "Ожидает", variant: "warning" },
  completed: { label: "Завершена", variant: "success" },
  cancelled: { label: "Отменена", variant: "destructive" },
}

export default function AppointmentsPage() {
  const [view, setView] = useState("calendar")
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const { appointments, appFilter, deleteAppointment, updateAppointment } = useStore()
  const { showToast } = useToast()

  // Filter appointments
  const filtered = useMemo(() => {
    return appointments.filter((apt) => {
      if (appFilter.status && apt.status !== appFilter.status) return false
      if (appFilter.master && apt.master !== appFilter.master) return false
      if (appFilter.service && apt.service !== appFilter.service) return false
      if (appFilter.dateFrom && apt.date < appFilter.dateFrom) return false
      if (appFilter.dateTo && apt.date > appFilter.dateTo) return false
      return true
    })
  }, [appointments, appFilter])

  // Calendar: group by day offset from Monday
  const calendarApps = useMemo(() => {
    return filtered.map((apt) => {
      const d = new Date(apt.date)
      const dayOfWeek = (d.getDay() + 6) % 7 // Monday=0
      const hour = parseInt(apt.time.split(":")[0])
      const min = parseInt(apt.time.split(":")[1]) || 0
      const startHour = hour + min / 60
      return { ...apt, day: dayOfWeek, startHour, durationHours: apt.duration / 60 }
    })
  }, [filtered])

  const handleDelete = (id: string) => {
    deleteAppointment(id)
    showToast("Запись удалена", "info")
  }

  const handleCancel = (id: string) => {
    updateAppointment(id, { status: "cancelled" })
    showToast("Запись отменена")
  }

  return (
    <>
      <Header title="Записи" subtitle={`${filtered.length} записей`} />

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
              {(appFilter.status || appFilter.master || appFilter.service) && (
                <span className="w-2 h-2 rounded-full bg-primary" />
              )}
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
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
                        <p className={`text-lg font-semibold mt-0.5 ${i === 0 ? "text-primary" : ""}`}>{12 + i}</p>
                      </div>
                    ))}
                  </div>

                  {/* Time grid */}
                  <div className="relative">
                    {timeSlots.map((time) => (
                      <div key={time} className="grid grid-cols-[60px_repeat(7,1fr)] h-16 border-b border-border/30">
                        <div className="p-2 text-xs text-muted-foreground text-right pr-3 -mt-2">{time}</div>
                        {weekDays.map((_, i) => (
                          <div key={i} className="border-l border-border/30 hover:bg-muted/30 transition-colors cursor-pointer" />
                        ))}
                      </div>
                    ))}

                    {/* Appointment blocks from store */}
                    {calendarApps.map((apt) => {
                      if (apt.day < 0 || apt.day > 6) return null
                      const top = (apt.startHour - 9) * 64 + 4
                      const height = apt.durationHours * 64 - 8
                      if (top < 0 || height <= 0) return null
                      const left = `calc(60px + ${apt.day} * ((100% - 60px) / 7) + 4px)`
                      const width = `calc((100% - 60px) / 7 - 8px)`

                      return (
                        <div
                          key={apt.id}
                          className={`absolute rounded-lg ${apt.color} text-white p-2 cursor-pointer hover:opacity-90 transition-opacity shadow-sm overflow-hidden ${apt.status === "cancelled" ? "opacity-40 line-through" : ""}`}
                          style={{ top: `${top}px`, height: `${height}px`, left, width }}
                        >
                          <p className="text-xs font-semibold truncate">{apt.client}</p>
                          <p className="text-[10px] opacity-80 truncate">{apt.serviceName}</p>
                          {height > 50 && (
                            <p className="text-[10px] opacity-70 mt-0.5">{apt.masterName}</p>
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardContent className="p-0">
                {filtered.length === 0 ? (
                  <div className="p-12 text-center">
                    <Calendar className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Нет записей. Создайте первую!</p>
                  </div>
                ) : (
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
                        {filtered.map((apt) => (
                          <tr key={apt.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-[10px] bg-primary/10 text-primary">
                                    {apt.client.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">{apt.client}</p>
                                  <p className="text-xs text-muted-foreground">{apt.phone}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <p className="text-sm">{apt.serviceName}</p>
                            </td>
                            <td className="p-4 hidden md:table-cell">
                              <p className="text-sm text-muted-foreground">{apt.masterName}</p>
                            </td>
                            <td className="p-4">
                              <p className="text-sm font-medium">{apt.date}</p>
                              <p className="text-xs text-muted-foreground">{apt.time} ({apt.duration} мин)</p>
                            </td>
                            <td className="p-4 hidden lg:table-cell">
                              <p className="text-sm font-semibold">{apt.price.toLocaleString("ru-RU")} ₽</p>
                            </td>
                            <td className="p-4">
                              <Badge variant={statusConfig[apt.status]?.variant || "secondary"}>
                                {statusConfig[apt.status]?.label || apt.status}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-1">
                                {apt.status !== "cancelled" && (
                                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCancel(apt.id)} title="Отменить">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                )}
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={() => handleDelete(apt.id)} title="Удалить">
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </>
  )
}
