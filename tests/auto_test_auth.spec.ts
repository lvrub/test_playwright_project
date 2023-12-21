import { test } from '@playwright/test';
import LoginPage from "@objects/LoginPage";
import MainPage from '@objects/MainPage';
import DriversPage from '@objects/DriversPage';

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

test('succesfull authorization', async ({ page }) => {
  const loginP = new LoginPage(page);
  const mainP = new MainPage(page);

  await loginP.login(email, password)
  await mainP.checkToolBar();
});


test('failed authorization, empty password', async ({ page }) => {
  const loginP = new LoginPage(page);

  await loginP.login(email, "")
  await loginP.verifyLabelWrongCredentials();
  await loginP.verifyColorFailedPassword();
});


test('failed authorization, wrong email', async ({ page }) => {
  const loginP = new LoginPage(page);

  await loginP.login("email", password)
  await loginP.verifyLabelWrongCredentials();
  await loginP.verifyLabelEmailOutlined();
});


test('check table contains data', async ({ page }) => {
  const loginP = new LoginPage(page);
  const driverP = new DriversPage(page);

  await loginP.login(email, password);
  await driverP.navigateToDriversPage();
  await driverP.verifyTableData()
});