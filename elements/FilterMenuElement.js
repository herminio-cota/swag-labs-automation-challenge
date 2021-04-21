import { Selector } from 'testcafe';

class FilterMenuElement {
    constructor () {
        this.filterMenuButton = Selector('.product_sort_container');
        this.optionAZ = Selector('.product_sort_container').child('option').withAttribute('value', 'az');
        this.optionZA = Selector('.product_sort_container').child('option').withAttribute('value', 'za');
        this.optionLOHI = Selector('.product_sort_container').child('option').withAttribute('value', 'lohi');
        this.optionHILO = Selector('.product_sort_container').child('option').withAttribute('value', 'hilo');
    }
}

export default new FilterMenuElement();