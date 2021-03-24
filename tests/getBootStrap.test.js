const GetBootStrap = require("../pageObject/getbootstrapPage");
const chrome = require("selenium-webdriver/chrome");
const chromePath = "./node_modules/webdriver-manager/selenium/chromedriver_89.0.4389.23.exe";
const webdriver = require("selenium-webdriver");
const { Builder } = require("selenium-webdriver");
const { Browser } = require("selenium-webdriver/lib/capabilities");
const service = new chrome.ServiceBuilder(chromePath).build();
chrome.setDefaultService(service);

const driver = new Builder().forBrowser(Browser.CHROME).build();
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

    test("the readonly input should not be in the viewport", async () => {
        // There isn't function to check it.
    });

    describe("The readonly input is scrolled into the viewport", () => {

        beforeAll(async () => {
            await this.getBootStrap.scrollToElement(this.getBootStrap.readOnlyInputField);
        });

        test("the readonly input should be in the viewport", async () => {
            // There isn't function to check it.
        });

        test("the readonly input should be readonly", async () => {
            expect(await this.getBootStrap.getAttribute(this.getBootStrap.readOnlyInputField, "readonly")).toBeTruthy();
        });
    });
});

describe("TC-4 Interaction with checkbox form elements", () => {
    beforeAll(async () => {
        await this.getBootStrap.load("forms/#checkboxes-and-radios", this.getBootStrap.downloadButton);
    });

    test("the default checkbox should be enabled", async () => {
        expect(await this.getBootStrap.isEnabled(this.getBootStrap.defaultCheckbox)).toBeTruthy();
    });

    test("the disabled checkbox should be disabled", async () => {
        expect(await this.getBootStrap.isEnabled(this.getBootStrap.disabledCheckbox)).toBeFalsy();
    });

    test("the default checkbox should be unchecked", async () => {
        expect(await this.getBootStrap.isSelected(this.getBootStrap.defaultCheckbox)).toBeFalsy();
    });

    describe("the default checkbox is clicked on", () => {

        beforeAll(async () => {
            await this.getBootStrap.clickOn(this.getBootStrap.defaultCheckbox);
        });

        test("the default checkbox should be checked", async () => {
            expect(await this.getBootStrap.isSelected(this.getBootStrap.defaultCheckbox)).toBeTruthy();
        });
    });
});

describe("TC-5 Interaction with radio form elements", () => {

});

describe("TC-6 Checking button form elements", () => {

});

describe("TC-7 Checking select form elements", () => {

});