const chrome = require("selenium-webdriver/chrome");
const chromePath = "./node_modules/webdriver-manager/selenium/chromedriver_89.0.4389.23.exe";
const { Builder, until } = require("selenium-webdriver");
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

class GetBootStrap {
    constructor() {
        this.url = "https://getbootstrap.com/docs/4.4/components/";
        this.downloadButton = driver.findElement(By.css("a.btn-bd-download"));
    }

    async load(url, element) {
        await await driver.get(this.url + url);
        await driver.wait(until.elementIsVisible(element));
    }

    async getCurrentURL(){
        return driver.getCurrentUrl();
    }

    async getTitle(){
        return await driver.getTitle();
    }
}

module.exports = GetBootStrap;