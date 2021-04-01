class Common {
    constructor(driver, webdriver) {
        this.driver = driver;
        this.webdriver = webdriver;
    }

    /**
     * Returns if the element is displayed.
     * 
     * @param  {ElementFinder} element
     * @returns {Promise<boolean>}
     */
    async isVisible(element) {
        await this.driver.wait(this.webdriver.until.elementIsVisible(element));
        return element.isDisplayed();
    }

    /**
     * Returns the text of the element.
     * 
     * @param  {ElementFinder} element
     * @returns {Promise<string>}
     */
    async getText(element) {
        await this.driver.wait(this.webdriver.until.elementIsVisible(element));
        return element.getText();
    }

    /**
     * Clicks on the element and wait until an element will be displayed.
     * 
     * @param  {ElementFinder} element
     * @param  {ElementFinder} waitCondition
     */
    async clickOn(element, waitCondition) {
        await element.click();
        if (waitCondition) {
            await this.driver.wait(this.webdriver.until.elementIsVisible(waitCondition));
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
     * Wait until a defined time.
     * 
     * @param  {number} time (ms)
     */
    async sleep(time) {
        await this.driver.sleep(time);
    }

    /**
     * Returns a defined attribute of the element.
     * 
     * @param  {ElementFinder} element
     * @param  {String} attribute
     * @returns {Promise<(string|null)>}
     */
    async getAttribute(element, attribute) {
        return await element.getAttribute(attribute);
    }

    /**
     * Returns if an element is enabled.
     * 
     * @param  {ElementFinder} element
     * @returns {Promise<boolean>}
     */
    async isEnabled(element) {
        return element.isEnabled();
    }
}

module.exports = Common;
