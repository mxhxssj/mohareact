import { test, expect } from '@playwright/test';

test('Envío de formulario de contacto', async ({ page }) => {

    await page.goto('http://localhost:5173/contactanos');

    await page.fill('input[name="nombre"]', 'Juan Motor');
    await page.fill('input[type="email"]', 'juan@test.com');
    await page.fill('textarea', 'Me interesa el BMW de la web');

    await page.click('button[type="submit"]');
});