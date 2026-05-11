"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/toast"
import {
  User,
  Mail,
  Phone,
  Camera,
  Calendar,
  DollarSign,
  Star,
  Clock,
  TrendingUp,
  Award,
  Edit3,
  Save,
  BarChart3,
  Users,
  Scissors,
} from "lucide-react"

const scheduleData = [
  { day: "Понедельник", start: "09:00", end: "19:00", active: true },
  { day: "Вторник", start: "09:00", end: "19:00", active: true },
  { day: "Среда", start: "09:00", end: "19:00", active: true },
  { day: "Четверг", start: "09:00", end: "19:00", active: true },
  { day: "Пятница", start: "09:00", end: "19:00", active: true },
  { day: "Суббота", start: "10:00", end: "18:00", active: true },
  { day: "Воскресенье", start: "", end: "", active: false },
]

const recentClients = [
  { name: "Елена Смирнова", service: "Окрашивание", date: "Сегодня, 10:00", price: "6 500 ₽" },
  { name: "Мария Иванова", service: "Маникюр", date: "Вчера, 14:00", price: "2 800 ₽" },
  { name: "Ирина Волкова", service: "Наращивание ресниц", date: "Вчера, 16:30", price: "4 500 ₽" },
  { name: "Анастасия Козлова", service: "Стрижка + укладка", date: "10 мая, 11:00", price: "3 200 ₽" },
  { name: "Татьяна Морозова", service: "Брови", date: "10 мая, 15:00", price: "2 200 ₽" },
]

export default function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "Анна",
    lastName: "Морозова",
    email: "anna@glamify.ru",
    phone: "+7 (999) 888-77-66",
    specialization: "Колорист, стилист",
    experience: "8 лет",
  })
  const { showToast } = useToast()

  const handleSave = () => {
    setEditing(false)
    showToast("Профиль сохранён!")
  }

  return (
    <>
      <Header title="Мой профиль" />

      <div className="p-6 space-y-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                      АМ
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <h2 className="text-xl font-bold mt-4">{profile.firstName} {profile.lastName}</h2>
                <p className="text-sm text-muted-foreground">{profile.specialization}</p>
                <Badge className="mt-2 bg-amber-100 text-amber-800">
                  <Award className="w-3 h-3 mr-1" /> Топ мастер
                </Badge>
              </div>

              {editing ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      placeholder="Имя"
                    />
                    <Input
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      placeholder="Фамилия"
                    />
                  </div>
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="Email"
                  />
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="Телефон"
                  />
                  <Input
                    value={profile.specialization}
                    onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                    placeholder="Специализация"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gap-1.5" onClick={handleSave}>
                      <Save className="w-4 h-4" /> Сохранить
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1" onClick={() => setEditing(false)}>
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Scissors className="w-4 h-4 text-muted-foreground" />
                    <span>{profile.specialization}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Опыт: {profile.experience}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full gap-1.5 mt-4" onClick={() => setEditing(true)}>
                    <Edit3 className="w-4 h-4" /> Редактировать профиль
                  </Button>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-border/50">
                <div className="p-3 rounded-xl bg-muted/50 text-center">
                  <p className="text-xs text-muted-foreground">Записей за месяц</p>
                  <p className="text-xl font-bold">42</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/50 text-center">
                  <p className="text-xs text-muted-foreground">Рейтинг</p>
                  <p className="text-xl font-bold flex items-center justify-center gap-1">
                    4.9 <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 text-center">
                  <p className="text-xs text-emerald-600">Доход за месяц</p>
                  <p className="text-xl font-bold text-emerald-700">185 000 ₽</p>
                </div>
                <div className="p-3 rounded-xl bg-violet-50 text-center">
                  <p className="text-xs text-violet-600">Клиентов</p>
                  <p className="text-xl font-bold text-violet-700">156</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Schedule */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Моё расписание
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {scheduleData.map((day) => (
                    <div key={day.day} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/50 transition-colors">
                      <span className="text-sm font-medium w-32">{day.day}</span>
                      {day.active ? (
                        <span className="text-sm text-muted-foreground">{day.start} — {day.end}</span>
                      ) : (
                        <Badge variant="secondary" className="text-xs">Выходной</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Clients */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4" /> Последние клиенты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {recentClients.map((client, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="text-xs bg-primary/10 text-primary">
                          {client.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.service} • {client.date}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold">{client.price}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Monthly Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> Статистика за май
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-violet-600" />
                      <span className="text-xs text-violet-600 font-medium">Конверсия</span>
                    </div>
                    <p className="text-2xl font-bold text-violet-700">94%</p>
                    <p className="text-xs text-muted-foreground">записей завершены</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-blue-600 font-medium">Ср. чек</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-700">4 400 ₽</p>
                    <p className="text-xs text-muted-foreground">+8% к апрелю</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs text-emerald-600 font-medium">Отзывы</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-700">28</p>
                    <p className="text-xs text-muted-foreground">все положительные</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
