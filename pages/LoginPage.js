import { Selector } from 'testcafe';

class LoginPage {
    constructor () {
        this.usernameInput = Selector('#user-name');
        this.passwordInput = Selector('#password');
        this.loginButton = Selector('#login-button');
        this.errorMessage = Selector('.error-message-container.error');
    }
}

export default new LoginPage();
 
