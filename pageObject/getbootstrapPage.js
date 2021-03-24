const Common = require("./common");

class GetBootStrap extends Common{
    constructor(driver, webdriver) {
        super(driver, webdriver);
        this.url = "https://getbootstrap.com/docs/4.4/components/";
        this.downloadButton = this.driver.findElement(this.webdriver.By.css("a.btn-bd-download"));
        this.readOnlyInputField = this.driver.findElement(this.webdriver.By.css("input.form-control[placeholder*=\"Readonly\""));
        this.defaultCheckbox = this.driver.findElement(this.webdriver.By.id("defaultCheck1"));
        this.disabledCheckbox = this.driver.findElement(this.webdriver.By.id("defaultCheck2"));
    }

    async load(url, element) {
        await await this.driver.get(this.url + url);
        await this.driver.wait(this.webdriver.until.elementIsVisible(element));
    }

    async scrollToElement (element){
        return this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
    }

    async isEnabled(element){
        return element.isEnabled();
    }

    async isSelected(element){
        return element.isSelected();
    }
}

module.exports = GetBootStrap;