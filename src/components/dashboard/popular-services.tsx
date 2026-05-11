"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const services = [
  { name: "Маникюр", count: 48, total: 60, color: "bg-violet-600", revenue: "76 800 ₽" },
  { name: "Окрашивание", count: 32, total: 60, color: "bg-blue-500", revenue: "192 000 ₽" },
  { name: "Стрижка", count: 28, total: 60, color: "bg-emerald-500", revenue: "56 000 ₽" },
  { name: "Брови", count: 24, total: 60, color: "bg-amber-500", revenue: "48 000 ₽" },
  { name: "Наращивание ресниц", count: 18, total: 60, color: "bg-pink-500", revenue: "72 000 ₽" },
]

export function PopularServices() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Популярные услуги</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {services.map((service) => (
          <div key={service.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{service.name}</span>
              <span className="text-muted-foreground">{service.count} записей</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${service.color} transition-all duration-500`}
                  style={{ width: `${(service.count / service.total) * 100}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {service.revenue}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
