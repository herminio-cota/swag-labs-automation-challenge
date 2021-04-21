import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import FilterMenuElement from '../elements/FilterMenuElement';

const userData = require('../data/usersData.json');

fixture`SORT TEST`
    .page`https://www.saucedemo.com`
    .beforeEach(async t => {
        await LoginPage.login(userData.standar, userData.general_password);
    });

//Expected: Validate the products have been sorted by price correctly
test('Sort products by Price (low to high)', async t => {

    //Click on sort filter
    await ProductPage.sortProducts(FilterMenuElement.optionLOHI);

    //get total items in inventory section
    const totalItems = await ProductPage.getTotalProductsDisplayed();

    //Verify if the price is ordered low to high
    for (let i = 0; i < totalItems - 1; i++) {
        //Get item and compare with the next one
        let itemsData = await ProductPage.verifySortLoHi(i);
        await t.expect(itemsData.itemPrice).lte(itemsData.nextItemPrice);
    }

});

