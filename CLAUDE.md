Проект называется "Proximol" 

Комиты делаем вот на этот гит хаб  https://github.com/bekmaganbetovasamal5-beep/Proximol 

Everytime read instructions from file 
NOTES.md
API_DOCS.md , ARCHITECTURE.md , CHANGELOG.md ,CONTRIBUTING.md, DEPLOYMENT.md NOTES.md openapi.yaml SUMMARY.md TODO.md

При каждом изменении кода:
1. Обнови файл changelog.md с описанием изменений в формате:
   - Дата и время
   - Что изменено
   - Причина изменения
   
2. Обнови файл summary.md с текущим состоянием проекта


Архитектура проекта 
 MOBILE APP (Expo)             │
│  Framework: Expo SDK 52+                │
│  Language: TypeScript ✅                │
│  UI Library: Tamagui                    │
│  Navigation: Expo Router                │
│  State: React Query (данные с сервера)  │
│         + Zustand (локальный state)     │
│  Push: react-native-firebase (FCM)      │
└─────────────────────────────────────────┘
              ↕ HTTP/REST
┌─────────────────────────────────────────┐
│          BACKEND (Express)              │
│  Framework: Express.js                  │
│  Language: TypeScript ✅                │
│  Auth: Supabase (Service Layer)         │
│  Validation: Zod                        │
│  Database: PostgreSQL + Prisma          │
│  Push: Firebase Admin SDK (FCM)         │
│  Analytics: PostHog  (облачная будет )            
