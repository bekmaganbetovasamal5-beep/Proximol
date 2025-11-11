# Deployment - Развертывание FlyProx

## 🚀 Обзор процесса развертывания

FlyProx поддерживает различные способы развертывания: от локальной разработки до production окружения.

---

## 🏠 Локальная разработка

Требования смотри в файле package.json 
### Шаги развертывания



1. **Запуск через Docker Compose**
```bash
docker-compose up -d
```

2. **Проверка работы**
```bash
curl http://localhost:3000/api/health
```

### Разработка без Docker

1. **Установка зависимостей**
```bash
npm install
```

2. **Запуск баз данных**
 PostgreSQL через MCP PostgreSQL работать 



3. **Запуск приложения**
```bash
npm run dev
```

---

## 🐳 Docker развертывание

### Сборка образа
```bash
# Локальная сборка
docker build -t 



## 🔍 Мониторинг и логирование

### Health Checks

#### Kubernetes readiness/liveness probe
```yaml
readinessProbe:
  httpGet:
    path: /api/health
    port: 3000
  initialDelaySeconds: 10
  periodSeconds: 5

livenessProbe:
  httpGet:
    path: /api/health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10
```

### Логирование

#### Docker logging driver
```yaml
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"
```

