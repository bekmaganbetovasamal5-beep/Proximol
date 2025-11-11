# Базовый образ: официальный Node.js
FROM node:22

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем TypeScript проект
RUN npm run build

# Открываем порт, на котором будет слушать сервер
EXPOSE 3000

# Запускаем скрипт который генерирует Prisma client и запускает приложение
CMD ["sh", "-c", "npx prisma generate && npm start"]
