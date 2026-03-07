test('La página de inicio carga correctamente', async ({ page }) => {
    await page.goto('http://localhost:5173');


    await expect(page.locator('h1')).toContainText(/Motor/i);


    await expect(page.locator('nav')).toBeVisible();
});