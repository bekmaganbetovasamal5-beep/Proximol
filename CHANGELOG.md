# Changelog

Формирование изменений в проекте Proximol. Сюда будешь добавлять изменения в проекте

## [1.1.0] - 2025-11-11 14:45
### Added
- **TypeScript Integration**: Полный переход на TypeScript
  - Установлены TypeScript 5.9.3 и типы для Node.js/Express
  - Настроена tsconfig.json с оптимальными настройками
  - Обновлены скрипты сборки и разработки
- **Backend Architecture**: Создание полноценной архитектуры
  - Express.js с TypeScript
  - Supabase интеграция для авторизации
  - Zod для валидации данных
  - Prisma ORM для работы с PostgreSQL
  - Firebase Admin SDK для push-уведомлений
  - PostHog для аналитики
- **Database Models**: Созданы модели данных
  - User - пользователи
  - Profile - профили пользователей
  - Session - сессии авторизации
  - Notification - уведомления
- **API Routes**: Реализованы базовые эндпоинты
  - `/api/auth` - регистрация, вход, выход
  - `/api/users` - управление профилем
  - Middleware для аутентификации и валидации
- **Docker Configuration**: Обновление для TypeScript
  - Multi-stage build с компиляцией TypeScript
  - Автоматическая генерация Prisma client
  - Правильные порты: Backend 3003, PostgreSQL 5433, Redis 6381
- **Environment Setup**: Расширенная конфигурация
  - Переменные для Supabase, Firebase, PostHog
  - Шаблоны для заполнения данными

### Changed
- **Structure**: Перенос кода в `src/` директорию
- **Build Process**: Добавлена компиляция TypeScript в Docker
- **Error Handling**: Улучшена обработка ошибок с детальными сообщениями

### Technical Details
- TypeScript: 5.9.3
- Prisma: 6.19.0 с PostgreSQL provider
- Zod: 4.1.12 для валидации
- Supabase JS: 2.81.0
- Firebase Admin: 13.6.0
- Все контейнеры работают на указанных портах

## [Unreleased]
### Planned
- Frontend мобильное приложение на Expo
- Настройка Supabase проекта с реальными данными
- Firebase конфигурация для push-уведомлений


## [1.0.0] - 2024-10-09
### Added
- Initial project setup
- Express.js server configuration
- PostgreSQL database integration
- Docker and Docker Compose configuration
- Environment variables setup (.env)
Supabase mcp

 MCP (Model Context Protocol) integration with:
  - Playwright
  - Figma
  - Supabase
  - PostgreSQL
  - HTTP requests
  - Sequential thinking
  - Serena 
- Firecrawl 
- Browserbase 
- Web to mcp 
- Chrome dev tools 
- Nodemon for development
- Basic project structure
- context7 
- file system 
- sentry

### Technical Details
- Node.js version: >=22
- Express version: ^5.1.0
- PostgreSQL version: ^8.16.3
- Redis version: ^5.8.2
- Package type: ES Modules

### Files Added
- `index.js` - Main application file
- `package.json` - Dependencies and scripts
- `.env` - Environment variables
- `docker-compose.yml` - Docker Compose configuration
- `Dockerfile` - Docker image configuration
- `mcp.json` - MCP server configuration
- `.gitignore` - Git ignore rules

---

## Правила версионирования
- **Major** - обратно несовместимые изменения
- **Minor** - новая функциональность, обратно совместимая
- **Patch** - исправления ошибок, обратно совместимые