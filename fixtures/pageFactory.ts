import { test as baseTest } from "playwright/test";
import LoginPage from "@objects/LoginPage";
import MainPage from '@objects/MainPage';
import DriversPage from '@objects/DriversPage';

const test = baseTest.extend<{
  loginPage: LoginPage;
  mainPage: MainPage;
  driversPage: DriversPage
}> ({
  
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },

  driversPage: async ({ page }, use) => {
    await use(new DriversPage(page));
  }
  
});

export { test }