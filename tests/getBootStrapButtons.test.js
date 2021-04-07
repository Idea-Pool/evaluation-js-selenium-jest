const GetBootStrapButtons = require("../pageObject/getbootstrapPageButtons");
const chrome = require("selenium-webdriver/chrome");
const chromePath = "./node_modules/webdriver-manager/selenium/chromedriver_89.0.4389.23.exe";
const webdriver = require("selenium-webdriver");
const { Builder, Browser } = require("selenium-webdriver");
const service = new chrome.ServiceBuilder(chromePath).build();
chrome.setDefaultService(service);

const driver = new Builder().forBrowser(Browser.CHROME).build();
driver.manage().window().maximize();
this.getBootStrapButtons = new GetBootStrapButtons(driver, webdriver);

describe("TC-6 Checking button form elements", () => {
    beforeAll(async () => {
        await this.getBootStrapButtons.load("buttons/#disabled-state", this.getBootStrapButtons.downloadButton);
    });

    test("there should be a button with text Primary button", async () => {
        expect(await this.getBootStrapButtons.isVisible(this.getBootStrapButtons.primaryButton)).toBeTruthy();
    });

    test("the primary button should be disabled", async () => {
        expect(await this.getBootStrapButtons.isEnabled(this.getBootStrapButtons.primaryButton)).toBeFalsy();
    });

    describe("the page is scrolled down 1 page", () => {
        beforeAll(async () => {
            await this.getBootStrapButtons.scrollDownOnePage(this.getBootStrapButtons.primaryLink);
        });

        test("the active primary link button should not be disabled", async () => {
            expect(await this.getBootStrapButtons.isEnabled(this.getBootStrapButtons.primaryLink)).toBeTruthy();
        });
    });

});