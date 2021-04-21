# swag-labs-automation-challenge
This is a repository with some automated test cases for a challenge
The site tested was [https://www.saucedemo.com/](https://www.saucedemo.com/)

# Setup

1. Clone the repository on your local [swag-labs-automation-challenge](https://github.com/herminio-cota/swag-labs-automation-challenge.git)
2. Install/Download Nodejs in your computer you could follow the oficial instructions in [Nodejs](https://nodejs.org/es/download/)
2. Install npm in your computer you could follow the oficial instructions in [npm](https://www.npmjs.com)
3. Run the command `npm install testcafe` for install testcafe the oficial page is [testcafe](https://testcafe.io/documentation/402834/guides/basic-guides/install-testcafe)
4. Run the command `npm install testcafe-reporter-html` for install the reporter html the oficial page is [testcafe-reporter-html](https://www.npmjs.com/package/testcafe-reporter-html)

# Project Structure

1. Data
    - expectedData.json
    - testVariablesData.json
    - userData.json  
This folder have the data for some test in the code like some expected results, specific conditions or users data used in all tests.

2. Elements
    - BurgerMenuElement.js
    - FilterMenuElement.js
    - ShoppingCartElement.js  
This folder contains all the elements hat could be present in the different pages of the site.

3. Pages
    - CheckoutPage.js
    - LoginPage.js
    - ProductPage.js
    - ShoopingCartPage.js  
This folder contains all the mapped elements inside the different site pages.

4. Reports  
This folder contains all the generated reports after you run the tests.

5. tests
    - LoginTest.js
    - LogoutTest.js
    - PurchaseTest.js
    - ShoppingCart.js
    - SortProducts.js  
This folder contains all the test suites for the different test cases.


In the Package.json we have some scripts for run in the different browsers and the project dependencies.
```
{
    "scripts": {
        "testsChrome": "testcafe chrome tests/* --reporter html:reports/reports_chrome.html",
        "testsFirefox": "testcafe firefox tests/* --reporter html:reports/reports_firefox.html",
        "testsSafari": "testcafe safari tests/* --reporter html:reports/reports_safari.html",
        "testsOpera": "testcafe opera tests/* --reporter html:reports/reports_opera.html"
    },
    "dependencies": {
        "testcafe": "^1.14.0",
        "testcafe-reporter-html": "^1.4.6"
    }
}
```

# Running the tests

For run the test you have to run the following commands:

Browser | Command
------- | -------
Chrome  | npm run testsChrome
Firefox | npm run testsFirefox
Safari  | npm run testsSafari
Opera   | npm run testsOpera
