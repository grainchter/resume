# Yana Kazakova — Frontend Developer CV

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com)

Сайт: https://resume-tau-sepia.vercel.app/

---

## О проекте

Этот проект представляет собой персональное резюме и одновременно демонстрацию инженерного подхода к разработке интерфейсов. Основное внимание уделено качеству пользовательского опыта, масштабируемости и чистоте кода.

---

## Основные возможности

* Поддержка нескольких языков (русский и английский) с мгновенным переключением
* Интеграция с GitHub API для отображения активности разработчика
* Интерактивный блок с демонстрацией кода и работоспособной формой обратной связи
* Полностью адаптивный интерфейс для мобильных и десктопных устройств
* Оптимизация производительности за счёт статической генерации и кэширования

---

## Технологический стек

| Категория   | Используемые технологии     |
| ----------- | --------------------------- |
| Фреймворк   | Next.js 16 (App Router)     |
| Язык        | TypeScript                  |
| Стили       | Tailwind CSS                |
| Анимации    | Motion (Framer Motion)      |
| Локализация | next-intl                   |
| API         | Кастомный ApiClient         |
| GitHub API  | @octokit/graphql            |
| Email       | Resend                      |
| Деплой      | Vercel                      |

---

## Архитектура

Проект реализован с использованием подхода Feature-Sliced Design (FSD), который упрощает масштабирование и поддержку кода.

```
src/
├── app/        # маршрутизация и серверные слои Next.js
├── entities/   # бизнес-сущности
├── features/   # пользовательские сценарии
├── widgets/    # независимые блоки интерфейса
├── shared/     # общие компоненты, утилиты и API
└── public/     # статические ресурсы
```

---

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone https://github.com/grainchter/resume.git
cd resume
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка окружения

Создайте файл `.env.local` и добавьте необходимые переменные:

```env
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_USERNAME=github_username

RESEND_API_KEY=re_your_resend_key
EMAIL_TO=your_email@example.com

MY_EMAIL=your@email.com
MY_GITHUB=https://github.com/your_github
MY_TG=https://t.me/your_username
```

### 4. Запуск проекта

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

### 5. Production-сборка

```bash
npm run build
npm start
```

---

## Доступные команды

* `npm run dev` — запуск в режиме разработки
* `npm run build` — сборка проекта
* `npm run start` — запуск production-версии
* `npm run lint` — проверка кода

---

## Деплой

Проект готов к автоматическому деплою через Vercel.

1. Подключите репозиторий
2. Добавьте переменные окружения
3. Деплой выполнится автоматически при обновлении ветки `main`

---

## Обратная связь

Email: [grainchter@gmail.com](mailto:grainchter@gmail.com)
Telegram: https://t.me/yanakaz
GitHub: https://github.com/grainchter

