import { Selector, t } from 'testcafe';
const expectedData = require('../data/expectedData.json');

class CheckoutPage {
    constructor() {
        this.firstNameInput = Selector('#first-name');
        this.lastNameInput = Selector('#last-name');
        this.postalCode = Selector('#postal-code');
        this.continueButton = Selector('#continue');
        this.subTotal = Selector('.summary_subtotal_label');
        this.taxes = Selector('.summary_tax_label');
        this.totalAmount = Selector('.summary_total_label');
        this.finishButton = Selector('#finish');
        this.completeHeader = Selector('.complete-header');
        this.errorMessageContainer = Selector('.error-message-container.error');
    }

    /**
     * 
     * @param firstName the firstname to fill in checkout section
     * @param lastName  the lastname to fill in checkout section
     * @param postalCode the postalcode to fill in checkout section
     * Function to fill the checkout form
     */
    async fillTheCheckoutInformation(firstName, lastName, postalCode) {
        await t
            .typeText(this.firstNameInput, firstName)
            .typeText(this.lastNameInput, lastName)
            .typeText(this.postalCode, postalCode)
            .click(this.continueButton);
    }

    /**
    * 
    * @param firstName the firstname to fill in checkout section
    * @param lastName  the lastname to fill in checkout section
    * @param postalCode the postalcode to fill in checkout section
    * @returns a error message according the empty value
    * Function to fill the checkout form 
    * 
    */
    async getTheCheckoutInformationErrorMessage(firstName, lastName, postalCode) {

        await t
            .typeText(this.firstNameInput, firstName)
            .typeText(this.lastNameInput, lastName)
            .typeText(this.postalCode, postalCode)
            .click(this.continueButton);

        if (firstName == ' ') {
            return expectedData.checkout.firstNameRequired
        } else if (lastName == ' ') {
            return expectedData.checkout.lastNameRequired
        } else {
            return expectedData.checkout.postalCodeRequired
        }
    }

    /**
     * Function that gets the totals amounts total expected and total obtained( the sum of all the products prices)
     * @returns an object with the both totals expected and obtained.
     */
    async verifyTotalAmount() {
        let subtotal = await this.subTotal.textContent;
        let taxes = await this.taxes.textContent;
        let total = await this.totalAmount.textContent;

        let totalObtained = parseFloat(subtotal.split('$')[1]) + parseFloat(taxes.split('$')[1]);
        let totalExpected = parseFloat(total.split('$')[1]);

        return { totalObtained: totalObtained, totalExpected: totalExpected };
    }

    //Function for clicking the finish button
    async clickOnFinishButton() {
        await t
            .click(this.finishButton)
    }


}

export default new CheckoutPage();