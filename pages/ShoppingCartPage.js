import { Selector, t } from 'testcafe';

class ShoppingCartPage {
    constructor() {
        this.cartList = Selector('.cart_list').child('div.cart_item');
        this.specificItem = Selector('cart_item').withExactText('');
        this.checkoutButton = Selector('#checkout');
    }

    /** 
     * 
     * @param exactText text in the child item 
     * This function get the main item parent from a text of its childs.
     */
    setSpecificProductByName(exactText) {
        this.specificItem = Selector('div.inventory_item_name').withExactText(exactText).parent(2);
    }

    //Function for get the item obtained in setSpecificProductByName function.
    getSpecificProductByName() {
        return this.specificItem;
    }

    /**
     * 
     * @returns return the total of the items in the shopping cart
     * Function that gets the total of the items in the shopping cart
     */
    async getTotalItemsInShoppingCart() {
        let totalShopingCartItems = this.cartList.count;
        return totalShopingCartItems;
    }

    /**
     * 
     * @param index the index of the element to obtain
     * @returns return an object with the product name and price values.
     */
    async getItemInShopingCartByIndex(index) {
        let itemName = await this.cartList.nth(i).find('div').withAttribute('class', 'inventory_item_name').textContent;
        let itemPrice = await this.cartList.nth(i).find('div').withAttribute('class', 'inventory_item_price').textContent;

        return { itemName: itemName, itemPrice: itemPrice };
    }

    //Function for clicking on checkout button.
    async clickOnCheckoutButton() {
        await t
            .click(this.checkoutButton);
    }

    /**
     * 
     * @param productName name of the producto to obtain
     * @returns return the data of the specific product in the shopping cart
     * Function for getting a product by name of the shopping cart list.
     */ 
    async getItemFromSpecificProductByName(productName) {
        await this.setSpecificProductByName(productName);
        let itemShoppingCartProduct = await this.getSpecificProductByName();
        let itemName = await itemShoppingCartProduct.find('div').withAttribute('class', 'inventory_item_name').textContent;
        let itemPrice = await itemShoppingCartProduct.find('div').withAttribute('class', 'inventory_item_price').textContent;

        let productInShoppingCart = { itemName: itemName, itemPrice: itemPrice };

        return productInShoppingCart;
    }



}

export default new ShoppingCartPage();