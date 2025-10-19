 Аутентификация через **Google и Apple с использованием Supabase Auth**, а все остальные данные — в **PostgreSQL через ваш собственный Express-бэкенд**.


# API Documentation — Proximol

## 📋 Общая информация

**Base URL**  
- Development: `http://localhost:3003`  backend 

### Proximol:

- **Backend**: 3003
- **Frontend**: 3004
- **PostgreSQL**: 5433
- **Redis**: 6381

**Формат данных**  
- Content-Type: `application/json`  
- Кодировка: UTF-8

**Аутентификация**  
- Аутентификация реализована через **Supabase Auth** с использованием OAuth-провайдеров: **Google** и **Apple**.  
- После входа клиент получает JWT-токен от Supabase.  
- Этот токен передаётся во всех запросах к API в заголовке:  
  `Authorization: Bearer <supabase_jwt>`  
- Express-бэкенд проверяет валидность токена (через JWKS или вызов `supabase.auth.getUser()`) и извлекает идентификатор пользователя (`sub`).  
- Регистрация, вход и выход **не обрабатываются этим API** — они происходят полностью на стороне Supabase.  
- При первом входе бэкенд может автоматически создавать запись о пользователе в локальной таблице PostgreSQL на основе данных из Supabase (например, email, имя).

**Статусы ответов**  
- `200` – OK  
- `201` – Created  
- `400` – Bad Request  
- `401` – Unauthorized (отсутствует или недействительный токен)  
- `403` – Forbidden (попытка доступа к чужим данным)  
- `404` – Not Found  
- `500` – Internal Server Error

---

## 🔐 Аутентификация (Supabase OAuth)

Вход в систему возможен **только через Google или Apple** с использованием Supabase Auth. Пример на фронтенде:

```ts
// Вход через Google
await supabase.auth.signInWithOAuth({ provider: 'google' });

// Вход через Apple
await supabase.auth.signInWithOAuth({ provider: 'apple' });
```

После успешной аутентификации Supabase возвращает сессию с `access_token` (JWT). Этот токен используется для доступа к защищённым эндпоинтам этого API.

> ⚠️ Эндпоинты `/api/auth/register`, `/api/auth/login`, `/api/auth/logout` **не существуют** в этом бэкенде. Управление сессией — полностью на стороне Supabase.

---

## 👥 Пользователи (данные в PostgreSQL через Express)

Все данные пользователей (профиль, настройки, активность и т.д.), кроме базовой аутентификации, хранятся в **PostgreSQL** и управляются вашим Express-бэкендом.

### GET /api/users  
Получение списка пользователей с пагинацией.  

**Заголовки**:  
`Authorization: Bearer <supabase_jwt>`  


**Ответ (200)**:
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "uuid",
        "username": "string",
        "email": "string",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
}
```

### GET /api/users/:id  
Получение данных конкретного пользователя.  

**Заголовки**:  
`Authorization: Bearer <supabase_jwt>`  

**Параметры пути**:  
- `id` — UUID пользователя (должен совпадать с `sub` из JWT или быть доступен текущему пользователю по правилам доступа)  

**Ответ (200)**:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
}
```

### PUT /api/users/:id  
Обновление профиля пользователя.  

**Заголовки**:  
`Authorization: Bearer <supabase_jwt>`  

**Параметры пути**:  
- `id` — UUID пользователя (только свой профиль или с правами администратора)  

**Тело запроса**:
```json
{
  "username": "новое_имя",
  "email": "новый@email.com"
}
```

**Ответ (200)**:
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "user": {
      "id": "uuid",
      "username": "новое_имя",
      "email": "новый@email.com",
      "updatedAt": "timestamp"
    }
  }
}
```

### DELETE /api/users/:id  
Удаление пользователя.  

**Заголовки**:  
`Authorization: Bearer <supabase_jwt>`  

**Параметры пути**:  
- `id` — UUID пользователя  

**Логика**:  
1. Express проверяет, что пользователь авторизован и имеет право на удаление.  
2. Вызывается Supabase Admin API (с `service_role` ключом) для удаления аккаунта из Supabase Auth.  
3. Удаляются все связанные данные из локальной PostgreSQL-базы.  

**Ответ (200)**:
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## 🏥 Health Check

### GET /api/health  
Проверка работоспособности сервиса. Не требует аутентификации.  

**Ответ (200)**:
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2025-10-10T12:00:00Z",
    "version": "1.0.0",
    "uptime": 12345,
    "services": {
      "database": { "status": "connected", "responseTime": 5 },
      "supabase": { "status": "reachable", "responseTime": 42 }
    }
  }
}
```

### GET /api/health/detailed  
Детальная диагностика (только для администраторов, с токеном).  

**Заголовки**: `Authorization: Bearer <supabase_jwt>`  

**Ответ (200)** — расширенная версия с метриками, подключениями, окружением и т.д.

---

## 📊 Метрики

### GET /api/metrics  
Мониторинг производительности приложения.  

**Заголовки**: `Authorization: Bearer <supabase_jwt>`  

**Ответ (200)**:
```json
{
  "success": true,
  "data": {
    "timestamp": "2025-10-10T12:00:00Z",
    "uptime": 12345,
    "requests": { "total": 1000, "perMinute": 25, "successRate": 0.98 },
    "performance": { "averageResponseTime": 120, "p95ResponseTime": 250 },
    "database": { "connectionPool": { "active": 2, "idle": 8 } }
  }
}
```

---

## 🔒 Формат ошибок

Все ошибки возвращаются в едином формате:

```json
{
  "success": false,
  "error": {
    "code": "AUTHENTICATION_FAILED",
    "message": "Invalid or expired token",
    "details": { "field": "Authorization header missing" },
    "timestamp": "2025-10-10T12:00:00Z",
    "path": "/api/users"
  }
}
```

**Распространённые коды ошибок**:  
- `AUTHENTICATION_FAILED` — невалидный/просроченный токен  
- `AUTHORIZATION_DENIED` — попытка доступа к чужим данным  
- `RESOURCE_NOT_FOUND` — запрашиваемый ресурс не существует  
- `VALIDATION_ERROR` — ошибка валидации входных данных  
- `INTERNAL_SERVER_ERROR` — ошибка на стороне сервера

---

## 🚀 Rate Limiting

- **Аутентифицированные запросы**: до 1000 запросов/час  
- Заголовки в ответе:  
  - `X-RateLimit-Limit`  
  - `X-RateLimit-Remaining`  
  - `X-RateLimit-Reset`

---

## 📝 Примеры использования

### JavaScript (fetch)
```js
// Получение данных пользователя после входа через Supabase
const { data: { session } } = await supabase.auth.getSession();

const res = await fetch('http://localhost:3003/api/users/me', {
  headers: {
    'Authorization': `Bearer ${session.access_token}`
  }
});
```

### cURL
```bash
# Health check
curl http://localhost:3000/api/health

# Получение списка пользователей (с токеном от Supabase)
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  http://localhost:3003/api/users
```

