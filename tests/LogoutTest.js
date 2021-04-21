import BurgerMenu from '../elements/BurgerMenuElement';
import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';

const userData = require('../data/usersData.json');
const expectedData = require('../data/expectedData.json');

fixture`LOGOUT TEST`
    .page`https://www.saucedemo.com`
    .beforeEach(async t => {
        await t
            .typeText(LoginPage.usernameInput, userData.standar)
            .typeText(LoginPage.passwordInput, userData.general_password)
            .click(LoginPage.loginButton);
    });

//Expected: Validate the user navigates to the login page.
test('Logout from the home page', async t => {

    //Verify if we login and if the burger menu exists
    await t
        .expect(ProductPage.title.textContent).eql(expectedData.loginTest.productsPageTitle)
        .expect(BurgerMenu.menuBurgerButton.exists).ok();

    //Logout and verify the login page elements
    await t
        .click(BurgerMenu.menuBurgerButton)
        .click(BurgerMenu.logoutOption)
        .expect(LoginPage.usernameInput.exists).ok()
        .expect(LoginPage.passwordInput.exists).ok()
        .expect(LoginPage.loginButton.exists).ok();
});
