import { Selector } from 'testcafe';

class BurgerMenuElement {
    constructor () {
        this.menuBurgerButton = Selector('#react-burger-menu-btn');
        this.logoutOption = Selector('#logout_sidebar_link');
    }
}

export default new BurgerMenuElement();