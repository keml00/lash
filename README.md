# Glamify — CRM для салонов красоты

Современная SaaS CRM-система с AI-функциями для бьюти-мастеров и салонов красоты.

## Возможности

- **Dashboard** — статистика, графики доходов, загруженность мастеров
- **Онлайн запись** — календарь с drag & drop, цветовые статусы
- **Клиентская база** — карточки, история, бонусы, предпочтения
- **Учёт материалов** — склад, автосписание, поставщики
- **Финансы** — аналитика по мастерам и услугам, графики
- **AI Ассистент** — прогнозы, рекомендации, генерация контента
- **Напоминания** — SMS, Telegram, WhatsApp, Email
- **Админ панель** — роли, интеграции, тарифы

## Технологии

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Prisma ORM
- Recharts
- Framer Motion
- shadcn/ui компоненты

## Запуск

```bash
npm install
npm run dev
```

## Структура

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   └── dashboard/
│       ├── page.tsx                # Dashboard
│       ├── appointments/page.tsx   # Записи
│       ├── clients/page.tsx        # Клиенты
│       ├── materials/page.tsx      # Материалы
│       ├── finances/page.tsx       # Финансы
│       ├── ai/page.tsx             # AI Ассистент
│       └── settings/page.tsx       # Настройки
├── components/
│   ├── ui/                         # UI компоненты
│   ├── layout/                     # Sidebar, Header
│   └── dashboard/                  # Виджеты дашборда
└── lib/
    └── utils.ts                    # Утилиты
```

## Лицензия

MIT 2026
