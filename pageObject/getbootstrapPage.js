const Common = require("./common");

class GetBootStrap extends Common {
    constructor(driver, webdriver) {
        super(driver, webdriver);
        this.url = "https://getbootstrap.com/docs/4.4/components/";

        this.locator = {
            downloadButton : this.webdriver.By.css("a.btn-bd-download"),
            readOnlyInputField : this.webdriver.By.css("input.form-control[placeholder*=\"Readonly\""),
            defaultCheckbox : this.webdriver.By.id("defaultCheck1"),
            disabledCheckbox : this.webdriver.By.id("defaultCheck2"),
            defaultRadioButton : this.webdriver.By.id("exampleRadios1"),
            disabledRadioButton : this.webdriver.By.id("exampleRadios3"),
            secondDefaultRadioButton : this.webdriver.By.id("exampleRadios2"),
            emailField : this.webdriver.By.id("exampleFormControlInput1"),
            exampleSelect : this.webdriver.By.id("exampleFormControlSelect1"),
            exampleMultiSelect : this.webdriver.By.id("exampleFormControlSelect2"),
            options : this.webdriver.By.css("#exampleFormControlSelect1 option")
        };
    }

    /**
     * Loads a page and wait until an element will be displayed.
     * 
     * @param  {String} url
     * @param  {Locator} locator
     */
    async load(url, locator) {
        await this.driver.get(this.url + url);
        await this.waitForElementLocated(locator);

    }

    /**
     * Scrolls to an element.
     * 
     * @param  {Locator} locator
     * @returns {Promise<undefined>}
     */
    async scrollToElement(locator) {
        const element = await this.waitForElementLocated(locator);
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
        return this.driver.sleep(300);
    }

    /**
     * Returns if an element is selected.
     * 
     * @param  {Locator} locator
     * @returns {Promise<boolean>}
     */
    async isSelected(locator) {
        const element = await this.waitForElementLocated(locator);
        return element.isSelected();
    }

    /**
     * Returns texts of the elements.
     * 
     * @param  {Locator} locator
     * @returns {Array}
     */
    async getTexts(locator) {
        const elements = await this.waitForElementsLocated(locator);
    
        const texts = [];
        for (const element of elements) {
            texts.push(await element.getText());
        }
        return texts;
    }

    /**
     * Selects an option in the multiselect.
     * 
     * @param  {Locator} locator
     * @param  {Locator} optionLocator
     * @param  {number} number
     */
    async selectMultiSelect(locator, optionLocator, number) {
        const element = await this.waitForElementLocated(locator);
        const options = await this.waitForElementsLocated(optionLocator);
        await element.click();
        await options[number].click();
    }
}

module.exports = GetBootStrap;