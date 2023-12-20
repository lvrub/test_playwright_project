import { test} from '@playwright/test';
import LoginPage from "@objects/LoginPage";
import MainPage from '@objects/MainPage';

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


test('failed authorization, empty password', async ({ page }) => {
    const loginP = new LoginPage(page);
  
    await page.goto(baseURL);
    await loginP.typeEmail(email);
    await loginP.typePassword("")
    await loginP.clickButtonLogIn();
    await loginP.verifyLabelWrongCredentials();
    await loginP.verifyColorFailedPassword();
  });


  test('failed authorization, wrong email', async ({ page }) => {
    const loginP = new LoginPage(page);
  
    await page.goto(baseURL);
    await loginP.typeEmail("email");
    await loginP.typePassword(password)
    await loginP.clickButtonLogIn();
    await loginP.verifyLabelWrongCredentials();
    await loginP.verifyLabelEmailOutlined();
  });