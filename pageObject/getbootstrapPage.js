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

    async load(url, element) {
        await await this.driver.get(this.url + url);
        await this.driver.wait(this.webdriver.until.elementIsVisible(element));
    }

    async scrollToElement(element) {
        await this.driver.executeScript("arguments[0].scrollIntoView(true);", element);
        return this.driver.sleep(300);
    }

    async isSelected(element) {
        return element.isSelected();
    }

    async getTexts(elements){
        const texts= [];
        for(const element of elements){
            texts.push(await element.getText());
        }
        return texts;
    }

    async selectMultiSelect(element, options, number){
        await element.click();
        await options[number].click();
    }
}

module.exports = GetBootStrap;