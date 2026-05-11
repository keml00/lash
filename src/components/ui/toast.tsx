"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react"

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "error" | "info") => void
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} })

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium animate-slide-up min-w-[280px]",
              toast.type === "success" && "bg-emerald-50 border-emerald-200 text-emerald-800",
              toast.type === "error" && "bg-red-50 border-red-200 text-red-800",
              toast.type === "info" && "bg-blue-50 border-blue-200 text-blue-800"
            )}
          >
            {toast.type === "success" && <CheckCircle2 className="w-4 h-4 shrink-0" />}
            {toast.type === "error" && <AlertCircle className="w-4 h-4 shrink-0" />}
            {toast.type === "info" && <Info className="w-4 h-4 shrink-0" />}
            <span className="flex-1">{toast.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="p-0.5 rounded hover:bg-black/5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
