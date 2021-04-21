import { Selector } from 'testcafe';

class ShoppingCartPage {
    constructor () {
        this.cartList = Selector('.cart_list').child('div.cart_item');
        this.specificItem = Selector('cart_item').withExactText('');
        this.checkoutButton = Selector('#checkout');
    }

    setSpesificProductByName(exactText){
        this.specificItem = Selector('div.inventory_item_name').withExactText(exactText).parent(2);
    }

    getSpesificProductByName(){
        return this.specificItem;
    }
}

export default new ShoppingCartPage();