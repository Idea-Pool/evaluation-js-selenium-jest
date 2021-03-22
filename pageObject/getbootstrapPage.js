const Common = require("./common");

class GetBootStrap extends Common{
    constructor(driver, webdriver) {
        super(driver, webdriver);
        this.url = "https://getbootstrap.com/docs/4.4/components/";
        this.downloadButton = this.driver.findElement(this.webdriver.By.css("a.btn-bd-download"));
    }

    async load(url, element) {
        await await this.driver.get(this.url + url);
        await this.driver.wait(this.webdriver.until.elementIsVisible(element));
    }
}

module.exports = GetBootStrap;