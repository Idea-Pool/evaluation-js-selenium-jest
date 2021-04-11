const chrome = require("selenium-webdriver/chrome");
const chromePath = require("chromedriver").path;
const webdriver = require("selenium-webdriver");
const fs = require("fs");

function driver() {
    const service = new chrome.ServiceBuilder(chromePath).build();
    chrome.setDefaultService(service);
    const driver = new webdriver.Builder().forBrowser(webdriver.Browser.CHROME).build();
    driver.manage().window().maximize();
    return driver;
}

function writeScreenShot(data) {
    const time = new Date().toISOString().replace(/[^a-zA-Z0-9]/g, "_");
    const stream = fs.createWriteStream(`./temp/screenshots/${time}_screenshot.png`);
    stream.write(new Buffer.from(data, "base64"));
    stream.end();
}

module.exports = {driver, writeScreenShot};
