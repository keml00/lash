"use client"

import React, { useState } from "react"
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { useToast } from "@/components/ui/toast"
import { Badge } from "@/components/ui/badge"

const statusOptions = [
  { value: "", label: "Все статусы" },
  { value: "confirmed", label: "Подтверждена" },
  { value: "pending", label: "Ожидает" },
  { value: "in_progress", label: "В процессе" },
  { value: "completed", label: "Завершена" },
  { value: "cancelled", label: "Отменена" },
]

const masterOptions = [
  { value: "", label: "Все мастера" },
  { value: "anna", label: "Анна Морозова" },
  { value: "olga", label: "Ольга Кузнецова" },
  { value: "darya", label: "Дарья Соколова" },
  { value: "ekaterina", label: "Екатерина Лебедева" },
]

const serviceOptions = [
  { value: "", label: "Все услуги" },
  { value: "coloring", label: "Окрашивание" },
  { value: "haircut", label: "Стрижка" },
  { value: "manicure", label: "Маникюр" },
  { value: "pedicure", label: "Педикюр" },
  { value: "lashes", label: "Ресницы" },
  { value: "brows", label: "Брови" },
]

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  type?: "appointments" | "clients" | "materials"
}

export function FilterModal({ open, onOpenChange, type = "appointments" }: Props) {
  const { showToast } = useToast()

  const handleApply = () => {
    onOpenChange(false)
    showToast("Фильтры применены", "info")
  }

  const handleReset = () => {
    onOpenChange(false)
    showToast("Фильтры сброшены", "info")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogClose onClose={() => onOpenChange(false)} />
      <DialogHeader>
        <DialogTitle>Фильтры</DialogTitle>
        <DialogDescription>Настройте параметры отображения</DialogDescription>
      </DialogHeader>
      <DialogContent className="space-y-4">
        {type === "appointments" && (
          <>
            <Select label="Статус" options={statusOptions} placeholder="Все статусы" />
            <Select label="Мастер" options={masterOptions} placeholder="Все мастера" />
            <Select label="Услуга" options={serviceOptions} placeholder="Все услуги" />
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Дата от</label>
                <Input type="date" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Дата до</label>
                <Input type="date" />
              </div>
            </div>
          </>
        )}

        {type === "clients" && (
          <>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Теги</label>
              <div className="flex flex-wrap gap-2">
                {["VIP", "Постоянный", "Новый", "Бонус"].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 hover:border-primary transition-colors px-3 py-1"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Визитов от</label>
                <Input type="number" placeholder="0" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Визитов до</label>
                <Input type="number" placeholder="100" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Последний визит от</label>
                <Input type="date" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Последний визит до</label>
                <Input type="date" />
              </div>
            </div>
          </>
        )}

        {type === "materials" && (
          <>
            <Select
              label="Статус"
              options={[
                { value: "", label: "Все" },
                { value: "ok", label: "В наличии" },
                { value: "low", label: "Мало" },
                { value: "critical", label: "Заканчивается" },
              ]}
              placeholder="Все"
            />
            <Select
              label="Категория"
              options={[
                { value: "", label: "Все категории" },
                { value: "paints", label: "Краски" },
                { value: "nails", label: "Гель-лаки" },
                { value: "care", label: "Уход" },
                { value: "consumables", label: "Расходники" },
                { value: "lashes", label: "Ресницы" },
              ]}
              placeholder="Все категории"
            />
            <Select
              label="Поставщик"
              options={[
                { value: "", label: "Все поставщики" },
                { value: "beauty-supply", label: "Beauty Supply Co." },
                { value: "premium-hair", label: "Premium Hair" },
                { value: "nail-pro", label: "Nail Pro" },
                { value: "lash-store", label: "Lash Store" },
              ]}
              placeholder="Все поставщики"
            />
          </>
        )}
      </DialogContent>
      <DialogFooter>
        <Button type="button" variant="ghost" onClick={handleReset}>
          Сбросить
        </Button>
        <Button type="button" onClick={handleApply} className="shadow-lg shadow-primary/25">
          Применить
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
