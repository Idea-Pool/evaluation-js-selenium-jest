const chrome = require("selenium-webdriver/chrome");
const chromePath = "./node_modules/webdriver-manager/selenium/chromedriver_89.0.4389.23.exe";
const { Builder, until, promise } = require("selenium-webdriver");
const { Browser, PageLoadStrategy } = require("selenium-webdriver/lib/capabilities");
const { By } = require("selenium-webdriver");
const service = new chrome.ServiceBuilder(chromePath).build();
chrome.setDefaultService(service);

const driver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(new chrome.Options()
    .setPageLoadStrategy(PageLoadStrategy.NORMAL)
    .addArguments(["--ignore-certificate-errors",
        "--disable-extensions",
        "--disable-popup-blocking",
        "enable-automation"]))
    .build();

class Angular {
    constructor() {
        this.url = "https://angular.io";
        this.angularLogoInNavbar = driver.findElement(By.css(".mat-toolbar-row a.nav-link > img"));
        this.angularLogoInHero = driver.findElement(By.css(".hero-logo > img"));
        this.heroText = driver.findElement(By.css("div.hero-headline"));
        this.getStartedButton = driver.findElement(By.css("a.button"));
        
        this.searchInput = driver.findElement(By.xpath(".//input"));
        this.sidebar = driver.findElement(By.css("aio-nav-menu.ng-tns-c18-1"));

        this.searchResultlistItem = (text, section) => driver.findElement(By.xpath(`//div[contains(@class,"search-area")][./h3[contains(.,"${section}")]]//a[./span[contains(.,"${text}")]]`));
    }

    async load() {
        await driver.get(this.url);
        await driver.wait(until.elementIsVisible(this.getStartedButton));
    }

    async isVisible(element){
        return element.isDisplayed();
    }

    async getText(element){
        await driver.wait(until.elementIsVisible(element));
        return element.getText();
    }

    async clickOn(element, waitCondition){
        await element.click();
        if(waitCondition){
            await driver.wait(until.elementIsVisible(waitCondition));
        }
    }

    async getCurrentURL(){
        return driver.getCurrentUrl();
    }

    async getTitle(){
        return await driver.getTitle();
    }

    async getInputText(element){
        return await element.getAttribute("value");
    }

    async getAttribute(element, attribute){
        return await element.getAttribute(attribute);
    }

    async fieldIsTypedIn(element, text){
        await element.sendKeys(text);
    }

    async getSearchResultListItem(text, section){
        await driver.sleep(3000);
        const searchResultListItem = this.searchResultlistItem(text, section);
        return searchResultListItem;
    }

    async sleep(time){
        await driver.sleep(time);
    }
}

module.exports = Angular;
