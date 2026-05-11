import { NextRequest, NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || ""
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || ""

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { page, referrer, userAgent, timestamp } = body

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown"
    const geo = req.headers.get("x-vercel-ip-country") || ""
    const city = req.headers.get("x-vercel-ip-city") || ""

    const message = [
      `🆕 Новый посетитель на сайте`,
      ``,
      `📍 Страница: ${page || "/"}`,
      `🌍 Гео: ${city ? decodeURIComponent(city) + ", " : ""}${geo || "N/A"}`,
      `🔗 Источник: ${referrer || "Прямой переход"}`,
      `📱 Устройство: ${parseDevice(userAgent || "")}`,
      `🕐 Время: ${new Date(timestamp || Date.now()).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })}`,
      `🌐 IP: ${ip}`,
    ].join("\n")

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

function parseDevice(ua: string): string {
  if (!ua) return "Неизвестно"
  if (/iPhone/i.test(ua)) return "iPhone"
  if (/iPad/i.test(ua)) return "iPad"
  if (/Android/i.test(ua)) return "Android"
  if (/Mac/i.test(ua)) return "macOS"
  if (/Windows/i.test(ua)) return "Windows"
  if (/Linux/i.test(ua)) return "Linux"
  return "Другое"
}
