import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import FilterMenuElement from '../elements/FilterMenuElement';

const userData = require('../data/usersData.json');

fixture`SORT TEST`
    .page`https://www.saucedemo.com`
    .beforeEach(async t => {
       await t
        .typeText(LoginPage.usernameInput, userData.standar)
        .typeText(LoginPage.passwordInput, userData.general_password)
        .click(LoginPage.loginButton)
    });

//Expected: Validate the products have been sorted by price correctly
test('Sort products by Price (low to high)', async t => {

    //Click on sort filter
    await t
        .click(FilterMenuElement.filterMenuButton)
        .click(FilterMenuElement.optionLOHI);

    //count the total items in inventory section
    const totalItems = await ProductPage.inventory.child().count;

    //Verify if the price is ordered low to high
    for (let i = 0; i < totalItems - 1; i++) {

        let itemPriceRaw = await ProductPage.inventory.child(i).find('div').withAttribute('class', 'inventory_item_price').textContent
        let nextItemPriceRaw = await ProductPage.inventory.child(i + 1).find('div').withAttribute('class', 'inventory_item_price').textContent

        let itemPrice = parseFloat(itemPriceRaw.substring(1));
        let nextItemPrice = parseFloat(nextItemPriceRaw.substring(1));

        await t.expect(itemPrice).lte(nextItemPrice);
    }

});

