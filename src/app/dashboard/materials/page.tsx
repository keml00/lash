"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  Package,
  AlertTriangle,
  TrendingDown,
  DollarSign,
  Truck,
  BarChart3,
  Filter,
  MoreVertical,
  ArrowDownRight,
  Box,
} from "lucide-react"

const materials = [
  {
    id: "1",
    name: "Краска Wella Koleston 7/1",
    brand: "Wella",
    category: "Краски",
    quantity: 12,
    minQuantity: 5,
    unit: "шт",
    costPrice: 850,
    supplier: "Beauty Supply Co.",
    expiryDate: "2025-12-15",
    status: "ok",
  },
  {
    id: "2",
    name: "Оксид 6% Wella",
    brand: "Wella",
    category: "Оксиды",
    quantity: 3,
    minQuantity: 5,
    unit: "л",
    costPrice: 1200,
    supplier: "Beauty Supply Co.",
    expiryDate: "2026-03-01",
    status: "low",
  },
  {
    id: "3",
    name: "Шампунь Olaplex №4",
    brand: "Olaplex",
    category: "Уход",
    quantity: 8,
    minQuantity: 3,
    unit: "шт",
    costPrice: 2400,
    supplier: "Premium Hair",
    expiryDate: "2026-06-20",
    status: "ok",
  },
  {
    id: "4",
    name: "Гель-лак CND Shellac Red",
    brand: "CND",
    category: "Гель-лаки",
    quantity: 2,
    minQuantity: 4,
    unit: "шт",
    costPrice: 1800,
    supplier: "Nail Pro",
    expiryDate: "2025-09-10",
    status: "low",
  },
  {
    id: "5",
    name: "Фольга для мелирования",
    brand: "Framar",
    category: "Расходники",
    quantity: 24,
    minQuantity: 10,
    unit: "рулон",
    costPrice: 650,
    supplier: "Beauty Supply Co.",
    expiryDate: null,
    status: "ok",
  },
  {
    id: "6",
    name: "Перчатки нитриловые M",
    brand: "SafeTouch",
    category: "Расходники",
    quantity: 1,
    minQuantity: 5,
    unit: "коробка",
    costPrice: 450,
    supplier: "МедСнаб",
    expiryDate: null,
    status: "critical",
  },
  {
    id: "7",
    name: "Клей для ресниц Lovely",
    brand: "Lovely",
    category: "Ресницы",
    quantity: 6,
    minQuantity: 3,
    unit: "шт",
    costPrice: 1500,
    supplier: "Lash Store",
    expiryDate: "2025-08-01",
    status: "ok",
  },
  {
    id: "8",
    name: "Ресницы MIX D 0.07",
    brand: "Lovely",
    category: "Ресницы",
    quantity: 4,
    minQuantity: 6,
    unit: "палетка",
    costPrice: 900,
    supplier: "Lash Store",
    expiryDate: null,
    status: "low",
  },
]

const recentUsage = [
  { material: "Краска Wella 7/1", quantity: 1, service: "Окрашивание", client: "Елена С.", date: "Сегодня, 10:00" },
  { material: "Оксид 6% Wella", quantity: 0.1, service: "Окрашивание", client: "Елена С.", date: "Сегодня, 10:00" },
  { material: "Фольга для мелирования", quantity: 1, service: "Мелирование", client: "Мария И.", date: "Вчера, 14:00" },
  { material: "Гель-лак CND Red", quantity: 1, service: "Маникюр", client: "Анастасия К.", date: "Вчера, 11:30" },
  { material: "Клей для ресниц", quantity: 1, service: "Наращивание ресниц", client: "Ирина В.", date: "Вчера, 16:00" },
]

const suppliers = [
  { name: "Beauty Supply Co.", materials: 12, lastOrder: "5 мая 2025", total: "45 200 ₽" },
  { name: "Premium Hair", materials: 6, lastOrder: "28 апреля 2025", total: "32 800 ₽" },
  { name: "Nail Pro", materials: 8, lastOrder: "1 мая 2025", total: "28 400 ₽" },
  { name: "Lash Store", materials: 5, lastOrder: "3 мая 2025", total: "18 600 ₽" },
  { name: "МедСнаб", materials: 3, lastOrder: "20 апреля 2025", total: "8 200 ₽" },
]

const statusConfig: Record<string, { label: string; color: string; badgeVariant: "success" | "warning" | "destructive" }> = {
  ok: { label: "В наличии", color: "text-emerald-600", badgeVariant: "success" },
  low: { label: "Мало", color: "text-amber-600", badgeVariant: "warning" },
  critical: { label: "Заканчивается", color: "text-red-600", badgeVariant: "destructive" },
}

export default function MaterialsPage() {
  const [search, setSearch] = useState("")
  const [tab, setTab] = useState("stock")

  const lowStockCount = materials.filter((m) => m.status === "low" || m.status === "critical").length
  const totalValue = materials.reduce((acc, m) => acc + m.quantity * m.costPrice, 0)

  const filteredMaterials = materials.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.brand.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Header title="Материалы" subtitle="Склад и учёт расходных материалов" />

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Package className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{materials.length}</p>
                  <p className="text-sm text-muted-foreground">Позиций на складе</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{lowStockCount}</p>
                  <p className="text-sm text-muted-foreground">Требуют закупки</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{(totalValue / 1000).toFixed(0)}k ₽</p>
                  <p className="text-sm text-muted-foreground">Стоимость склада</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{suppliers.length}</p>
                  <p className="text-sm text-muted-foreground">Поставщиков</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="stock" className="gap-1.5">
                <Box className="w-4 h-4" />
                Склад
              </TabsTrigger>
              <TabsTrigger value="usage" className="gap-1.5">
                <TrendingDown className="w-4 h-4" />
                Списания
              </TabsTrigger>
              <TabsTrigger value="suppliers" className="gap-1.5">
                <Truck className="w-4 h-4" />
                Поставщики
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск материала..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 w-full sm:w-[240px]"
                />
              </div>
              <Button size="sm" className="gap-1.5 shadow-lg shadow-primary/25 shrink-0">
                <Plus className="w-4 h-4" />
                Добавить
              </Button>
            </div>
          </div>

          {/* Stock Tab */}
          <TabsContent value="stock">
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
                          <th className="text-left text-xs font-medium text-muted-foreground p-4">Материал</th>
                          <th className="text-left text-xs font-medium text-muted-foreground p-4 hidden md:table-cell">Категория</th>
                          <th className="text-left text-xs font-medium text-muted-foreground p-4">Остаток</th>
                          <th className="text-left text-xs font-medium text-muted-foreground p-4 hidden lg:table-cell">Цена закупки</th>
                          <th className="text-left text-xs font-medium text-muted-foreground p-4 hidden lg:table-cell">Поставщик</th>
                          <th className="text-left text-xs font-medium text-muted-foreground p-4">Статус</th>
                          <th className="p-4"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredMaterials.map((material) => {
                          const stockPercent = Math.min((material.quantity / (material.minQuantity * 2)) * 100, 100)
                          return (
                            <tr key={material.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                              <td className="p-4">
                                <div>
                                  <p className="text-sm font-medium">{material.name}</p>
                                  <p className="text-xs text-muted-foreground">{material.brand}</p>
                                </div>
                              </td>
                              <td className="p-4 hidden md:table-cell">
                                <Badge variant="secondary" className="text-xs">{material.category}</Badge>
                              </td>
                              <td className="p-4">
                                <div className="space-y-1.5">
                                  <p className="text-sm font-semibold">
                                    {material.quantity} {material.unit}
                                  </p>
                                  <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${
                                        material.status === "critical" ? "bg-red-500" :
                                        material.status === "low" ? "bg-amber-500" : "bg-emerald-500"
                                      }`}
                                      style={{ width: `${stockPercent}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="p-4 hidden lg:table-cell">
                                <p className="text-sm">{material.costPrice.toLocaleString("ru-RU")} ₽</p>
                              </td>
                              <td className="p-4 hidden lg:table-cell">
                                <p className="text-sm text-muted-foreground">{material.supplier}</p>
                              </td>
                              <td className="p-4">
                                <Badge variant={statusConfig[material.status].badgeVariant}>
                                  {statusConfig[material.status].label}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold">Последние списания</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentUsage.map((usage, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{usage.material}</p>
                          <p className="text-xs text-muted-foreground">
                            {usage.service} • {usage.client}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-red-600">-{usage.quantity}</p>
                        <p className="text-xs text-muted-foreground">{usage.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {suppliers.map((supplier) => (
                  <Card key={supplier.name} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                          <Truck className="w-5 h-5 text-blue-600" />
                        </div>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                      <h3 className="font-semibold text-sm mb-1">{supplier.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{supplier.materials} позиций</p>
                      <div className="flex items-center justify-between pt-3 border-t border-border/50">
                        <div>
                          <p className="text-xs text-muted-foreground">Последний заказ</p>
                          <p className="text-sm font-medium">{supplier.lastOrder}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Итого</p>
                          <p className="text-sm font-semibold">{supplier.total}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add supplier card */}
                <Card className="border-dashed hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-5 flex flex-col items-center justify-center h-full min-h-[180px]">
                    <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
                      <Plus className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Добавить поставщика</p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
