const Common = require("./common");

class GetBootStrap extends Common {
    constructor(driver, webdriver) {
        super(driver, webdriver);
        this.url = "https://getbootstrap.com/docs/4.4/components/";
        this.downloadButton = this.driver.findElement(this.webdriver.By.css("a.btn-bd-download"));

        this.readOnlyInputField = this.driver.findElement(this.webdriver.By.css("input.form-control[placeholder*=\"Readonly\""));

        this.defaultCheckbox = this.driver.findElement(this.webdriver.By.id("defaultCheck1"));
        this.disabledCheckbox = this.driver.findElement(this.webdriver.By.id("defaultCheck2"));

        this.defaultRadioButton = this.driver.findElement(this.webdriver.By.id("exampleRadios1"));
        this.disabledRadioButton = this.driver.findElement(this.webdriver.By.id("exampleRadios3"));
        this.secondDefaultRadioButton = this.driver.findElement(this.webdriver.By.id("exampleRadios2"));

        this.emailField = this.driver.findElement(this.webdriver.By.id("exampleFormControlInput1"));
        this.exampleSelect = this.driver.findElement(this.webdriver.By.id("exampleFormControlSelect1"));
        
        this.exampleMultiSelect = this.driver.findElement(this.webdriver.By.id("exampleFormControlSelect2"));
        this.options = this.exampleSelect.findElements(this.webdriver.By.css("option"));
    }

    /**
     * Loads a page and wait until an element will be displayed.
     * 
     * @param  {String} url
     * @param  {ElementFinder} element
     */
    async load(url, element) {
        await await this.driver.get(this.url + url);
        await this.driver.wait(this.webdriver.until.elementIsVisible(element));
    }

    /**
     * Scrolls to an element.
     * 
     * @param  {ElementFinder} element
     * @returns {Promise<undefined>}
     */
    async scrollToElement(element) {
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
        return this.driver.sleep(300);
    }

    /**
     * Returns if an element is selected.
     * 
     * @param  {ElementFinder} element
     * @returns {Promise<boolean>}
     */
    async isSelected(element) {
        return element.isSelected();
    }

    /**
     * Returns texts of the elements.
     * 
     * @param  {ElementArrayFinder} elements
     * @returns {Array}
     */
    async getTexts(elements) {
        const texts = [];
        for (const element of elements) {
            texts.push(await element.getText());
        }
        return texts;
    }

    /**
     * Selects an option in the multiselect.
     * 
     * @param  {ElementFinder} element
     * @param  {ElementFinder} option
     * @param  {number} number
     */
    async selectMultiSelect(element, option, number) {
        await element.click();
        await this.sleep(10);
        await option[number].click();
        return this.sleep(10);
    }
}

module.exports = GetBootStrap;