"use client"

import React, { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Plus,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Star,
  Gift,
  MoreVertical,
  ArrowLeft,
  Heart,
  Clock,
  Camera,
  MessageSquare,
  TrendingUp,
} from "lucide-react"
import { NewClientModal } from "@/components/modals/new-client-modal"
import { FilterModal } from "@/components/modals/filter-modal"
import { useStore } from "@/lib/store"

const clientHistory = [
  { date: "10 мая 2025", service: "Окрашивание волос", master: "Анна М.", price: "6 500 ₽", rating: 5 },
  { date: "25 апреля 2025", service: "Стрижка + укладка", master: "Дарья С.", price: "3 200 ₽", rating: 5 },
  { date: "10 апреля 2025", service: "Маникюр + покрытие", master: "Ольга К.", price: "2 800 ₽", rating: 4 },
  { date: "28 марта 2025", service: "Окрашивание корней", master: "Анна М.", price: "4 500 ₽", rating: 5 },
  { date: "15 марта 2025", service: "Уход кератиновый", master: "Анна М.", price: "8 000 ₽", rating: 5 },
]

const tagColors: Record<string, string> = {
  VIP: "bg-amber-100 text-amber-800",
  "Постоянный": "bg-emerald-100 text-emerald-800",
  "Новый": "bg-blue-100 text-blue-800",
  "Бонус": "bg-violet-100 text-violet-800",
}

export default function ClientsPage() {
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [showNewClient, setShowNewClient] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const { clients, clientFilter } = useStore()

  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchesSearch = `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
      if (!matchesSearch) return false
      if (clientFilter.visitsFrom > 0 && c.visits < clientFilter.visitsFrom) return false
      if (clientFilter.visitsTo < 999 && c.visits > clientFilter.visitsTo) return false
      return true
    })
  }, [clients, search, clientFilter])

  const activeClient = clients.find((c) => c.id === selectedClient)

  if (selectedClient && activeClient) {
    return (
      <>
        <Header title="Карточка клиента" />
        <div className="p-6 space-y-6">
          <Button variant="ghost" size="sm" className="gap-1.5 -ml-2" onClick={() => setSelectedClient(null)}>
            <ArrowLeft className="w-4 h-4" />
            Назад к списку
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* Client Info Card */}
            <Card className="lg:col-span-1">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="h-20 w-20 mx-auto mb-4">
                    <AvatarFallback className="text-xl font-bold bg-primary/10 text-primary">
                      {activeClient.firstName[0]}{activeClient.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{activeClient.firstName} {activeClient.lastName}</h2>
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    {activeClient.tags.map((tag) => (
                      <Badge key={tag} className={`text-[10px] ${tagColors[tag] || "bg-gray-100 text-gray-800"}`}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{activeClient.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{activeClient.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Последний визит: {activeClient.lastVisit}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span>Источник: {activeClient.source}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <p className="text-xs text-muted-foreground">Визиты</p>
                    <p className="text-lg font-bold">{activeClient.visits}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50 text-center">
                    <p className="text-xs text-muted-foreground">Ср. чек</p>
                    <p className="text-lg font-bold">{activeClient.avgCheck.toLocaleString("ru-RU")} ₽</p>
                  </div>
                  <div className="p-3 rounded-xl bg-violet-50 text-center">
                    <p className="text-xs text-violet-600">Бонусы</p>
                    <p className="text-lg font-bold text-violet-700">{activeClient.bonusPoints}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 text-center">
                    <p className="text-xs text-emerald-600">Скидка</p>
                    <p className="text-lg font-bold text-emerald-700">{activeClient.discount}%</p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-violet-600" />
                    <span className="text-sm font-medium text-violet-900">Всего потрачено</span>
                  </div>
                  <p className="text-2xl font-bold text-violet-700">
                    {activeClient.totalSpent.toLocaleString("ru-RU")} ₽
                  </p>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button size="sm" className="flex-1 gap-1.5">
                    <Calendar className="w-4 h-4" />
                    Записать
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 gap-1.5">
                    <MessageSquare className="w-4 h-4" />
                    Написать
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* History & Notes */}
            <div className="lg:col-span-2 space-y-6">
              {/* Visit History */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    История посещений
                  </h3>
                  <div className="space-y-3">
                    {clientHistory.map((visit, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <div>
                            <p className="text-sm font-medium">{visit.service}</p>
                            <p className="text-xs text-muted-foreground">{visit.date} • {visit.master}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{visit.price}</p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: visit.rating }).map((_, j) => (
                              <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Предпочтения и заметки
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Любимый мастер</p>
                      <p className="text-sm font-medium">Анна Морозова (колорист)</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Предпочтения</p>
                      <p className="text-sm">Предпочитает утренние часы (9:00-12:00). Чай с лимоном. Аллергия на аммиак.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Заметки мастера</p>
                      <p className="text-sm">Тонкие волосы, нужна щадящая краска. Формула: 7.1 + 8.0 (1:1), 6% оксид.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Photos */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Фотографии работ
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="aspect-square rounded-xl bg-muted/80 flex items-center justify-center">
                        <Camera className="w-6 h-6 text-muted-foreground/50" />
                      </div>
                    ))}
                    <div className="aspect-square rounded-xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors">
                      <Plus className="w-6 h-6 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header title="Клиенты" subtitle={`${clients.length} клиентов в базе`} />

      <div className="p-6 space-y-6">
        {/* Search & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по имени или телефону..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-full sm:w-[320px]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5" onClick={() => setShowFilter(true)}>
              <Filter className="w-4 h-4" />
              Фильтр
            </Button>
            <Button size="sm" className="gap-1.5 shadow-lg shadow-primary/25" onClick={() => setShowNewClient(true)}>
              <Plus className="w-4 h-4" />
              Новый клиент
            </Button>
          </div>
        </div>

        <NewClientModal open={showNewClient} onOpenChange={setShowNewClient} />
        <FilterModal open={showFilter} onOpenChange={setShowFilter} type="clients" />

        {/* Client Cards Grid */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.03 } } }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredClients.map((client) => (
            <motion.div
              key={client.id}
              variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }}
            >
              <Card
                className="cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                onClick={() => setSelectedClient(client.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-11 w-11">
                        <AvatarFallback className="font-medium bg-primary/10 text-primary">
                          {client.firstName[0]}{client.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-sm">{client.firstName} {client.lastName}</p>
                        <p className="text-xs text-muted-foreground">{client.phone}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>

                  {client.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {client.tags.map((tag) => (
                        <Badge key={tag} className={`text-[10px] px-1.5 py-0 ${tagColors[tag] || "bg-gray-100 text-gray-800"}`}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/50">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Визиты</p>
                      <p className="text-sm font-semibold">{client.visits}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Ср. чек</p>
                      <p className="text-sm font-semibold">{(client.avgCheck / 1000).toFixed(1)}k</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Бонусы</p>
                      <p className="text-sm font-semibold text-violet-600">{client.bonusPoints}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">
                      Последний визит: {client.lastVisit}
                    </span>
                    {client.discount > 0 && (
                      <Badge variant="success" className="text-[10px]">
                        <Gift className="w-3 h-3 mr-0.5" />
                        -{client.discount}%
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  )
}
