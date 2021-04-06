const { until } = require("selenium-webdriver");
const Common = require("./common");

class Angular extends Common {
    constructor(driver, webdriver) {
        super(driver, webdriver);
        this.url = "https://angular.io";
        this.angularLogoInNavbar = this.driver.findElement(this.webdriver.By.css(".mat-toolbar-row a.nav-link > img"));
        this.angularLogoInHero = this.driver.findElement(this.webdriver.By.css(".hero-logo > img"));
        this.heroText = this.driver.findElement(this.webdriver.By.css("div.hero-headline"));
        this.getStartedButton = this.driver.findElement(this.webdriver.By.css("a.button"));

        this.searchInput = this.driver.findElement(this.webdriver.By.xpath(".//input"));
        this.sidebar = this.driver.findElement(this.webdriver.By.css("aio-nav-menu.ng-tns-c18-1"));

        this.searchResultlistItem = (text, section) => this.driver.findElement(this.webdriver.By.xpath(`//div[contains(@class,"search-area")][./h3[contains(.,"${section}")]]//a[./span[contains(.,"${text}")]]`));
    }

    /**
     * Loads a page and wait until an element will be displayed.
     * 
     */
    async load() {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementIsVisible(this.getStartedButton));
    }

    /**
     * Returns the text of the input field.
     * 
     * @param  {ElementArrayFinder} elements
     * @returns {Array}
     */
    async getInputText(element) {
        return await element.getAttribute("value");
    }

    /**
     * The field is typed in.
     * 
     */
    async fieldIsTypedIn(element, text) {
        await element.sendKeys(text);
    }

    /**
     * Returns an element from the search result list.
     * 
     * @param  {String} text
     * @param  {String} section
     * @returns {ElementFinder}
     */
    async getSearchResultListItem(text, section) {
        await this.driver.sleep(1000);
        const searchResultListItem = this.searchResultlistItem(text, section);
        return searchResultListItem;
    }

    /**
     * Waits until an element will be invisible.
     * 
     * @param  {String} text
     * @returns {IThenable<T>|WebElementPromise}
     */
    async waitForElementInvisible(element){
        return this.driver.wait(until.stalenessOf(element));
    }

    /**
     * Returns if the title is OK.
     * 
     * @param  {String} text
     * @returns {IThenable<T>|WebElementPromise}
     */
    async isTitleOk(title){
        return this.driver.wait(until.titleIs(title));
    }

}

module.exports = Angular;
