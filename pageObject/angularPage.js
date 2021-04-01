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

    async load() {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementIsVisible(this.getStartedButton));
    }

    async getInputText(element) {
        return await element.getAttribute("value");
    }

    async fieldIsTypedIn(element, text) {
        await element.sendKeys(text);
    }

    async getSearchResultListItem(text, section) {
        await this.driver.sleep(3000);
        const searchResultListItem = this.searchResultlistItem(text, section);
        return searchResultListItem;
    }
}

module.exports = Angular;
