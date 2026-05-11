"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/toast"
import {
  Bell,
  Check,
  CheckCheck,
  Calendar,
  Users,
  Package,
  AlertTriangle,
  MessageSquare,
  Trash2,
  Settings,
} from "lucide-react"

interface Notification {
  id: string
  type: "appointment" | "client" | "material" | "system" | "message"
  title: string
  description: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "appointment",
    title: "Новая запись",
    description: "Елена Смирнова записалась на окрашивание на 14 мая, 10:00",
    time: "5 мин назад",
    read: false,
  },
  {
    id: "2",
    type: "appointment",
    title: "Напоминание",
    description: "Через 2 часа запись: Мария Иванова — Маникюр (11:30)",
    time: "10 мин назад",
    read: false,
  },
  {
    id: "3",
    type: "material",
    title: "Заканчивается материал",
    description: "Оксид 6% Wella — осталось 3 л (минимум 5 л). Требуется закупка.",
    time: "30 мин назад",
    read: false,
  },
  {
    id: "4",
    type: "client",
    title: "Новый клиент",
    description: "Виктория Сидорова зарегистрировалась через QR-код",
    time: "1 час назад",
    read: false,
  },
  {
    id: "5",
    type: "message",
    title: "Отзыв от клиента",
    description: "Ирина Волкова оставила отзыв: ⭐⭐⭐⭐⭐ «Отличный сервис!»",
    time: "2 часа назад",
    read: true,
  },
  {
    id: "6",
    type: "appointment",
    title: "Отмена записи",
    description: "Татьяна Морозова отменила запись на 15 мая, 15:00 (Брови)",
    time: "3 часа назад",
    read: true,
  },
  {
    id: "7",
    type: "system",
    title: "Обновление системы",
    description: "Glamify обновлён до версии 2.4. Новые функции: AI-рекомендации по записи.",
    time: "Вчера",
    read: true,
  },
  {
    id: "8",
    type: "material",
    title: "Срок годности",
    description: "Клей для ресниц Lovely — истекает через 30 дней (01.08.2025)",
    time: "Вчера",
    read: true,
  },
  {
    id: "9",
    type: "client",
    title: "День рождения клиента",
    description: "Завтра день рождения у Марии Ивановой. Отправить поздравление?",
    time: "Вчера",
    read: true,
  },
  {
    id: "10",
    type: "appointment",
    title: "Запись подтверждена",
    description: "Анастасия Козлова подтвердила запись на 13 мая, 13:00",
    time: "2 дня назад",
    read: true,
  },
]

const typeConfig: Record<string, { icon: React.ElementType; color: string }> = {
  appointment: { icon: Calendar, color: "bg-blue-500/10 text-blue-600" },
  client: { icon: Users, color: "bg-emerald-500/10 text-emerald-600" },
  material: { icon: Package, color: "bg-amber-500/10 text-amber-600" },
  system: { icon: AlertTriangle, color: "bg-violet-500/10 text-violet-600" },
  message: { icon: MessageSquare, color: "bg-pink-500/10 text-pink-600" },
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [filter, setFilter] = useState<"all" | "unread">("all")
  const { showToast } = useToast()

  const unreadCount = notifications.filter((n) => !n.read).length
  const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    showToast("Все уведомления прочитаны")
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    showToast("Уведомление удалено", "info")
  }

  const clearAll = () => {
    setNotifications([])
    showToast("Все уведомления очищены", "info")
  }

  return (
    <>
      <Header title="Уведомления" subtitle={`${unreadCount} непрочитанных`} />

      <div className="p-6 space-y-6">
        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
            >
              Все ({notifications.length})
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unread")}
            >
              Непрочитанные ({unreadCount})
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={markAllRead}>
              <CheckCheck className="w-4 h-4" />
              Прочитать все
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 text-red-500 hover:text-red-600" onClick={clearAll}>
              <Trash2 className="w-4 h-4" />
              Очистить
            </Button>
          </div>
        </div>

        {/* Notifications List */}
        {filtered.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-1">Нет уведомлений</h3>
              <p className="text-sm text-muted-foreground">
                {filter === "unread" ? "Все уведомления прочитаны" : "Здесь будут появляться уведомления о записях, клиентах и материалах"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <motion.div
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.03 } } }}
            className="space-y-2"
          >
            {filtered.map((notification) => {
              const config = typeConfig[notification.type]
              const Icon = config.icon
              return (
                <motion.div
                  key={notification.id}
                  variants={{ initial: { opacity: 0, y: 5 }, animate: { opacity: 1, y: 0 } }}
                >
                  <Card
                    className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
                      !notification.read ? "border-l-4 border-l-primary bg-primary/[0.02]" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${config.color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className={`text-sm ${!notification.read ? "font-semibold" : "font-medium"}`}>
                                {notification.title}
                              </p>
                              <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                                {notification.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              {!notification.read && (
                                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 opacity-0 group-hover:opacity-100"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteNotification(notification.id)
                                }}
                              >
                                <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1.5">{notification.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {/* Notification Settings Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Настройки уведомлений
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { channel: "SMS", description: "Напоминания клиентам за 24ч и 2ч", enabled: true },
                { channel: "Telegram", description: "Уведомления о новых записях и отменах", enabled: true },
                { channel: "Email", description: "Ежедневные отчёты и аналитика", enabled: false },
                { channel: "Push", description: "Мгновенные уведомления в браузере", enabled: true },
              ].map((item) => (
                <div key={item.channel} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <div>
                    <p className="text-sm font-medium">{item.channel}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Badge variant={item.enabled ? "success" : "secondary"} className="text-[10px]">
                    {item.enabled ? "Вкл" : "Выкл"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
