import { chromium } from 'playwright';

async function setupSentry() {
  console.log('🚀 Запускаю браузер для регистрации на Sentry.io...');

  const browser = await chromium.launch({
    headless: false,  // Показать браузер
    slowMo: 1000      // Медленные действия для наглядности
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  // Открываем Sentry
  await page.goto('https://sentry.io');

  console.log('\n📋 ИНСТРУКЦИЯ:');
  console.log('1. Браузер открыл Sentry.io');
  console.log('2. Нажмите на "Sign Up" в правом верхнем углу');
  console.log('3. Выберите регистрацию через:');
  console.log('   - GitHub (рекомендуется)');
  console.log('   - Или Google');
  console.log('   - Или Email (используйте любой временный email)');
  console.log('\n4. После регистрации:');
  console.log('   - Создайте новую организацию: "FlyProx"');
  console.log('   - Создайте новый проект: "Node.js"');
  console.log('   - Назовите проект: "flyprox-backend"');
  console.log('\n5. Скопируйте DSN ключ (выглядит как URL)');
  console.log('   - Он будет показан после создания проекта');
  console.log('   - Сохраните его, я помогу добавить в код');

  console.log('\n⏳ Ожидаю... Браузер останется открытым 5 минут');

  // Ждем 5 минут для ручной регистрации
  await page.waitForTimeout(300000);

  console.log('\n✅ Время вышло! Если вы зарегистрировались, дайте мне DSN ключ.');

  await browser.close();
}

setupSentry().catch(console.error);