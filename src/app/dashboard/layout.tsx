"use client"

import React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { ToastProvider } from "@/components/ui/toast"
import { StoreProvider } from "@/lib/store"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StoreProvider>
      <ToastProvider>
        <div className="min-h-screen bg-background">
          <Sidebar />
          <main className="lg:pl-[260px] transition-all duration-300">
            {children}
          </main>
        </div>
      </ToastProvider>
    </StoreProvider>
  )
}
