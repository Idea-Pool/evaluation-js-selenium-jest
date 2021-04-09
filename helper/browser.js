const chrome = require("selenium-webdriver/chrome");
const chromePath = require("chromedriver").path;
const webdriver = require("selenium-webdriver");

module.exports = function driver() {
    const service = new chrome.ServiceBuilder(chromePath).build();
    chrome.setDefaultService(service);
    const driver = new webdriver.Builder().forBrowser(webdriver.Browser.CHROME).build();
    driver.manage().window().maximize();
    return driver;
};