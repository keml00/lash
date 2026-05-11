"use client"

import React, { useState } from "react"
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { useToast } from "@/components/ui/toast"

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
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onOpenChange(false)
      showToast("Клиент успешно добавлен!")
    }, 800)
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
              <label className="text-sm font-medium">Имя</label>
              <Input placeholder="Имя" required />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Фамилия</label>
              <Input placeholder="Фамилия" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Телефон</label>
            <Input type="tel" placeholder="+7 (___) ___-__-__" required />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="email@example.com" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Дата рождения</label>
              <Input type="date" />
            </div>
            <Select
              label="Откуда узнал"
              options={sources}
              placeholder="Источник"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Заметка</label>
            <Input placeholder="Предпочтения, аллергии, пожелания..." />
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
