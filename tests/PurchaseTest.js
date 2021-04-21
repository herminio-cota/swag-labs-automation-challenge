import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import ShoppingCartElement from '../elements/ShoppingCartElement';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import CheckoutPage from '../pages/CheckoutPage';

const userData = require('../data/usersData.json');
const expectedData = require('../data/expectedData.json');

fixture`VALIDATE PURCHASE TEST`
    .page`https://www.saucedemo.com`
    .beforeEach(async t => {
        await t
            .typeText(LoginPage.usernameInput, userData.standar)
            .typeText(LoginPage.passwordInput, userData.general_password)
            .click(LoginPage.loginButton);
    });

//Expected: Validate the user navigates to the order confirmation page.
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

    await t
        .click(ShoppingCartPage.checkoutButton);

    //Fill the checkout information
    await t
        .typeText(CheckoutPage.firstNameInput, userData.checkout.firstName)
        .typeText(CheckoutPage.lastNameInput, userData.checkout.lastName)
        .typeText(CheckoutPage.postalCode, userData.checkout.postalCode)
        .click(CheckoutPage.continueButton);

    //Verify total ammount with taxes and verify the final message

    let subtotal = await CheckoutPage.subTotal.textContent;
    let taxes = await CheckoutPage.taxes.textContent;
    let total = await CheckoutPage.totalAmount.textContent;

    let totalObtained = parseFloat(subtotal.split('$')[1]) + parseFloat(taxes.split('$')[1]);
    let totalExpected = parseFloat(total.split('$')[1]);

    await t.expect(totalObtained).eql(totalExpected)
        .click(CheckoutPage.finishButton)
        .expect(CheckoutPage.completeHeader.textContent).eql(expectedData.checkout.completeMessage);

});