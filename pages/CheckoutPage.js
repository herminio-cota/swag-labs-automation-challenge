import { Selector } from 'testcafe';

class CheckoutPage {
    constructor () {
        this.firstNameInput = Selector('#first-name');
        this.lastNameInput = Selector('#last-name');
        this.postalCode = Selector('#postal-code');
        this.continueButton = Selector('#continue');
        this.subTotal = Selector('.summary_subtotal_label');
        this.taxes = Selector('.summary_tax_label');
        this.totalAmount = Selector('.summary_total_label');
        this.finishButton = Selector('#finish');
        this.completeHeader = Selector('.complete-header');
    }

}

export default new CheckoutPage();