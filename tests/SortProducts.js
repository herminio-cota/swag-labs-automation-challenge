import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import FilterMenuElement from '../elements/FilterMenuElement';

const userData = require('../data/usersData.json');

fixture`SORT TEST`
    .page`https://www.saucedemo.com`;

userData.validUsers.forEach(username => {
    //Expected: Validate the products have been sorted by price correctly
    test(`Sort products by Price (low to high) with the user ${username}`, async t => {

        await LoginPage.login(username, userData.general_password);

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

});