const timeout = require("../data/timeouts.json");

class Common {
    constructor(driver, webdriver) {
        this.driver = driver;
        this.webdriver = webdriver;
    }

    /**
     * Returns if the element is displayed.
     * 
     * @param  {Locator} locator
     * @returns {Promise<boolean>}
     */
    async isVisible(locator) {
        const element = await this.waitForElementLocated(locator);
        return element.isDisplayed();
    }

    /**
     * Returns the text of the element.
     * 
     * @param  {Locator} locator
     * @returns {Promise<string>}
     */
    async getText(locator) {
        const element = await this.waitForElementLocated(locator);
        return element.getText();
    }

    /**
     * Clicks on the element and wait until an element will be displayed.
     * 
     * @param  {Locator} locator
     * @param  {ElementFinder} waitCondition
     */
    async clickOn(locator, waitCondition) {
        const element = await this.waitForElementLocated(locator);
        await element.click();
        if (waitCondition) {
            await this.waitForElementLocated(waitCondition);
        }
    }

    /**
     * Gets the current URL.
     */
    async getCurrentURL() {
        return this.driver.getCurrentUrl();
    }

    /**
     * Gets the title of the page.
     */
    async getTitle() {
        return await this.driver.getTitle();
    }

    /**
     * Returns a defined attribute of the element.
     * 
     * @param  {Locator} locator
     * @param  {String} attribute
     * @returns {Promise<(string|null)>}
     */
    async getAttribute(locator, attribute) {
        const element = await this.waitForElementLocated(locator);
        return await element.getAttribute(attribute);
    }

    /**
     * Returns if an element is enabled.
     * 
     * @param  {Locator} locator
     * @returns {Promise<boolean>}
     */
    async isEnabled(locator) {
        const element = await this.waitForElementLocated(locator);
        return element.isEnabled();
    }

    /**
     * Waits until locator are presented in the DOM, and retuns the web element.
     * 
     * @param  {Locator} locator
     * @returns {IThenable<T>|WebElementPromise}
     */
    async waitForElementLocated(locator) {
        return this.driver.wait(this.webdriver.until.elementLocated(locator), timeout.default, `The ${locator} locator is not became visible in the DOM.`);
    }

    /**
     * Waits until locator are presented in the DOM, and retuns the web elements.
     * 
     * @param  {Locator} locator
     * @returns {IThenable<T>|WebElementPromise}
     */
    async waitForElementsLocated(locator) {
        return this.driver.wait(this.webdriver.until.elementsLocated(locator), timeout.default, `The ${locator} locator is not became visible in the DOM.`);
    }
}

module.exports = Common;
