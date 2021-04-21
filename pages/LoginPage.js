import { Selector, t } from 'testcafe';

class LoginPage {
    constructor() {
        this.usernameInput = Selector('#user-name');
        this.passwordInput = Selector('#password');
        this.loginButton = Selector('#login-button');
        this.errorMessage = Selector('.error-message-container.error');
    }

    /*
     * @param userName the username of the user for login
     * @param userPassword the password of th euser for login
     * This function is for the login in the site.
     */
    async login(userName, userPassword) {
        await t
            .typeText(this.usernameInput, userName)
            .typeText(this.passwordInput, userPassword)
            .click(this.loginButton);
    }

    /*
     * @param userName the username of the user for login
     * This function is for get the empty password message.
     */
    async loginWithoutPasswordInput(userName) {
        await t
            .typeText(this.usernameInput, userName)
            .click(this.loginButton);
    }

    //Function for click login button
    async clickLoginButton(){
        await t
            .click(this.loginButton);
    }
    
}

export default new LoginPage();

