import { test, expect, Locator } from '@playwright/test';
import * as dotenv from 'dotenv';
import LoginPage from '../pageObjects/LoginPage';
import MainPage from '../pageObjects/MainPage';
dotenv.config();

const baseURL = process.env.URL;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;


test('succesfull authorization', async ({ page }) => {
  const loginP = new LoginPage(page);
  const mainP = new MainPage(page);

  await page.goto(baseURL);
  await loginP.typeEmail(email);
  await loginP.typePassword(password)
  await loginP.clickButtonLogIn();
  await mainP.checkToolBar();

});


test('failed authorization', async ({ page }) => {
    const loginP = new LoginPage(page);
  
    await page.goto(baseURL);
    await loginP.typeEmail(email);
    await loginP.typePassword("")
    await loginP.clickButtonLogIn();
    await loginP.verifyLabelWrongCredentials();
  });