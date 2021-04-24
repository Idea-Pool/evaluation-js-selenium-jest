const Common = require("./common");

class GetBootsrapPageButtons extends Common {
    constructor(driver, webdriver) {
        super(driver, webdriver);
        this.url = "https://getbootstrap.com/docs/4.4/components/";

        this.locator = {
            downloadButton: this.webdriver.By.css("a.btn-bd-download"),
            primaryButton: this.webdriver.By.xpath(".//button[.=\"Primary button\"]"),
            primaryLink: this.webdriver.By.xpath(".//a[@aria-pressed=\"true\" and .=\"Primary link\"]")
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
     * Scrolls one page down.
     * 
     * @param  {String} url
     * @param  {Locator} locator
     */
    async scrollDownOnePage(locator) {
        const element = await this.waitForElementLocated(locator);
        await element.sendKeys(this.webdriver.Key.PAGE_UP);
    }
}

module.exports = GetBootsrapPageButtons;