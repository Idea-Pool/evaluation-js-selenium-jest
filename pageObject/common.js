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
        const element = await this.driver.wait(this.webdriver.until.elementLocated(locator),timeout.default, `The ${locator} locator is not became visible in the DOM.`);
        return element.isDisplayed();
    }

    /**
     * Returns the text of the element.
     * 
     * @param  {Locator} locator
     * @returns {Promise<string>}
     */
    async getText(locator) {
        const element = await this.driver.wait(this.webdriver.until.elementLocated(locator),timeout.default, `The ${locator} locator is not became visible in the DOM.`);
        return element.getText();
    }

    /**
     * Clicks on the element and wait until an element will be displayed.
     * 
     * @param  {Locator} locator
     * @param  {ElementFinder} waitCondition
     */
    async clickOn(locator, waitCondition) {
        const element = await this.driver.wait(this.webdriver.until.elementLocated(locator),timeout.default, `The ${locator} locator is not became visible in the DOM.`);
        await element.click();
        if (waitCondition) {
            await this.driver.wait(this.webdriver.until.elementLocated(waitCondition),timeout.default, `The ${waitCondition} locator is not became visible in the DOM.`);
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
        const element = await this.driver.wait(this.webdriver.until.elementLocated(locator),timeout.default, `The ${locator} locator is not became visible in the DOM.`);
        return await element.getAttribute(attribute);
    }

    /**
     * Returns if an element is enabled.
     * 
     * @param  {Locator} locator
     * @returns {Promise<boolean>}
     */
    async isEnabled(locator) {
        const element = await this.driver.wait(this.webdriver.until.elementLocated(locator),timeout.default, `The ${locator} locator is not became visible in the DOM.`);
        return element.isEnabled();
    }
}

module.exports = Common;
