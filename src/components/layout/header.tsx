"use client"

import React, { useState } from "react"
import { Bell, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NewAppointmentModal } from "@/components/modals/new-appointment-modal"

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const [showNewAppointment, setShowNewAppointment] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-white/80 backdrop-blur-xl border-b border-border/50">
        <div>
          <h1 className="text-xl font-bold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Поиск..."
              className="pl-9 w-[240px] h-9 bg-muted/50 border-0 focus-visible:ring-1"
            />
          </div>

          {/* Quick add */}
          <Button
            size="sm"
            className="gap-1.5 shadow-lg shadow-primary/25"
            onClick={() => setShowNewAppointment(true)}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Новая запись</span>
          </Button>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* User */}
          <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-border/50">
            <AvatarImage src="/avatar.jpg" />
            <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
              АМ
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      <NewAppointmentModal open={showNewAppointment} onOpenChange={setShowNewAppointment} />
    </>
  )
}
