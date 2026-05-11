"use client"

import React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { ToastProvider } from "@/components/ui/toast"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-background">
        <Sidebar />
        <main className="lg:pl-[260px] transition-all duration-300">
          {children}
        </main>
      </div>
    </ToastProvider>
  )
}
