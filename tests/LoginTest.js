import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import BurguerMenuElement from '../elements/BurgerMenuElement';

const userData = require('../data/usersData.json');
const expectedData = require('../data/expectedData.json');


fixture`LOGIN TEST`
    .page`https://www.saucedemo.com`;

//Expected: Validate the user navigates to the account page when logged in.
test('Login with a valid user', async t => {

    await t
        .typeText(LoginPage.usernameInput, userData.standar)
        .typeText(LoginPage.passwordInput, userData.general_password)
        .click(LoginPage.loginButton)
        .expect(ProductPage.title.textContent).eql(expectedData.loginTest.productsPageTitle)
        .expect(BurguerMenuElement.menuBurgerButton.exists).ok();
});

//Expected: Validate error message is displayed.
test('Login with an invalid user', async t => {

    await t
        .typeText(LoginPage.usernameInput, userData.locked)
        .typeText(LoginPage.passwordInput, userData.general_password)
        .click(LoginPage.loginButton)
        .expect(LoginPage.errorMessage.textContent).eql(expectedData.loginTest.invalidUserErrorMessage);
});

