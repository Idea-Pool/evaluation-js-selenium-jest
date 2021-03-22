const GetBootStrap = require("../pageObject/getbootstrapPage");
const chrome = require("selenium-webdriver/chrome");
const chromePath = "./node_modules/webdriver-manager/selenium/chromedriver_89.0.4389.23.exe";
const webdriver = require("selenium-webdriver");
const { Builder } = require("selenium-webdriver");
const { Browser, PageLoadStrategy } = require("selenium-webdriver/lib/capabilities");
const service = new chrome.ServiceBuilder(chromePath).build();
chrome.setDefaultService(service);

const driver = new Builder().forBrowser(Browser.CHROME).setChromeOptions(new chrome.Options()
    .setPageLoadStrategy(PageLoadStrategy.NORMAL)
    .addArguments(["--ignore-certificate-errors",
        "--disable-extensions",
        "--disable-popup-blocking",
        "enable-automation"]))
    .build();
this.getBootStrap = new GetBootStrap(driver, webdriver);

describe("TC-3 Checking form elements", () => {
    beforeAll(async () => {
        await this.getBootStrap.load("forms/", this.getBootStrap.downloadButton);
    });

    test("the URL should be OK", async () => {
        expect(await this.getBootStrap.getCurrentURL()).toBe("https://getbootstrap.com/docs/4.4/components/forms/");
    });

    test("the title on the content should be OK", async () => {
        expect(await this.getBootStrap.getTitle()).toBe("Forms · Bootstrap");
    });

});

describe("TC-4 Interaction with checkbox form elements", () => {

});

describe("TC-5 Interaction with radio form elements", () => {

});

describe("TC-6 Checking button form elements", () => {

});

describe("TC-7 Checking select form elements", () => {

});