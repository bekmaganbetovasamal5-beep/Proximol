# Proximol Mobile App - Context Storage

## Project Overview
Proximol - это full-stack проект с poll/survey мобильным приложением на Expo.

## Architecture (из CLAUDE.md)

### MOBILE APP (Expo)
- **Framework**: Expo SDK 52+ ✅
- **Language**: TypeScript ✅
- **UI Library**: Tamagui 📱
- **Navigation**: Expo Router 🛣️
- **State**: React Query (данные с сервера) + Zustand (локальный state) 🔄
- **Push**: react-native-firebase (FCM) 📬

## Figma Analysis Results
Анализ дизайна: https://www.figma.com/design/JrNadxr5aWUoLKDgndAw6y/Poll_application?node-id=0-1&t=J4ahBzMt3ple3Rmf-1

### Основные экраны:
1. **Home Screen** - Список опросов, поиск, фильтры
2. **Create Poll** - Создание новых опросов
3. **Poll Detail** - Детали опроса, участие
4. **Results** - Результаты опроса
5. **Profile** - Профиль пользователя, настройки

## Backend Integration
- **API URL**: http://localhost:3003
- **Auth**: Supabase (уже настроен)
- **Endpoints**: /api/auth, /api/users

## Технологический стек для реализации:
- Expo SDK 52+ с TypeScript
- Tamagui для UI компонентов
- Expo Router для file-based навигации
- React Query для server state
- Zustand для client state
- Supabase для аутентификации
- Firebase для push-уведомлений

## Текущий статус:
- Backend готов и работает на порту 3003
- Supabase настроен с реальными данными
- Docker контейнеры запущены
- Готов к созданию mobile app

## Следующие шаги:
1. Создать Expo проект
2. Настроить Tamagui
3. Настроить Expo Router
4. Интегрировать Supabase auth
5. Создать базовые экраны

## Сохранено для будущих сессий:
- Архитектура проекта
- Figma дизайн спецификация
- Backend эндпоинты
- План разработки poll приложения