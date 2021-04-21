import { Selector, t } from 'testcafe';
import BurgerMenu from '../elements/BurgerMenuElement';
import FilterMenuElement from '../elements/FilterMenuElement';
import ShoppingCartElement from '../elements/ShoppingCartElement';

class ProductPage {
    constructor() {
        this.title = Selector('.title');
        this.inventory = Selector('.inventory_list');
        this.specificItem = Selector('.inventory_item').withExactText('');
        this.addButton = Selector('button');
    }

    /** 
     * 
     * @param exactText text in the child item 
     * This function get the main item parent from a text of its childs.
     */
    setSpecificProductByName(exactText) {
        this.specificItem = Selector('.inventory_item').find('div.inventory_item_name').withExactText(exactText).parent(3);
    }

    //function for get the item obtained in setSpecificProductByName function.
    getSpecificProductByName() {
        return this.specificItem;
    }

    /**
     * 
     * @param filterOption the option to select in the filter
     * Function to sort the products displayed
     */
    async sortProducts(filterOption) {
        await t
            .click(FilterMenuElement.filterMenuButton)
            .click(filterOption);
    }

    /**
     * Function that count the total items in inventory section
     * @returns return the total of items displayed.
     */
    async getTotalProductsDisplayed() {
        let totalProductsDisplayed = await this.inventory.child().count;
        return totalProductsDisplayed;
    }

    /**
     * 
     * @param index the index of the item to obtain
     * @returns return the prices of the item obtined from index and the nexone item
     * Function get the prices of the item obtined from index and the next one.
     */
    async verifySortLoHi(index) {
        let itemPriceRaw = await this.inventory.child(index).find('div').withAttribute('class', 'inventory_item_price').textContent
        let nextItemPriceRaw = await this.inventory.child(index + 1).find('div').withAttribute('class', 'inventory_item_price').textContent

        let itemPrice = parseFloat(itemPriceRaw.substring(1));
        let nextItemPrice = parseFloat(nextItemPriceRaw.substring(1));

        return { itemPrice: itemPrice, nextItemPrice: nextItemPrice };
    }

    /**
     * 
     * @param itemsAdded the items added to the shopping cart
     * Function for adding some items to shooping cart
     */
    async selectMultipleItems(itemsAdded) {
        let totalProductsDisplayed = this.getTotalProductsDisplayed();
        for (let i = 0; i < totalProductsDisplayed / 2; i++) {

            let itemName = await this.inventory.child(i).find('div').withAttribute('class', 'inventory_item_name').textContent;
            let itemPrice = await this.inventory.child(i).find('div').withAttribute('class', 'inventory_item_price').textContent;
            let itemAddButton = await this.inventory.child(i).find('button');

            itemsAdded.push({ "itemName": itemName, "itemPrice": itemPrice });

            await t.click(itemAddButton).expect(itemAddButton.textContent).eql(expectedData.shoppingCarTest.textRemoveButton);
        }
    }

    //Function for clicking in shoping cart button
    async clickOnShopingCartButton(){
        await t
        .click(ShoppingCartElement.shoppingCartButton);
    }

    /**
     * 
     * @param productName name of the producto to obtain
     * @returns return the data of the specific product added
     * Function for add a product by name of the inventory to the shopping cart.
     */
    async addSpecificProductToShoppingCartByName(productName){
        await this.setSpecificProductByName(productName);
        let itemProduct = await this.getSpecificProductByName();
        let itemName = await itemProduct.find('div').withAttribute('class', 'inventory_item_name').textContent;
        let itemPrice = await itemProduct.find('div').withAttribute('class', 'inventory_item_price').textContent;
        let itemAddButton = await itemProduct.find('button');
    
        let itemAdded = { "itemName": itemName, "itemPrice": itemPrice };
    
        await this.setAddButton(itemAddButton);
        await t.click(itemAddButton);

        return itemAdded;
    }

    //Function for set a value to addButton
    async setAddButton(addButton){
        this.addButton = addButton;
    }

    //Function to get the addButton item
    async getAddButton(){
        return this.addButton;
    }

    //Function for logout from products page
    async logout() {
        await t
            .click(BurgerMenu.menuBurgerButton)
            .click(BurgerMenu.logoutOption)
    }
}

export default new ProductPage();