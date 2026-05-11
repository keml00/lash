import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { VisitorTracker } from "@/components/visitor-tracker"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Glamify — CRM для салонов красоты",
  description: "Современная CRM-система для бьюти-мастеров и салонов красоты с AI-функциями, автоматизацией записи и учетом материалов",
  keywords: ["CRM", "салон красоты", "бьюти", "запись клиентов", "AI"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <VisitorTracker />
        {children}
      </body>
    </html>
  )
}
