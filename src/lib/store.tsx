"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

// Types
export interface Appointment {
  id: string
  client: string
  phone: string
  service: string
  serviceName: string
  master: string
  masterName: string
  date: string
  time: string
  duration: number
  price: number
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  notes: string
  color: string
}

export interface Client {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
  birthDate: string
  source: string
  notes: string
  visits: number
  totalSpent: number
  avgCheck: number
  lastVisit: string
  bonusPoints: number
  discount: number
  tags: string[]
  createdAt: string
}

export interface AppFilter {
  status: string
  master: string
  service: string
  dateFrom: string
  dateTo: string
}

export interface ClientFilter {
  tags: string[]
  visitsFrom: number
  visitsTo: number
  lastVisitFrom: string
  lastVisitTo: string
}

// Initial data
const initialAppointments: Appointment[] = [
  { id: "1", client: "Елена Смирнова", phone: "+7 (999) 123-45-67", service: "coloring", serviceName: "Окрашивание волос", master: "anna", masterName: "Анна Морозова", date: "2025-05-12", time: "10:00", duration: 120, price: 6500, status: "confirmed", notes: "", color: "bg-violet-500" },
  { id: "2", client: "Мария Иванова", phone: "+7 (925) 987-65-43", service: "manicure", serviceName: "Маникюр + покрытие", master: "olga", masterName: "Ольга Кузнецова", date: "2025-05-12", time: "11:30", duration: 90, price: 2800, status: "in_progress", notes: "", color: "bg-blue-500" },
  { id: "3", client: "Анастасия Козлова", phone: "+7 (916) 555-33-22", service: "haircut", serviceName: "Стрижка + укладка", master: "darya", masterName: "Дарья Соколова", date: "2025-05-12", time: "13:00", duration: 60, price: 3200, status: "pending", notes: "", color: "bg-emerald-500" },
  { id: "4", client: "Ирина Волкова", phone: "+7 (903) 222-11-00", service: "lashes", serviceName: "Наращивание ресниц 2D", master: "anna", masterName: "Анна Морозова", date: "2025-05-12", time: "14:30", duration: 120, price: 4500, status: "confirmed", notes: "", color: "bg-pink-500" },
  { id: "5", client: "Татьяна Морозова", phone: "+7 (977) 444-55-66", service: "brows", serviceName: "Коррекция бровей", master: "ekaterina", masterName: "Екатерина Лебедева", date: "2025-05-12", time: "15:00", duration: 60, price: 2200, status: "pending", notes: "", color: "bg-amber-500" },
  { id: "6", client: "Светлана Петрова", phone: "+7 (926) 777-88-99", service: "pedicure", serviceName: "Педикюр", master: "olga", masterName: "Ольга Кузнецова", date: "2025-05-13", time: "10:00", duration: 90, price: 3000, status: "confirmed", notes: "", color: "bg-teal-500" },
  { id: "7", client: "Ольга Новикова", phone: "+7 (915) 111-22-33", service: "haircut", serviceName: "Укладка праздничная", master: "darya", masterName: "Дарья Соколова", date: "2025-05-13", time: "12:00", duration: 60, price: 2500, status: "confirmed", notes: "", color: "bg-indigo-500" },
]

const initialClients: Client[] = [
  { id: "1", firstName: "Елена", lastName: "Смирнова", phone: "+7 (999) 123-45-67", email: "elena@mail.ru", birthDate: "", source: "Instagram", notes: "", visits: 24, totalSpent: 156000, avgCheck: 6500, lastVisit: "2 дня назад", bonusPoints: 3200, discount: 10, tags: ["VIP", "Постоянный"], createdAt: "2024-01-15" },
  { id: "2", firstName: "Мария", lastName: "Иванова", phone: "+7 (925) 987-65-43", email: "maria.i@gmail.com", birthDate: "", source: "Рекомендация", notes: "", visits: 12, totalSpent: 48000, avgCheck: 4000, lastVisit: "5 дней назад", bonusPoints: 1200, discount: 5, tags: ["Постоянный"], createdAt: "2024-03-20" },
  { id: "3", firstName: "Анастасия", lastName: "Козлова", phone: "+7 (916) 555-33-22", email: "nastya.k@yandex.ru", birthDate: "", source: "Telegram", notes: "", visits: 8, totalSpent: 32000, avgCheck: 4000, lastVisit: "1 неделю назад", bonusPoints: 800, discount: 0, tags: ["Новый"], createdAt: "2024-06-10" },
  { id: "4", firstName: "Ирина", lastName: "Волкова", phone: "+7 (903) 222-11-00", email: "irina.v@mail.ru", birthDate: "", source: "Сайт", notes: "", visits: 36, totalSpent: 234000, avgCheck: 6500, lastVisit: "Вчера", bonusPoints: 5600, discount: 15, tags: ["VIP", "Постоянный", "Бонус"], createdAt: "2023-09-01" },
  { id: "5", firstName: "Татьяна", lastName: "Морозова", phone: "+7 (977) 444-55-66", email: "tanya.m@gmail.com", birthDate: "", source: "QR код", notes: "", visits: 6, totalSpent: 18000, avgCheck: 3000, lastVisit: "2 недели назад", bonusPoints: 400, discount: 0, tags: [], createdAt: "2024-08-15" },
  { id: "6", firstName: "Светлана", lastName: "Петрова", phone: "+7 (926) 777-88-99", email: "sveta.p@mail.ru", birthDate: "", source: "Instagram", notes: "", visits: 18, totalSpent: 86400, avgCheck: 4800, lastVisit: "3 дня назад", bonusPoints: 2100, discount: 7, tags: ["Постоянный"], createdAt: "2024-02-28" },
]

// Context
interface StoreContextType {
  appointments: Appointment[]
  clients: Client[]
  addAppointment: (apt: Omit<Appointment, "id">) => void
  updateAppointment: (id: string, data: Partial<Appointment>) => void
  deleteAppointment: (id: string) => void
  addClient: (client: Omit<Client, "id" | "visits" | "totalSpent" | "avgCheck" | "lastVisit" | "bonusPoints" | "discount" | "tags" | "createdAt">) => void
  deleteClient: (id: string) => void
  appFilter: AppFilter
  setAppFilter: (f: AppFilter) => void
  clientFilter: ClientFilter
  setClientFilter: (f: ClientFilter) => void
}

const StoreContext = createContext<StoreContextType>({
  appointments: [],
  clients: [],
  addAppointment: () => {},
  updateAppointment: () => {},
  deleteAppointment: () => {},
  addClient: () => {},
  deleteClient: () => {},
  appFilter: { status: "", master: "", service: "", dateFrom: "", dateTo: "" },
  setAppFilter: () => {},
  clientFilter: { tags: [], visitsFrom: 0, visitsTo: 999, lastVisitFrom: "", lastVisitTo: "" },
  setClientFilter: () => {},
})

export function useStore() {
  return useContext(StoreContext)
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [appFilter, setAppFilter] = useState<AppFilter>({ status: "", master: "", service: "", dateFrom: "", dateTo: "" })
  const [clientFilter, setClientFilter] = useState<ClientFilter>({ tags: [], visitsFrom: 0, visitsTo: 999, lastVisitFrom: "", lastVisitTo: "" })

  const addAppointment = useCallback((apt: Omit<Appointment, "id">) => {
    const id = Math.random().toString(36).slice(2, 10)
    setAppointments((prev) => [{ ...apt, id }, ...prev])
  }, [])

  const updateAppointment = useCallback((id: string, data: Partial<Appointment>) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, ...data } : a)))
  }, [])

  const deleteAppointment = useCallback((id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id))
  }, [])

  const addClient = useCallback((client: Omit<Client, "id" | "visits" | "totalSpent" | "avgCheck" | "lastVisit" | "bonusPoints" | "discount" | "tags" | "createdAt">) => {
    const id = Math.random().toString(36).slice(2, 10)
    setClients((prev) => [{
      ...client,
      id,
      visits: 0,
      totalSpent: 0,
      avgCheck: 0,
      lastVisit: "Новый",
      bonusPoints: 0,
      discount: 0,
      tags: ["Новый"],
      createdAt: new Date().toISOString().slice(0, 10),
    }, ...prev])
  }, [])

  const deleteClient = useCallback((id: string) => {
    setClients((prev) => prev.filter((c) => c.id !== id))
  }, [])

  return (
    <StoreContext.Provider value={{
      appointments,
      clients,
      addAppointment,
      updateAppointment,
      deleteAppointment,
      addClient,
      deleteClient,
      appFilter,
      setAppFilter,
      clientFilter,
      setClientFilter,
    }}>
      {children}
    </StoreContext.Provider>
  )
}
