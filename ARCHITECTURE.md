# Architecture - Архитектура FlyProx

## 🏗️ Общая архитектура

FlyProx построен по классической архитектуре 



### 1. Application Server (Express.js)
```javascript
// index.js
- Server initialization
- Middleware setup
- Route registration
- Error handling
```

🔒 Security
Supabase OAuth
Frontend (Next.js + Supabase Auth)
Express API (Routes → Controllers → Services)
PostgreSQL 
↓
MCP Integrations 



### 3. MCP Integration
- **HTTP**: Внешние API запросы
| MCP Server | Назначение | Когда использовать |
|-------------|-------------|--------------------|
| **playwright** | Автотесты UI | тест фронтенда и поиск информации в интернете, Автоматизация браузера|
| **figma-hc48kv-55** | Composio Figma | анализ дизайна |
| **mcp-config-2zbps2** | Базовые настройки MCP | вызов облачных инструментов |
| **sequential-thinking** | Логические цепочки LLM | используй всегда при написании кода|
| **supabase** | Auth / DB | миграции, токены база данных|
| **postgres** | PostgreSQL | модели, миграции|
| **figma** | Figma API | анализ UI |
| **context7** | Контекст LLM | хранение состояний, используй всегда документацию при написании кода|
| **http** | REST-запросы | внешние API |
| **filesystem** | Работа с файлами | обновление `openapi.yaml`, `postman_collection.json` |
| **git** | Репозиторий FlyProx | коммиты, автосейв |
| **firecrawl** | Парсинг сайтов | импорт документации |
| **browserbase** | Рендер браузера | UI тесты |
| **serena** | Последовательности вызовов | сложные сценарии |
| **sentry** | Логи ошибок | мониторинг |
| **chrome-devtools** | Отладка UI | анализ фронтенда |
| **firecrawl** | Парсинг и клонирование веб-страниц | импорт документации и данных при копированиий сайтя для создания |
| **browserbase** | Рендеринг сайтов в браузере | UI-тестирование, валидация контента |
| **serena** | Оркестрация LLM-вызовов | последовательные задачи |
| **web-to-mcp** | Конвертация HTML → Markdown | обработка внешних API и документации когда создаешь сайт|
| **chrome-devtools** | Анализ DOM, network и ошибок | отладка фронтенда и UI |




```


### 2. Data Protection
- Input validation and sanitization
- XSS protection
- CORS configuration

### 3. Infrastructure Security
- Environment variables for secrets
- Network isolation
- Docker security best practices

## 📊 Scalability Architecture

### 1. Horizontal Scaling
- Stateless application design
- Load balancer ready
- Database connection pooling

### 2. Caching Strategy
- Redis distributed caching
- Application-level caching




### 1. Logging
- Structured logging (JSON format)
- Log levels (debug, info, warn, error)
- Request/Response logging

### 2. Metrics
- Application performance metrics
- Database query performance
- Cache hit rates
- Error rates

### 3. Health Checks
- Application health endpoint
- Database connectivity check
- Redis connectivity check


### 3. Environment Management
- Development (local)
- Staging (testing)
- Production (live)

## 🎯 Design Principles

### 1. SOLID Principles
- Single Responsibility Principle
- Open/Closed Principle
- Liskov Substitution Principle
- Interface Segregation Principle
- Dependency Inversion Principle

### 2. Clean Architecture
- Dependency inversion
- Separation of concerns
- Testability
- Independence from frameworks

### 3. Microservices Ready
- Loose coupling
- High cohesion
- API-first design
- Database per service (future)

