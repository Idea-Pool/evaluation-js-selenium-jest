const { Key } = require("selenium-webdriver");
const Common = require("./common");

class GetBootsrapPageButtons extends Common {
    constructor(driver, webdriver) {
        super(driver, webdriver);
        this.url = "https://getbootstrap.com/docs/4.4/components/";

        this.downloadButton = this.driver.findElement(this.webdriver.By.css("a.btn-bd-download"));
        
        this.primaryButton = this.driver.findElement(this.webdriver.By.xpath(".//button[.=\"Primary button\"]"));
        this.primaryLink = this.driver.findElement(this.webdriver.By.xpath(".//a[@aria-pressed=\"true\" and .=\"Primary link\"]"));
    }

    async load(url, element) {
        await await this.driver.get(this.url + url);
        await this.driver.wait(this.webdriver.until.elementIsVisible(element));
    }

    async scrollDownOnePage(element){
        await element.sendKeys(Key.PAGE_UP);
    }
}

module.exports = GetBootsrapPageButtons;