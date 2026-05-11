"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Scissors,
  Calendar,
  Users,
  Sparkles,
  Package,
  DollarSign,
  Bell,
  ArrowRight,
  Check,
  Star,
  Zap,
  Shield,
  Smartphone,
  Globe,
  Bot,
  BarChart3,
  MessageSquare,
  QrCode,
} from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
}

const features = [
  {
    icon: Calendar,
    title: "Онлайн запись",
    description: "Drag & drop календарь с цветовыми статусами. Клиенты записываются 24/7.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    icon: Users,
    title: "Клиентская база",
    description: "Карточки клиентов, история, предпочтения, фото работ и бонусная система.",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Sparkles,
    title: "AI Ассистент",
    description: "Прогноз загрузки, рекомендации по акциям, автоответы клиентам.",
    color: "bg-violet-500/10 text-violet-600",
  },
  {
    icon: Package,
    title: "Учёт материалов",
    description: "Автоматическое списание, уведомления о нехватке, аналитика расходов.",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: DollarSign,
    title: "Финансы",
    description: "Доходы, расходы, аналитика по мастерам и услугам с графиками.",
    color: "bg-green-500/10 text-green-600",
  },
  {
    icon: Bell,
    title: "Напоминания",
    description: "SMS, Telegram, WhatsApp, Email — автоматически за 24ч и 2ч до визита.",
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    icon: BarChart3,
    title: "Аналитика",
    description: "Детальные отчёты, графики загруженности, популярные услуги и тренды.",
    color: "bg-indigo-500/10 text-indigo-600",
  },
  {
    icon: MessageSquare,
    title: "Telegram бот",
    description: "Интеграция с Telegram для записи, уведомлений и общения с клиентами.",
    color: "bg-sky-500/10 text-sky-600",
  },
  {
    icon: QrCode,
    title: "QR запись",
    description: "Клиенты сканируют QR-код и моментально записываются на услугу.",
    color: "bg-orange-500/10 text-orange-600",
  },
]

const plans = [
  {
    name: "Basic",
    price: "990",
    period: "мес",
    description: "Для индивидуальных мастеров",
    features: [
      "1 мастер",
      "До 100 клиентов",
      "Онлайн запись",
      "SMS напоминания",
      "Базовая аналитика",
      "Мобильное приложение",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "2 490",
    period: "мес",
    description: "Для небольших салонов",
    features: [
      "До 5 мастеров",
      "Безлимит клиентов",
      "AI ассистент",
      "Telegram + WhatsApp",
      "Учёт материалов",
      "Финансовая аналитика",
      "QR запись",
      "Бонусная система",
    ],
    popular: true,
  },
  {
    name: "Business",
    price: "5 990",
    period: "мес",
    description: "Для сети салонов",
    features: [
      "Безлимит мастеров",
      "Несколько филиалов",
      "Все AI функции",
      "API интеграции",
      "Белый лейбл",
      "Приоритетная поддержка",
      "Кастомные отчёты",
      "Реферальная система",
      "Обучение команды",
    ],
    popular: false,
  },
]

const testimonials = [
  {
    name: "Анна Петрова",
    role: "Владелица салона «Bloom»",
    text: "Glamify полностью изменил работу нашего салона. Клиенты записываются сами, мастера видят своё расписание, а я — всю аналитику.",
    rating: 5,
  },
  {
    name: "Мария Козлова",
    role: "Бровист, частная практика",
    text: "Наконец-то CRM, которая не перегружена лишним. Всё просто, красиво и работает. AI-подсказки реально помогают с загрузкой.",
    rating: 5,
  },
  {
    name: "Дмитрий Волков",
    role: "Управляющий сетью «Luxe Hair»",
    text: "Ведём 3 филиала через одну систему. Финансы прозрачны, материалы под контролем. Окупилось за первый месяц.",
    rating: 5,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-violet-500/25">
              <Scissors className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">Glamify</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Возможности
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Тарифы
            </a>
            <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Отзывы
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Войти</Link>
            </Button>
            <Button size="sm" className="shadow-lg shadow-primary/25" asChild>
              <Link href="/dashboard">Начать бесплатно</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              AI-powered CRM для индустрии красоты
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Управляйте салоном{" "}
            <span className="text-gradient">красиво</span>
            <br />
            и эффективно
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Современная CRM-система с AI для бьюти-мастеров и салонов красоты.
            Автоматизация записей, учёт материалов, финансовая аналитика — всё в одном месте.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-base px-8 shadow-xl shadow-primary/30" asChild>
              <Link href="/dashboard">
                Попробовать бесплатно
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8">
              Смотреть демо
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" /> 14 дней бесплатно
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" /> Без карты
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-500" /> Настройка за 5 минут
            </span>
          </motion.div>
        </motion.div>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-6xl mx-auto mt-16"
        >
          <div className="relative rounded-2xl border border-border/50 shadow-2xl shadow-black/5 overflow-hidden bg-gradient-to-b from-muted/30 to-muted/80 p-1">
            <div className="rounded-xl bg-white overflow-hidden">
              {/* Mock dashboard preview */}
              <div className="h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-8 w-full max-w-4xl">
                  {[
                    { label: "Записей сегодня", value: "12", trend: "+3" },
                    { label: "Доход за неделю", value: "87 500 ₽", trend: "+12%" },
                    { label: "Новых клиентов", value: "8", trend: "+2" },
                    { label: "Рейтинг", value: "4.9", trend: "★" },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white shadow-lg border border-border/50">
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <span className="text-xs text-emerald-600 font-medium">{stat.trend}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Возможности</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Всё, что нужно вашему салону
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              От онлайн-записи до AI-аналитики — полный набор инструментов для роста вашего бизнеса
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-6 rounded-2xl bg-white border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "2 500+", label: "Салонов" },
              { value: "50 000+", label: "Записей в день" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9/5", label: "Рейтинг" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-3xl sm:text-4xl font-bold text-gradient">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Тарифы</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Простые и прозрачные цены
            </h2>
            <p className="text-lg text-muted-foreground">
              Начните бесплатно, масштабируйтесь по мере роста
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                  plan.popular
                    ? "bg-white border-primary/30 shadow-xl shadow-primary/10 scale-[1.02]"
                    : "bg-white border-border/50 shadow-sm hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="gradient-primary border-0 px-3 py-1">
                      <Zap className="w-3 h-3 mr-1" /> Популярный
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">₽/{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? "shadow-lg shadow-primary/25" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                  asChild
                >
                  <Link href="/dashboard">
                    Начать бесплатно
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Отзывы</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Нас любят мастера по всей России
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-border/50 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl gradient-primary relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-50" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Готовы начать?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-lg mx-auto">
                Присоединяйтесь к 2500+ салонам, которые уже используют Glamify для роста бизнеса
              </p>
              <Button size="lg" variant="secondary" className="text-base px-8 bg-white text-violet-700 hover:bg-white/90" asChild>
                <Link href="/dashboard">
                  Начать 14-дневный триал
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Scissors className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg">Glamify</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                CRM нового поколения для индустрии красоты
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Продукт</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground transition-colors">Возможности</a></li>
                <li><a href="#pricing" className="hover:text-foreground transition-colors">Тарифы</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Интеграции</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Документация</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Telegram</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Статус</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Glamify. Все права защищены.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-foreground transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
