"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Settings,
  Building2,
  Users,
  Shield,
  Bell,
  Palette,
  Globe,
  Link2,
  CreditCard,
  Scissors,
  Plus,
  MoreVertical,
  Check,
  Crown,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  MessageSquare,
  Webhook,
  Key,
  Trash2,
} from "lucide-react"

const staffMembers = [
  { id: "1", name: "Анна Морозова", role: "OWNER", email: "anna@glamify.ru", status: "active", specialization: "Колорист" },
  { id: "2", name: "Ольга Кузнецова", role: "MASTER", email: "olga@glamify.ru", status: "active", specialization: "Мастер маникюра" },
  { id: "3", name: "Дарья Соколова", role: "MASTER", email: "darya@glamify.ru", status: "active", specialization: "Стилист" },
  { id: "4", name: "Екатерина Лебедева", role: "MASTER", email: "ekaterina@glamify.ru", status: "active", specialization: "Бровист" },
  { id: "5", name: "Марина Попова", role: "RECEPTIONIST", email: "marina@glamify.ru", status: "active", specialization: "Администратор" },
]

const roleLabels: Record<string, { label: string; color: string }> = {
  OWNER: { label: "Владелец", color: "bg-amber-100 text-amber-800" },
  ADMIN: { label: "Админ", color: "bg-violet-100 text-violet-800" },
  MASTER: { label: "Мастер", color: "bg-blue-100 text-blue-800" },
  RECEPTIONIST: { label: "Администратор", color: "bg-emerald-100 text-emerald-800" },
}

const integrations = [
  { name: "Telegram Bot", description: "Уведомления и запись через Telegram", status: "connected", icon: MessageSquare },
  { name: "WhatsApp Business", description: "Автоматические сообщения клиентам", status: "disconnected", icon: Smartphone },
  { name: "SMS (SMS.ru)", description: "SMS-напоминания о записях", status: "connected", icon: Mail },
  { name: "ЮKassa", description: "Приём оплаты онлайн", status: "connected", icon: CreditCard },
  { name: "Google Calendar", description: "Синхронизация расписания", status: "disconnected", icon: Globe },
  { name: "Webhook API", description: "Внешние интеграции через API", status: "connected", icon: Webhook },
]

export default function SettingsPage() {
  const [tab, setTab] = useState("general")

  return (
    <>
      <Header title="Настройки" subtitle="Управление салоном и интеграции" />

      <div className="p-6">
        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <TabsList className="flex-wrap h-auto gap-1 p-1">
            <TabsTrigger value="general" className="gap-1.5">
              <Building2 className="w-4 h-4" /> Салон
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-1.5">
              <Users className="w-4 h-4" /> Команда
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-1.5">
              <Link2 className="w-4 h-4" /> Интеграции
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1.5">
              <Bell className="w-4 h-4" /> Уведомления
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-1.5">
              <CreditCard className="w-4 h-4" /> Подписка
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Информация о салоне</CardTitle>
                  <CardDescription>Основные данные вашего салона</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-violet-500/25">
                      <Scissors className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Загрузить логотип</Button>
                      <p className="text-xs text-muted-foreground mt-1">PNG, JPG до 2MB</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Название салона</label>
                      <Input defaultValue="Beauty Studio Bloom" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Телефон</label>
                      <Input defaultValue="+7 (495) 123-45-67" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input defaultValue="hello@bloomstudio.ru" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Сайт</label>
                      <Input defaultValue="https://bloomstudio.ru" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-medium">Адрес</label>
                      <Input defaultValue="Москва, ул. Тверская, 15, стр. 2" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-border/50">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Часовой пояс</label>
                      <Input defaultValue="Europe/Moscow" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Валюта</label>
                      <Input defaultValue="RUB (₽)" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Язык</label>
                      <Input defaultValue="Русский" />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button className="shadow-lg shadow-primary/25">Сохранить изменения</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Working hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Часы работы</CardTitle>
                  <CardDescription>Настройте график работы салона</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"].map((day, i) => (
                      <div key={day} className="flex items-center gap-4">
                        <span className="text-sm w-32 shrink-0">{day}</span>
                        <Input defaultValue={i < 6 ? "09:00" : ""} placeholder="—" className="w-24" disabled={i === 6} />
                        <span className="text-muted-foreground">—</span>
                        <Input defaultValue={i < 6 ? "21:00" : ""} placeholder="—" className="w-24" disabled={i === 6} />
                        {i === 6 && <Badge variant="secondary" className="text-xs">Выходной</Badge>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Team */}
          <TabsContent value="team">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Команда</CardTitle>
                    <CardDescription>{staffMembers.length} сотрудников</CardDescription>
                  </div>
                  <Button size="sm" className="gap-1.5 shadow-lg shadow-primary/25">
                    <Plus className="w-4 h-4" /> Добавить
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {staffMembers.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                              {member.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium">{member.name}</p>
                              {member.role === "OWNER" && <Crown className="w-3.5 h-3.5 text-amber-500" />}
                            </div>
                            <p className="text-xs text-muted-foreground">{member.email} • {member.specialization}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`text-[10px] ${roleLabels[member.role].color}`}>
                            {roleLabels[member.role].label}
                          </Badge>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Roles */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Роли и доступы
                  </CardTitle>
                  <CardDescription>Настройка прав для каждой роли</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="text-left p-3 font-medium text-muted-foreground">Раздел</th>
                          <th className="text-center p-3 font-medium text-muted-foreground">Владелец</th>
                          <th className="text-center p-3 font-medium text-muted-foreground">Админ</th>
                          <th className="text-center p-3 font-medium text-muted-foreground">Мастер</th>
                          <th className="text-center p-3 font-medium text-muted-foreground">Ресепшн</th>
                        </tr>
                      </thead>
                      <tbody>
                        {["Дашборд", "Записи", "Клиенты", "Финансы", "Материалы", "AI", "Настройки"].map((section) => (
                          <tr key={section} className="border-b border-border/30">
                            <td className="p-3">{section}</td>
                            <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                            <td className="p-3 text-center"><Check className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                            <td className="p-3 text-center">
                              {["Записи", "Клиенты", "Дашборд"].includes(section) ? (
                                <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </td>
                            <td className="p-3 text-center">
                              {["Записи", "Клиенты", "Дашборд"].includes(section) ? (
                                <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {integrations.map((integration) => (
                  <Card key={integration.name} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                          <integration.icon className="w-5 h-5 text-foreground" />
                        </div>
                        <Badge variant={integration.status === "connected" ? "success" : "secondary"} className="text-[10px]">
                          {integration.status === "connected" ? "Подключено" : "Не подключено"}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{integration.name}</h4>
                      <p className="text-xs text-muted-foreground mb-4">{integration.description}</p>
                      <Button
                        size="sm"
                        variant={integration.status === "connected" ? "outline" : "default"}
                        className="w-full"
                      >
                        {integration.status === "connected" ? "Настроить" : "Подключить"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* API Keys */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Key className="w-4 h-4" /> API ключи
                  </CardTitle>
                  <CardDescription>Ключи для внешних интеграций</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                    <div>
                      <p className="text-sm font-medium">Production API Key</p>
                      <p className="text-xs text-muted-foreground font-mono">sk_live_••••••••••••••••4f2a</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1.5">
                    <Plus className="w-4 h-4" /> Создать новый ключ
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Шаблоны уведомлений</CardTitle>
                  <CardDescription>Настройте автоматические сообщения клиентам</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { type: "Напоминание за 24 часа", channel: "SMS + Telegram", active: true },
                    { type: "Напоминание за 2 часа", channel: "Telegram", active: true },
                    { type: "Подтверждение записи", channel: "SMS + Email", active: true },
                    { type: "Отмена записи", channel: "SMS", active: true },
                    { type: "После визита (отзыв)", channel: "Telegram", active: true },
                    { type: "День рождения", channel: "SMS + Telegram", active: false },
                    { type: "Акции и предложения", channel: "Email + Telegram", active: false },
                  ].map((notification) => (
                    <div key={notification.type} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${notification.active ? "bg-emerald-500" : "bg-gray-300"}`} />
                        <div>
                          <p className="text-sm font-medium">{notification.type}</p>
                          <p className="text-xs text-muted-foreground">{notification.channel}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={notification.active ? "success" : "secondary"} className="text-[10px]">
                          {notification.active ? "Активно" : "Выключено"}
                        </Badge>
                        <Button variant="ghost" size="sm" className="h-7">Изменить</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {/* Current Plan */}
              <Card className="border-primary/30">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold">Pro план</h3>
                        <Badge className="gradient-primary border-0 text-white">Текущий</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">До 5 мастеров, все AI функции, интеграции</p>
                      <p className="text-2xl font-bold mt-2">2 490 ₽<span className="text-sm font-normal text-muted-foreground">/мес</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Следующая оплата</p>
                      <p className="text-sm font-medium">1 июня 2025</p>
                      <Button variant="outline" size="sm" className="mt-2">Изменить план</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Usage */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Использование</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Мастера", used: 4, limit: 5 },
                    { name: "Клиенты", used: 342, limit: 999999 },
                    { name: "AI запросы", used: 847, limit: 2000 },
                    { name: "SMS", used: 156, limit: 500 },
                  ].map((item) => (
                    <div key={item.name} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-muted-foreground">
                          {item.used} / {item.limit === 999999 ? "∞" : item.limit}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.used / item.limit > 0.9 ? "bg-red-500" :
                            item.used / item.limit > 0.7 ? "bg-amber-500" : "bg-primary"
                          }`}
                          style={{ width: `${Math.min((item.used / item.limit) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Payment History */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">История оплат</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: "1 мая 2025", amount: "2 490 ₽", status: "Оплачено", plan: "Pro" },
                      { date: "1 апреля 2025", amount: "2 490 ₽", status: "Оплачено", plan: "Pro" },
                      { date: "1 марта 2025", amount: "2 490 ₽", status: "Оплачено", plan: "Pro" },
                      { date: "1 февраля 2025", amount: "990 ₽", status: "Оплачено", plan: "Basic" },
                    ].map((payment, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                        <div>
                          <p className="text-sm font-medium">{payment.date}</p>
                          <p className="text-xs text-muted-foreground">План {payment.plan}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{payment.amount}</p>
                          <Badge variant="success" className="text-[10px]">{payment.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
