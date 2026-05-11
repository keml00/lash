"use client"

import React, { useState } from "react"
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { useToast } from "@/components/ui/toast"
import { useStore } from "@/lib/store"

const sources = [
  { value: "instagram", label: "Instagram" },
  { value: "telegram", label: "Telegram" },
  { value: "recommendation", label: "Рекомендация" },
  { value: "site", label: "Сайт" },
  { value: "qr", label: "QR код" },
  { value: "walkin", label: "Пришёл сам" },
  { value: "other", label: "Другое" },
]

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewClientModal({ open, onOpenChange }: Props) {
  const { showToast } = useToast()
  const { addClient } = useStore()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    birthDate: "",
    source: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.firstName || !form.phone) {
      showToast("Заполните имя и телефон", "error")
      return
    }

    setLoading(true)

    addClient({
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      email: form.email,
      birthDate: form.birthDate,
      source: sources.find((s) => s.value === form.source)?.label || form.source,
      notes: form.notes,
    })

    setTimeout(() => {
      setLoading(false)
      onOpenChange(false)
      setForm({ firstName: "", lastName: "", phone: "", email: "", birthDate: "", source: "", notes: "" })
      showToast(`Клиент добавлен: ${form.firstName} ${form.lastName}`)
    }, 400)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogClose onClose={() => onOpenChange(false)} />
      <DialogHeader>
        <DialogTitle>Новый клиент</DialogTitle>
        <DialogDescription>Добавьте клиента в базу</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <DialogContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Имя *</label>
              <Input
                placeholder="Имя"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Фамилия</label>
              <Input
                placeholder="Фамилия"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Телефон *</label>
            <Input
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Дата рождения</label>
              <Input
                type="date"
                value={form.birthDate}
                onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
              />
            </div>
            <Select
              label="Откуда узнал"
              options={sources}
              placeholder="Источник"
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Заметка</label>
            <Input
              placeholder="Предпочтения, аллергии, пожелания..."
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
            {loading ? "Сохраняем..." : "Добавить клиента"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  )
}
