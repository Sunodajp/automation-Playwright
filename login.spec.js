const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('CT-01 - Deve logar com sucesso', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('testeqa@qa.com', '123456');
  
  // Validação: tem que aparecer "Logged in as"
  await expect(page.locator('text=Logged in as')).toBeVisible();
});

test('CT-02 - Não deve logar com senha errada - Negativo', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('testeqa@qa.com', 'senhaErrada123');
  
  // Validação: tem que aparecer mensagem de erro
  await expect(loginPage.errorMessage).toBeVisible();
});

test('CT-03 - Deve adicionar produto no carrinho', async ({ page }) => {
  await page.goto('https://automationexercise.com');
  // Clica no primeiro produto
  await page.locator('.product-image-wrapper').first().hover();
  await page.locator('text=Add to cart').first().click();
  await page.locator('text=View Cart').click();
  
  // Validação: tem que estar no carrinho
  await expect(page.locator('text=Shopping Cart')).toBeVisible();
});