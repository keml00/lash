"use client"

import React, { useState } from "react"
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { useToast } from "@/components/ui/toast"
import { useStore } from "@/lib/store"

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
  const { appFilter, setAppFilter, clientFilter, setClientFilter } = useStore()

  const [localAppFilter, setLocalAppFilter] = useState(appFilter)
  const [localClientFilter, setLocalClientFilter] = useState(clientFilter)

  const handleApply = () => {
    if (type === "appointments") {
      setAppFilter(localAppFilter)
    } else if (type === "clients") {
      setClientFilter(localClientFilter)
    }
    onOpenChange(false)
    showToast("Фильтры применены", "info")
  }

  const handleReset = () => {
    if (type === "appointments") {
      const empty = { status: "", master: "", service: "", dateFrom: "", dateTo: "" }
      setLocalAppFilter(empty)
      setAppFilter(empty)
    } else if (type === "clients") {
      const empty = { tags: [], visitsFrom: 0, visitsTo: 999, lastVisitFrom: "", lastVisitTo: "" }
      setLocalClientFilter(empty)
      setClientFilter(empty)
    }
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
            <Select
              label="Статус"
              options={statusOptions}
              value={localAppFilter.status}
              onChange={(e) => setLocalAppFilter({ ...localAppFilter, status: e.target.value })}
            />
            <Select
              label="Мастер"
              options={masterOptions}
              value={localAppFilter.master}
              onChange={(e) => setLocalAppFilter({ ...localAppFilter, master: e.target.value })}
            />
            <Select
              label="Услуга"
              options={serviceOptions}
              value={localAppFilter.service}
              onChange={(e) => setLocalAppFilter({ ...localAppFilter, service: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Дата от</label>
                <Input
                  type="date"
                  value={localAppFilter.dateFrom}
                  onChange={(e) => setLocalAppFilter({ ...localAppFilter, dateFrom: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Дата до</label>
                <Input
                  type="date"
                  value={localAppFilter.dateTo}
                  onChange={(e) => setLocalAppFilter({ ...localAppFilter, dateTo: e.target.value })}
                />
              </div>
            </div>
          </>
        )}

        {type === "clients" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Визитов от</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={localClientFilter.visitsFrom || ""}
                  onChange={(e) => setLocalClientFilter({ ...localClientFilter, visitsFrom: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Визитов до</label>
                <Input
                  type="number"
                  placeholder="999"
                  value={localClientFilter.visitsTo === 999 ? "" : localClientFilter.visitsTo}
                  onChange={(e) => setLocalClientFilter({ ...localClientFilter, visitsTo: parseInt(e.target.value) || 999 })}
                />
              </div>
            </div>
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
