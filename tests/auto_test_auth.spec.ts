// import { test } from '@playwright/test';
import { test } from '@fix/pageFactory';
import {faker}  from '@faker-js/faker';

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

test('succesfull authorization', async ({ loginPage, mainPage }) => {
  // const loginP = new LoginPage(page);
  // const mainPage = new MainPage(page);

  await loginPage.login(email, password)
  await mainPage.checkToolBar();
});


test('failed authorization, empty password', async ({ loginPage }) => {
  // const loginPage = new LoginPage(page);

  await loginPage.login(email, "")
  await loginPage.verifyLabelWrongCredentials();
  await loginPage.verifyColorFailedPassword();
});


test('failed authorization, wrong email', async ({ loginPage }) => {
  // const loginPage = new LoginPage(page);

  await loginPage.login(faker.animal.cat(), password)
  await loginPage.verifyLabelWrongCredentials();
  await loginPage.verifyLabelEmailOutlined();
});


test('check table contains data', async ({ loginPage, driversPage }) => {
  // const loginPage = new LoginPage(page);
  // const driverP = new DriversPage(page);

  await loginPage.login(email, password);
  await driversPage.navigateToDriversPage();
  await driversPage.verifyTableData()
});