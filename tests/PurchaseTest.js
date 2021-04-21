import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import CheckoutPage from '../pages/CheckoutPage';

const userData = require('../data/usersData.json');
const expectedData = require('../data/expectedData.json');

fixture`VALIDATE PURCHASE TEST`
    .page`https://www.saucedemo.com`
    .beforeEach(async t => {
        await LoginPage.login(userData.standar, userData.general_password);
    });

//Expected: Validate the user navigates to the order confirmation page.
test('Add multiple items to the shopping cart', async t => {

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

    await ShoppingCartPage.clickOnCheckoutButton();

    //Fill the checkout information
    await CheckoutPage.fillTheCheckoutInformation(userData.checkout.firstName, userData.checkout.lastName, userData.checkout.postalCode);

    //Verify total ammount with taxes and verify the final message
    let totalData = await CheckoutPage.verifyTotalAmount();

    await t.expect(totalData.totalObtained).eql(totalData.totalExpected);

    await CheckoutPage.clickOnFinishButton();

    await t.expect(CheckoutPage.completeHeader.textContent).eql(expectedData.checkout.completeMessage);

});