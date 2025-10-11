import { chromium } from 'playwright';

async function registerSentry() {
  const browser = await chromium.launch({ headless: false }); // Показать браузер
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('🚀 Открываем Sentry.io...');
    await page.goto('https://sentry.io');

    // Ждем загрузки страницы
    await page.waitForLoadState('networkidle');

    // Находим кнопку Sign Up
    console.log('📝 Ищем кнопку Sign Up...');
    const signupButton = await page.locator('a[href*="/auth/signup/"], button:has-text("Sign Up"), a:has-text("Sign Up")').first();
    await signupButton.click();

    // Ждем загрузки страницы регистрации
    await page.waitForLoadState('networkidle');

    // Выбираем регистрацию через email
    console.log('📧 Выбираем регистрацию через email...');
    const emailSignup = await page.locator('button:has-text("Sign up with email"), a:has-text("Continue with email")').first();
    if (await emailSignup.isVisible()) {
      await emailSignup.click();
    }

    // Заполняем форму
    console.log('✍️ Заполняем форму регистрации...');

    // Имя
    await page.waitForSelector('input[name="name"], input[name="firstName"], input[id*="name"], input[placeholder*="name"]', { timeout: 10000 });
    const nameInput = await page.locator('input[name="name"], input[name="firstName"], input[id*="name"], input[placeholder*="name"]').first();
    await nameInput.fill('FlyProx Developer');

    // Email
    const emailInput = await page.locator('input[name="email"], input[type="email"], input[id*="email"], input[placeholder*="email"]').first();
    await emailInput.fill(`flyprodev${Date.now()}@example.com`);

    // Пароль
    const passwordInput = await page.locator('input[name="password"], input[type="password"], input[id*="password"], input[placeholder*="password"]').first();
    await passwordInput.fill('SecurePassword123!');

    // Компания/организация
    const companyInput = await page.locator('input[name="company"], input[name="organization"], input[placeholder*="company"]').first();
    if (await companyInput.isVisible()) {
      await companyInput.fill('FlyProx');
    }

    // Принимаем условия
    console.log('✅ Принимаем условия использования...');
    const termsCheckbox = await page.locator('input[type="checkbox"]').first();
    if (await termsCheckbox.isVisible()) {
      await termsCheckbox.check();
    }

    // Отправляем форму
    console.log('📤 Создаем аккаунт...');
    const submitButton = await page.locator('button[type="submit"], button:has-text("Create"), button:has-text("Sign Up"), button:has-text("Continue")').last();
    await submitButton.click();

    // Ждем загрузки
    await page.waitForTimeout(3000);

    // Проверяем на капчу
    const captchaVisible = await page.locator('[class*="captcha"], [id*="captcha"], iframe[title*="recaptcha"]').isVisible().catch(() => false);
    if (captchaVisible) {
      console.log('⚠️ Обнаружена CAPTCHA! Пожалуйста, пройдите её вручную в браузере...');
      // Ждем 30 секунд для ручного прохождения капчи
      await page.waitForTimeout(30000);
    }

    // После регистрации ждем редиректа
    console.log('⏳ Ждем завершения регистрации...');
    await page.waitForURL(/\/welcome|\/setup|\/organizations\/create/, { timeout: 30000 }).catch(() => {});

    // Создаем проект
    console.log('🏗️ Создаем новый проект...');

    // Ищем кнопку создания проекта
    const createProjectButton = await page.locator('button:has-text("Create Project"), a:has-text("New Project"), [data-test-id="create-project"]').first();
    if (await createProjectButton.isVisible()) {
      await createProjectButton.click();
    }

    // Выбираем Node.js
    console.log('📦 Выбираем платформу Node.js...');
    await page.waitForSelector('text=Node.js', { timeout: 10000 });
    await page.locator('text=Node.js').first().click();

    // Вводим имя проекта
    console.log('🏷️ Вводим имя проекта...');
    const projectNameInput = await page.locator('input[name="name"], input[placeholder*="project"], input[id*="project-name"]').first();
    if (await projectNameInput.isVisible()) {
      await projectNameInput.fill('flyprox-backend');
    }

    // Создаем проект
    const createButton = await page.locator('button:has-text("Create Project"), button:has-text("Create"), button[type="submit"]').last();
    await createButton.click();

    // Ждем получения DSN
    console.log('🔑 Ждем получения DSN ключа...');
    await page.waitForTimeout(5000);

    // Ищем DSN
    const dsnElement = await page.locator('code:has-text("https://"), [data-test-id="dsn"], .api-key, pre').first();
    const dsnText = await dsnElement.textContent().catch(() => null);

    if (dsnText && dsnText.includes('https://')) {
      console.log('\n✅ УСПЕХ! DSN ключ получен:');
      console.log('================================');
      console.log(dsnText.trim());
      console.log('================================');

      // Сохраняем DSN в файл
      await page.evaluate((dsn) => {
        localStorage.setItem('sentry_dsn', dsn);
      }, dsnText.trim());

      // Создаем .env файл
      const fs = await import('fs');
      fs.writeFileSync('.env', `SENTRY_DSN=${dsnText.trim()}\n`);
      console.log('\n📁 DSN сохранен в файл .env');

    } else {
      console.log('\n❌ Не удалось найти DSN ключ. Попробуйте найти его вручную в дашборде Sentry.');
    }

    console.log('\n🎉 Регистрация завершена! Оставьте браузер открытым для завершения настройки...');

    // Не закрываем браузер сразу
    await page.waitForTimeout(10000);

  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    console.log('\n💡 Пожалуйста, завершите регистрацию вручную в открытом браузере.');
    await page.waitForTimeout(30000);
  }

  await browser.close();
}

registerSentry().catch(console.error);