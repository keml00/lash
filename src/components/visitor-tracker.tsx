"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function VisitorTracker() {
  const pathname = usePathname()

  useEffect(() => {
    const key = `visited_${pathname}`
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, "1")

    fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        page: pathname,
        referrer: document.referrer || "",
        userAgent: navigator.userAgent,
        timestamp: Date.now(),
      }),
    }).catch(() => {})
  }, [pathname])

  return null
}
