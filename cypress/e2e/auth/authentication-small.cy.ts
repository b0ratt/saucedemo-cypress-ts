import { InventoryPage } from '../../page-objects/InventoryPage';
import { LoginPage } from '../../page-objects/LoginPage';
import { credentials } from '../../support/credentials';
import { setViewport, viewports } from '../../support/viewports';

describe('Authentication', () => {
  const loginPage = new LoginPage();
  const inventoryPage = new InventoryPage();
  const password = credentials.password;
  let username: string;

  context('Small device', () => {
    beforeEach('Set viewport and visit page', () => {
      setViewport(viewports.small);
      loginPage.visit();
    });

    it('Verify login page content', () => {
      loginPage
        .assertLoginPageHeader()
        .assertAuthenticationForm()
        .assertTestingCredentials();
    });

    it('Should verify auth validation', () => {
      username = credentials.username[0];

      loginPage
        .clickLoginButton()
        .assertErrorMessageVisible('Epic sadface: Username is required')
        .fillUsernameInput(username)
        .clickLoginButton()
        .assertErrorMessageVisible('Epic sadface: Password is required');
    });

    it('Should login with standard user', () => {
      username = credentials.username[0];

      loginPage
        .fillUsernameInput(username)
        .fillPasswordInput(password)
        .clickLoginButton()
        .assertErrorMessageNotExist()
        .assertCookieAfterLogin(username);

      inventoryPage.assertInventoryContainerVisible();
    });

    it('Should not login with locked user', () => {
      username = credentials.username[1];

      loginPage
        .fillUsernameInput(username)
        .fillPasswordInput(password)
        .clickLoginButton()
        .assertErrorMessageVisible()
        .assertCookieAfterLogin(username);
    });

    it('Should login with problem user', () => {
      username = credentials.username[2];

      loginPage
        .fillUsernameInput(username)
        .fillPasswordInput(password)
        .clickLoginButton()
        .assertErrorMessageNotExist()
        .assertCookieAfterLogin(username);

      inventoryPage.assertInventoryContainerVisible();
    });

    it('Should login with performance glitch user', () => {
      username = credentials.username[3];

      loginPage
        .fillUsernameInput(username)
        .fillPasswordInput(password)
        .clickLoginButton()
        .assertErrorMessageNotExist()
        .assertCookieAfterLogin(username);

      inventoryPage.assertInventoryContainerVisible();
    });
  });
});