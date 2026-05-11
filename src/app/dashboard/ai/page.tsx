"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Sparkles,
  Brain,
  TrendingUp,
  MessageSquare,
  Calendar,
  Megaphone,
  Users,
  Zap,
  Send,
  Copy,
  RefreshCw,
  CheckCircle2,
  Clock,
  BarChart3,
  Target,
  Lightbulb,
} from "lucide-react"

const aiTools = [
  {
    id: "forecast",
    title: "Прогноз загрузки",
    description: "AI предсказывает загруженность на следующую неделю на основе истории записей",
    icon: TrendingUp,
    color: "bg-blue-500/10 text-blue-600",
    status: "ready",
  },
  {
    id: "promotions",
    title: "Рекомендации по акциям",
    description: "Анализ клиентской базы и предложения по персональным акциям",
    icon: Target,
    color: "bg-emerald-500/10 text-emerald-600",
    status: "ready",
  },
  {
    id: "clients",
    title: "Анализ клиентов",
    description: "Сегментация клиентов, выявление оттока и рекомендации по удержанию",
    icon: Users,
    color: "bg-violet-500/10 text-violet-600",
    status: "ready",
  },
  {
    id: "autoreply",
    title: "Автоответы клиентам",
    description: "Генерация персонализированных ответов на сообщения клиентов",
    icon: MessageSquare,
    color: "bg-pink-500/10 text-pink-600",
    status: "ready",
  },
  {
    id: "rebooking",
    title: "Рекомендации по записи",
    description: "AI напоминает когда пора предложить клиенту повторную запись",
    icon: Calendar,
    color: "bg-amber-500/10 text-amber-600",
    status: "ready",
  },
  {
    id: "marketing",
    title: "Генерация контента",
    description: "Создание текстов для Instagram, Telegram, рекламных постов и сторис",
    icon: Megaphone,
    color: "bg-indigo-500/10 text-indigo-600",
    status: "ready",
  },
]

const forecastData = [
  { day: "Понедельник", load: 65, appointments: 8, revenue: "34 000 ₽" },
  { day: "Вторник", load: 78, appointments: 10, revenue: "42 000 ₽" },
  { day: "Среда", load: 55, appointments: 7, revenue: "28 000 ₽" },
  { day: "Четверг", load: 82, appointments: 11, revenue: "48 000 ₽" },
  { day: "Пятница", load: 92, appointments: 13, revenue: "56 000 ₽" },
  { day: "Суббота", load: 98, appointments: 14, revenue: "62 000 ₽" },
  { day: "Воскресенье", load: 30, appointments: 4, revenue: "16 000 ₽" },
]

const clientInsights = [
  {
    type: "churn_risk",
    title: "Риск оттока",
    clients: ["Ольга Новикова", "Светлана Петрова", "Юлия Григорьева"],
    action: "Не были 30+ дней. Рекомендуем отправить персональное предложение со скидкой 15%.",
    priority: "high",
  },
  {
    type: "upsell",
    title: "Потенциал апсейла",
    clients: ["Елена Смирнова", "Ирина Волкова"],
    action: "Регулярно делают окрашивание. Предложите комплексный уход (кератин + окрашивание) со скидкой.",
    priority: "medium",
  },
  {
    type: "birthday",
    title: "Дни рождения на этой неделе",
    clients: ["Мария Иванова (15 мая)", "Анастасия Козлова (17 мая)"],
    action: "Отправьте поздравление с бонусом 500 баллов на следующий визит.",
    priority: "low",
  },
]

const generatedTexts = [
  {
    platform: "Instagram",
    text: "✨ Весеннее преображение начинается здесь!\n\nАвторское окрашивание от наших колористов — это не просто цвет, это искусство.\n\n🎁 До конца мая — бесплатный уход Olaplex при окрашивании\n\n📱 Запись через ссылку в био или в директ",
  },
  {
    platform: "Telegram",
    text: "Привет! 👋\n\nНапоминаем, что у вас накоплено 3200 бонусных баллов!\n\nИспользуйте их для оплаты до 30% стоимости следующей услуги.\n\nЗаписаться: [ссылка]\n\nЖдём вас! 💜",
  },
]

export default function AIPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const [chatInput, setChatInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 2000)
  }

  return (
    <>
      <Header title="AI Ассистент" subtitle="Интеллектуальные инструменты для вашего бизнеса" />

      <div className="p-6 space-y-6">
        {/* AI Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="overflow-hidden border-0 shadow-xl">
            <div className="relative p-6 sm:p-8 gradient-primary">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,white,transparent_70%)]" />
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-6 h-6 text-white" />
                    <h2 className="text-xl font-bold text-white">Glamify AI</h2>
                    <Badge className="bg-white/20 text-white border-0 text-[10px]">Beta</Badge>
                  </div>
                  <p className="text-white/80 text-sm max-w-lg">
                    AI-ассистент анализирует данные вашего салона и помогает принимать решения:
                    прогнозирует загрузку, рекомендует акции и генерирует контент.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-white/20 text-white text-sm font-medium">
                    <Zap className="w-4 h-4 inline mr-1" />
                    42 запроса сегодня
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* AI Tools Grid */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Инструменты</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiTools.map((tool, i) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                    activeTool === tool.id ? "ring-2 ring-primary shadow-lg" : ""
                  }`}
                  onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tool.color}`}>
                        <tool.icon className="w-5 h-5" />
                      </div>
                      <Badge variant="success" className="text-[10px]">
                        <CheckCircle2 className="w-3 h-3 mr-0.5" /> Готов
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{tool.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI Results Sections */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Load Forecast */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-base font-semibold">Прогноз на следующую неделю</CardTitle>
              </div>
              <CardDescription>На основе данных за последние 3 месяца</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {forecastData.map((day) => (
                <div key={day.day} className="flex items-center gap-3">
                  <span className="text-sm w-28 shrink-0">{day.day}</span>
                  <div className="flex-1">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          day.load >= 90 ? "bg-red-500" :
                          day.load >= 70 ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${day.load}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground w-10 text-right">{day.load}%</span>
                  <span className="text-xs font-medium w-20 text-right hidden sm:block">{day.revenue}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-border/50">
                <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-100">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800">
                    <strong>Рекомендация:</strong> Суббота загружена на 98%. Рассмотрите возможность добавить дополнительного мастера или открыть запись на воскресенье.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Client Insights */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-violet-600" />
                <CardTitle className="text-base font-semibold">Инсайты по клиентам</CardTitle>
              </div>
              <CardDescription>AI-рекомендации для увеличения лояльности</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {clientInsights.map((insight, i) => (
                <div key={i} className={`p-3 rounded-xl border ${
                  insight.priority === "high" ? "border-red-100 bg-red-50/50" :
                  insight.priority === "medium" ? "border-amber-100 bg-amber-50/50" :
                  "border-blue-100 bg-blue-50/50"
                }`}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge variant={
                      insight.priority === "high" ? "destructive" :
                      insight.priority === "medium" ? "warning" : "info"
                    } className="text-[10px]">
                      {insight.title}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1.5">
                    {insight.clients.join(", ")}
                  </p>
                  <p className="text-xs font-medium">{insight.action}</p>
                  <Button size="sm" variant="ghost" className="h-7 text-xs mt-2 gap-1">
                    <Zap className="w-3 h-3" /> Применить
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Content Generator */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-indigo-600" />
              <CardTitle className="text-base font-semibold">Генератор контента</CardTitle>
            </div>
            <CardDescription>AI создаёт тексты для соцсетей и рассылок</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Input */}
            <div className="flex gap-2 mb-6">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Опишите что хотите — например: пост про акцию на окрашивание в мае..."
                className="flex-1"
              />
              <Button onClick={handleGenerate} disabled={isGenerating} className="gap-1.5 shadow-lg shadow-primary/25">
                {isGenerating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Сгенерировать
              </Button>
            </div>

            {/* Generated content */}
            <div className="grid md:grid-cols-2 gap-4">
              {generatedTexts.map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-border/50 bg-muted/30">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">{item.platform}</Badge>
                    <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                      <Copy className="w-3 h-3" /> Копировать
                    </Button>
                  </div>
                  <p className="text-sm whitespace-pre-line leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Chat */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-violet-600" />
              <CardTitle className="text-base font-semibold">AI Чат</CardTitle>
            </div>
            <CardDescription>Задайте любой вопрос о вашем бизнесе</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4 p-4 rounded-xl bg-muted/30 min-h-[200px]">
              {/* AI message */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="p-3 rounded-xl bg-white border border-border/50 max-w-[80%]">
                  <p className="text-sm">
                    Привет! Я AI-ассистент Glamify. Могу помочь с аналитикой, прогнозами, составлением текстов и рекомендациями по работе салона. Что вас интересует?
                  </p>
                </div>
              </div>

              {/* User message example */}
              <div className="flex gap-3 justify-end">
                <div className="p-3 rounded-xl bg-primary text-primary-foreground max-w-[80%]">
                  <p className="text-sm">Какие услуги стоит продвигать в июне?</p>
                </div>
              </div>

              {/* AI response */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="p-3 rounded-xl bg-white border border-border/50 max-w-[80%]">
                  <p className="text-sm">
                    На основе аналитики прошлого года и текущих трендов, рекомендую в июне продвигать:
                  </p>
                  <ul className="text-sm mt-2 space-y-1 list-disc pl-4">
                    <li><strong>Окрашивание</strong> — сезон обновления, спрос +23% к маю</li>
                    <li><strong>Педикюр</strong> — начало сезона открытой обуви, рост +45%</li>
                    <li><strong>Укладки</strong> — выпускные и свадьбы, рост +30%</li>
                  </ul>
                  <p className="text-sm mt-2">Рекомендую запустить комбо-акцию «Готова к лету» (маникюр + педикюр + укладка) со скидкой 20%.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Input placeholder="Спросите что-нибудь..." className="flex-1" />
              <Button size="icon" className="shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
