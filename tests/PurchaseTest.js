import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import ShoppingCartPage from '../pages/ShoppingCartPage';
import CheckoutPage from '../pages/CheckoutPage';

const userData = require('../data/usersData.json');
const expectedData = require('../data/expectedData.json');

fixture`VALIDATE PURCHASE TEST`
    .page`https://www.saucedemo.com`;

//BUG: This test Fail because there is a bug in checkout form accepts white spaces as input in First Name Input
test('Fields are Required in Checkout form HERE there is a BUG', async t => {

    await LoginPage.login(userData.correctUser, userData.general_password);
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

    let firstname = ' ';
    let lastName = userData.checkout.lastName;
    let postalCode = userData.checkout.postalCode;

    //Fill the checkout information
    for (let i = 0; i < 3; i++) {

        switch (i) {
            case 1:
                firstname = userData.checkout.firstName;
                lastName = ' ';
                break;
            case 2:
                lastName = userData.checkout.lastName;
                postalCode = ' ';
                break;
        }

        let expectedMessage = await CheckoutPage.getTheCheckoutInformationErrorMessage(firstname, lastName, postalCode);

        let errorMessage = await CheckoutPage.errorMessageContainer.textContent;

        await t.expect(errorMessage).eql(expectedMessage);

    }

});


userData.validUsers.forEach(username => {

    //Expected: Validate the user navigates to the order confirmation page.
    test(`Validate the order confirmatin page with the user ${username}`, async t => {

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

        await ShoppingCartPage.clickOnCheckoutButton();

        //Fill the checkout information
        await CheckoutPage.fillTheCheckoutInformation(userData.checkout.firstName, userData.checkout.lastName, userData.checkout.postalCode);

        //Verify total ammount with taxes and verify the final message
        let totalData = await CheckoutPage.verifyTotalAmount();

        await t.expect(totalData.totalObtained).eql(totalData.totalExpected);

        await CheckoutPage.clickOnFinishButton();

        await t.expect(CheckoutPage.completeHeader.textContent).eql(expectedData.checkout.completeMessage);

    });
});

