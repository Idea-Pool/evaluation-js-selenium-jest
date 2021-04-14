const Common = require("./common");
const timeout = require("../data/timeouts.json");

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
        await await this.driver.get(this.url + url);
        await this.driver.wait(this.webdriver.until.elementLocated(locator),timeout.default, `The ${locator} locator is not became visible in the DOM.`);
    }

    /**
     * Scrolls one page down.
     * 
     * @param  {String} url
     * @param  {Locator} locator
     */
    async scrollDownOnePage(locator) {
        const element = await this.driver.wait(this.webdriver.until.elementLocated(locator),timeout.default, `The ${locator} locator is not became visible in the DOM.`);
        await element.sendKeys(this.webdriver.Key.PAGE_UP);
    }
}

module.exports = GetBootsrapPageButtons;