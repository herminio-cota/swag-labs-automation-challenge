import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';

const userData = require('../data/usersData.json');
const expectedData = require('../data/expectedData.json');
const testVariablesData = require('../data/testsVariablesData.json');

fixture`ADD ITEMS TO SHOPPING CART TEST`
    .page`https://www.saucedemo.com`;

userData.all_users.forEach(username => {

    //Expected: Validate all the items that have been added to the shopping cart.
    test(`Add multiple items to the shopping cart with user ${username}`, async t => {

        await LoginPage.login(username, userData.general_password);
        const itemsAdded = [];

        //Add the half of products displayed in Products page
        await ProductPage.selectMultipleItems(itemsAdded);
        await ProductPage.clickOnShopingCartButton();

        //Verify each name and price of the products added in Shooping Cart Page
        let totalShopingCartItems = await ShoppingCartPage.getTotalItemsInShoppingCart();

        for (let i = 0; i < totalShopingCartItems - 1; i++) {

            let item = ShoppingCartPage.getItemInShopingCartByIndex(i);

            await t.expect(item.itemName).eql(itemsAdded[i].itemName)
                .expect(item.itemPrice).eql(itemsAdded[i].itemPrice);
        }

    });

    //Expected: Validate the correct product was added to the cart.
    test(`Add the specific product ‘Sauce Labs Onesie’ to the shopping cart with user ${username}`, async t => {

        await LoginPage.login(username, userData.general_password);

        //Add only the product with the name ‘Sauce Labs Onesie’ in products page
        let itemAdded = await ProductPage.addSpecificProductToShoppingCartByName(testVariablesData.shoppingCarTest.specificProduct);
        let itemAddButton = await ProductPage.getAddButton();
        await t.expect(itemAddButton.textContent).eql(expectedData.shoppingCarTest.textRemoveButton);

        await ProductPage.clickOnShopingCartButton();

        // Validate tehe name and the price of the product added in the shoppin cart
        let itemShoppingCart = await ShoppingCartPage.getItemFromSpecificProductByName(testVariablesData.shoppingCarTest.specificProduct);

        await t.expect(itemShoppingCart.itemName).eql(itemAdded.itemName)
            .expect(itemShoppingCart.itemPrice).eql(itemAdded.itemPrice);

    });

});
