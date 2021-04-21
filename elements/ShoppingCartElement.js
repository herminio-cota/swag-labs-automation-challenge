import { Selector } from 'testcafe';

class ShoppingCartElement {
    constructor () {
        this.shoppingCartButton = Selector('#shopping_cart_container');
    }
}

export default new ShoppingCartElement();