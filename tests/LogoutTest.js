import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import BurgerMenu from '../elements/BurgerMenuElement';

const userData = require('../data/usersData.json');
const expectedData = require('../data/expectedData.json');

fixture`LOGOUT TEST`
    .page`https://www.saucedemo.com`;

//Expected: Validate the user navigates to the login page.
// Test with all users happy path
userData.validUsers.forEach(username => {

    test(`Logout with ${username} user`, async t => {

        await LoginPage.login(username, userData.general_password);

        //Verify if we login and if the burger menu exists
        await t
            .expect(ProductPage.title.textContent).eql(expectedData.loginTest.productsPageTitle)
            .expect(BurgerMenu.menuBurgerButton.exists).ok();

        //Logout and verify the login page elements
        await ProductPage.logout();
        await t
            .expect(LoginPage.usernameInput.exists).ok()
            .expect(LoginPage.passwordInput.exists).ok()
            .expect(LoginPage.loginButton.exists).ok();
    });

});