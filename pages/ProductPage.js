import { Selector } from 'testcafe';

class ProductPage {
    constructor () {
        this.title = Selector('.title');
        this.inventory = Selector('.inventory_list');
        this.specificItem = Selector('.inventory_item').withExactText('');
    }

    setSpecificProductByName(exactText){
        this.specificItem = Selector('.inventory_item').find('div.inventory_item_name').withExactText(exactText).parent(3);
    }

    getSpecificProductByName(){
        return this.specificItem;
    }
}

export default new ProductPage();