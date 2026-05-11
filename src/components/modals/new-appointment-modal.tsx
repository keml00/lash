"use client"

import React, { useState } from "react"
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { useToast } from "@/components/ui/toast"
import { useStore } from "@/lib/store"

const services = [
  { value: "coloring", label: "Окрашивание — 6 500 ₽", name: "Окрашивание волос", price: 6500, duration: 120, color: "bg-violet-500" },
  { value: "haircut", label: "Стрижка + укладка — 3 200 ₽", name: "Стрижка + укладка", price: 3200, duration: 60, color: "bg-emerald-500" },
  { value: "manicure", label: "Маникюр + покрытие — 2 800 ₽", name: "Маникюр + покрытие", price: 2800, duration: 90, color: "bg-blue-500" },
  { value: "pedicure", label: "Педикюр — 3 000 ₽", name: "Педикюр", price: 3000, duration: 90, color: "bg-teal-500" },
  { value: "lashes", label: "Наращивание ресниц — 4 500 ₽", name: "Наращивание ресниц", price: 4500, duration: 120, color: "bg-pink-500" },
  { value: "brows", label: "Коррекция бровей — 2 200 ₽", name: "Коррекция бровей", price: 2200, duration: 60, color: "bg-amber-500" },
  { value: "keratin", label: "Кератиновый уход — 8 000 ₽", name: "Кератиновый уход", price: 8000, duration: 150, color: "bg-indigo-500" },
]

const masters = [
  { value: "anna", label: "Анна Морозова — колорист", name: "Анна Морозова" },
  { value: "olga", label: "Ольга Кузнецова — маникюр", name: "Ольга Кузнецова" },
  { value: "darya", label: "Дарья Соколова — стилист", name: "Дарья Соколова" },
  { value: "ekaterina", label: "Екатерина Лебедева — бровист", name: "Екатерина Лебедева" },
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
  const { addAppointment } = useStore()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    client: "",
    phone: "",
    service: "",
    master: "",
    date: "",
    time: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const selectedService = services.find((s) => s.value === form.service)
    const selectedMaster = masters.find((m) => m.value === form.master)

    if (!selectedService || !selectedMaster || !form.client || !form.date || !form.time) {
      showToast("Заполните все обязательные поля", "error")
      setLoading(false)
      return
    }

    addAppointment({
      client: form.client,
      phone: form.phone,
      service: form.service,
      serviceName: selectedService.name,
      master: form.master,
      masterName: selectedMaster.name,
      date: form.date,
      time: form.time,
      duration: selectedService.duration,
      price: selectedService.price,
      status: "confirmed",
      notes: form.notes,
      color: selectedService.color,
    })

    setTimeout(() => {
      setLoading(false)
      onOpenChange(false)
      setForm({ client: "", phone: "", service: "", master: "", date: "", time: "", notes: "" })
      showToast(`Запись создана: ${form.client} — ${selectedService.name}, ${form.date} в ${form.time}`)
    }, 400)
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
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Клиент *</label>
              <Input
                placeholder="Имя клиента"
                value={form.client}
                onChange={(e) => setForm({ ...form, client: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Телефон</label>
              <Input
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>

          <Select
            label="Услуга *"
            options={services.map((s) => ({ value: s.value, label: s.label }))}
            placeholder="Выберите услугу"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            required
          />

          <Select
            label="Мастер *"
            options={masters.map((m) => ({ value: m.value, label: m.label }))}
            placeholder="Выберите мастера"
            value={form.master}
            onChange={(e) => setForm({ ...form, master: e.target.value })}
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Дата *</label>
              <Input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <Select
              label="Время *"
              options={timeSlots}
              placeholder="Время"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Заметка</label>
            <Input
              placeholder="Комментарий (необязательно)"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
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
