import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import BurguerMenuElement from '../elements/BurgerMenuElement';

const userData = require('../data/usersData.json');
const expectedData = require('../data/expectedData.json');


fixture`LOGIN TEST`
    .page`https://www.saucedemo.com`;

//Expected: Validate the user navigates to the account page when logged in.
test('Login with a valid user', async t => {

    await LoginPage.login(userData.standar, userData.general_password);
    await t
        .expect(ProductPage.title.textContent).eql(expectedData.loginTest.productsPageTitle)
        .expect(BurguerMenuElement.menuBurgerButton.exists).ok();
});

//Expected: Validate error message is displayed.
test('Login with an invalid user', async t => {

    await LoginPage.login(userData.locked, userData.general_password);
    await t
        .expect(LoginPage.errorMessage.textContent).eql(expectedData.loginTest.invalidUserErrorMessage);
});

