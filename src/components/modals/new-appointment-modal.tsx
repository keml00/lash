"use client"

import React, { useState } from "react"
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { useToast } from "@/components/ui/toast"
import { Calendar, Clock, User, Scissors } from "lucide-react"

const services = [
  { value: "coloring", label: "Окрашивание — 6 500 ₽" },
  { value: "haircut", label: "Стрижка + укладка — 3 200 ₽" },
  { value: "manicure", label: "Маникюр + покрытие — 2 800 ₽" },
  { value: "pedicure", label: "Педикюр — 3 000 ₽" },
  { value: "lashes", label: "Наращивание ресниц — 4 500 ₽" },
  { value: "brows", label: "Коррекция бровей — 2 200 ₽" },
  { value: "keratin", label: "Кератиновый уход — 8 000 ₽" },
]

const masters = [
  { value: "anna", label: "Анна Морозова — колорист" },
  { value: "olga", label: "Ольга Кузнецова — маникюр" },
  { value: "darya", label: "Дарья Соколова — стилист" },
  { value: "ekaterina", label: "Екатерина Лебедева — бровист" },
]

const timeSlots = [
  { value: "09:00", label: "09:00" },
  { value: "09:30", label: "09:30" },
  { value: "10:00", label: "10:00" },
  { value: "10:30", label: "10:30" },
  { value: "11:00", label: "11:00" },
  { value: "11:30", label: "11:30" },
  { value: "12:00", label: "12:00" },
  { value: "12:30", label: "12:30" },
  { value: "13:00", label: "13:00" },
  { value: "13:30", label: "13:30" },
  { value: "14:00", label: "14:00" },
  { value: "14:30", label: "14:30" },
  { value: "15:00", label: "15:00" },
  { value: "15:30", label: "15:30" },
  { value: "16:00", label: "16:00" },
  { value: "16:30", label: "16:30" },
  { value: "17:00", label: "17:00" },
  { value: "17:30", label: "17:30" },
  { value: "18:00", label: "18:00" },
  { value: "18:30", label: "18:30" },
  { value: "19:00", label: "19:00" },
  { value: "19:30", label: "19:30" },
  { value: "20:00", label: "20:00" },
]

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewAppointmentModal({ open, onOpenChange }: Props) {
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onOpenChange(false)
      showToast("Запись успешно создана!")
    }, 800)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogClose onClose={() => onOpenChange(false)} />
      <DialogHeader>
        <DialogTitle>Новая запись</DialogTitle>
        <DialogDescription>Заполните данные для создания записи</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <DialogContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Клиент</label>
            <Input placeholder="Имя или телефон клиента" required />
          </div>

          <Select
            label="Услуга"
            options={services}
            placeholder="Выберите услугу"
            required
          />

          <Select
            label="Мастер"
            options={masters}
            placeholder="Выберите мастера"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Дата</label>
              <Input type="date" required />
            </div>
            <Select
              label="Время"
              options={timeSlots}
              placeholder="Время"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Заметка</label>
            <Input placeholder="Комментарий (необязательно)" />
          </div>
        </DialogContent>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Отмена
          </Button>
          <Button type="submit" disabled={loading} className="shadow-lg shadow-primary/25">
            {loading ? "Создаём..." : "Создать запись"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  )
}
