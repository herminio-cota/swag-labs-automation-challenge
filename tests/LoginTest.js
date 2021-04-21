import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import BurguerMenuElement from '../elements/BurgerMenuElement';

const userData = require('../data/usersData.json');
const expectedData = require('../data/expectedData.json');


fixture`LOGIN TEST`
    .page`https://www.saucedemo.com`;

//Expected: Validate error message is displayed.
test('Login with an invalid user', async t => {

    await LoginPage.login(userData.locked, userData.general_password);
    await t
        .expect(LoginPage.errorMessage.textContent).eql(expectedData.loginTest.invalidUserErrorMessage);
});

//Expected: Validate error message is displayed.
test('Login with empty strings', async t => {

    await LoginPage.clickLoginButton();
    await t
        .expect(LoginPage.errorMessage.textContent).eql(expectedData.loginTest.emptyUsername);
});

//Expected: Validate error message is displayed.
test('Login with empty password', async t => {

    await LoginPage.loginWithoutPasswordInput(userData.correctUser);
    await t
        .expect(LoginPage.errorMessage.textContent).eql(expectedData.loginTest.emptyPassword);
});

//Expected: Validate error message is displayed.
test('Login with wrong user', async t => {

    await LoginPage.login(userData.wrongUserOrPassword, userData.general_password);
    await t
        .expect(LoginPage.errorMessage.textContent).eql(expectedData.loginTest.wrongUsernameOrPassword);
});

//Expected: Validate error message is displayed.
test('Login with wrong password', async t => {

    await LoginPage.login(userData.correctUser, userData.wrongUserOrPassword);
    await t
        .expect(LoginPage.errorMessage.textContent).eql(expectedData.loginTest.wrongUsernameOrPassword);
});



// Test with all users happy path
userData.validUsers.forEach(username => {
        test(`Login with ${username} user `, async t => {

            await LoginPage.login(username, userData.general_password);
            await t
                .expect(ProductPage.title.textContent).eql(expectedData.loginTest.productsPageTitle)
                .expect(BurguerMenuElement.menuBurgerButton.exists).ok();
        });
});



