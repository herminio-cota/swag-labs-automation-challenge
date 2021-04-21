import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import ShoppingCartElement from '../elements/ShoppingCartElement';
import ShoppingCartPage from '../pages/ShoppingCartPage';

const userData = require('../data/usersData.json');
const expectedData = require('../data/expectedData.json');
const testVariablesData = require('../data/testsVariablesData.json');

fixture`ADD ITEMS TO SHOPPING CART TEST`
    .page`https://www.saucedemo.com`
    .beforeEach(async t => {
        await t
        .typeText(LoginPage.usernameInput, userData.standar)
        .typeText(LoginPage.passwordInput, userData.general_password)
        .click(LoginPage.loginButton);
    });

//Expected: Validate all the items that have been added to the shopping cart.
test('Add multiple items to the shopping cart', async t => {

    const totalItems = await ProductPage.inventory.child().count;
    const itemsAdded = [];

    //Add the half of products displayed in Products page
    for (let i = 0; i < totalItems / 2; i++) {

        let itemName = await ProductPage.inventory.child(i).find('div').withAttribute('class', 'inventory_item_name').textContent;
        let itemPrice = await ProductPage.inventory.child(i).find('div').withAttribute('class', 'inventory_item_price').textContent;
        let itemAddButton = await ProductPage.inventory.child(i).find('button');

        itemsAdded.push({ "itemName": itemName, "itemPrice": itemPrice });

        await t.click(itemAddButton).expect(itemAddButton.textContent).eql(expectedData.shoppingCarTest.textRemoveButton);
    }

    await t
        .click(ShoppingCartElement.shoppingCartButton);

    //Verify each name and price of the products added in Shooping Cart Page
    let totalShopingCartItems = ShoppingCartPage.cartList.count;

    for (let i = 0; i < totalShopingCartItems - 1; i++) {

        let itemName = await ShoppingCartPage.cartList.nth(i).find('div').withAttribute('class', 'inventory_item_name').textContent;
        let itemPrice = await ShoppingCartPage.cartList.nth(i).find('div').withAttribute('class', 'inventory_item_price').textContent;

        await t.expect(itemName).eql(itemsAdded[i].itemName)
            .expect(itemPrice).eql(itemsAdded[i].itemPrice);
    }

});

//Expected: Validate the correct product was added to the cart.
test('Add the specific product ‘Sauce Labs Onesie’ to the shopping cart', async t => {

    //Add only the product with the name ‘Sauce Labs Onesie’ in products page
    ProductPage.setSpesificProductByName(testVariablesData.shoppingCarTest.specificProduct);
    let itemProduct = await ProductPage.getSpesificProductByName();
    let itemName = await itemProduct.find('div').withAttribute('class', 'inventory_item_name').textContent;
    let itemPrice = await itemProduct.find('div').withAttribute('class', 'inventory_item_price').textContent;
    let itemAddButton = await itemProduct.find('button');

    let itemAdded = { "itemName": itemName, "itemPrice": itemPrice };

    await t.click(itemAddButton).expect(itemAddButton.textContent).eql(expectedData.shoppingCarTest.textRemoveButton);

    await t.click(ShoppingCartElement.shoppingCartButton);

    // Validate tehe name and the price of the product added in the shoppin cart
    ShoppingCartPage.setSpesificProductByName(testVariablesData.shoppingCarTest.specificProduct);
    let itemShoppingCartProduct = await ShoppingCartPage.getSpesificProductByName();
    let itemNameShopingCart = await itemShoppingCartProduct.find('div').withAttribute('class', 'inventory_item_name').textContent;
    let itemPriceShopingCart = await itemShoppingCartProduct.find('div').withAttribute('class', 'inventory_item_price').textContent;

    await t.expect(itemNameShopingCart).eql(itemAdded.itemName)
        .expect(itemPriceShopingCart).eql(itemAdded.itemPrice);

});


