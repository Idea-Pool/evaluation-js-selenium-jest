const Common = require("./common");

class Angular extends Common {
    constructor(driver, webdriver) {
        super(driver, webdriver);
        this.url = "https://angular.io";

        this.locator = {
            searchResultlistItems : this.webdriver.By.css("a.search-result-item"),
            angularLogoInNavbar : this.webdriver.By.css(".mat-toolbar-row a.nav-link > img"),
            angularLogoInHero : this.webdriver.By.css(".hero-logo > img"),
            heroText : this.webdriver.By.css("div.hero-headline"),
            getStartedButton: this.webdriver.By.css("a.button"),
            searchInput: this.webdriver.By.xpath(".//input"),
            headerText : this.webdriver.By.css("h1#introduction-to-the-angular-docs"),
            searchResultlistItem : (text, section) =>this.webdriver.By.xpath(`//div[contains(@class,"search-area")][./h3[contains(.,"${section}")]]//a[./span[contains(.,"${text}")]]`)
        };
    }

    /**
     * Loads a page and wait until an element will be displayed.
     * 
     */
    async load() {
        await this.driver.get(this.url);
        await this.waitForElementLocated(this.locator.getStartedButton);
    }

    /**
     * Returns the text of the input field.
     * 
     * @param  {Locator} locator
     * @returns {Array}
     */
    async getInputText(locator) {
        const element = await this.waitForElementLocated(locator);
        return await element.getAttribute("value");
    }

    /**
     * The field is typed in.
     * 
     * @params {Locator} locator
     * @params {String} text
     * 
     */
    async fieldIsTypedIn(locator, text) {
        const element = await this.waitForElementLocated(locator);
        await element.sendKeys(text);
    }

    /**
     * Returns an element from the search result list.
     * 
     * @param  {String} text
     * @param  {String} section
     * @returns {Locator}
     */
    async getSearchResultListItem(text, section) {
        const searchResultListItem = this.locator.searchResultlistItem(text, section);
        return searchResultListItem;
    }

    /**
     * Returns if the title is OK.
     * 
     * @param  {String} text
     * @returns {IThenable<T>|WebElementPromise}
     */
    async isTitleOk(title){
        return this.driver.wait(this.webdriver.until.titleIs(title));
    }
}

module.exports = Angular;
