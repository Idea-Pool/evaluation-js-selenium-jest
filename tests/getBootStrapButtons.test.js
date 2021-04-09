const GetBootStrapButtons = require("../pageObject/getbootstrapPageButtons");
const browserDriver = require("../helper/browser");
const webdriver = require("selenium-webdriver");

describe("Tests for getBootStrapButton page", () => {
    let driver;
    let getBootStrapButtons;

    beforeAll(async () => {
        driver = browserDriver();
        getBootStrapButtons = new GetBootStrapButtons(driver, webdriver);
        await getBootStrapButtons.load("buttons/#disabled-state", getBootStrapButtons.downloadButton);
    });

    afterAll(async () => {
        driver.quit();
    });

    describe("TC-6 Checking button form elements", () => {
        test("there should be a button with text Primary button", async () => {
            expect(await getBootStrapButtons.isVisible(getBootStrapButtons.primaryButton)).toBeTruthy();
        });

        test("the primary button should be disabled", async () => {
            expect(await getBootStrapButtons.isEnabled(getBootStrapButtons.primaryButton)).toBeFalsy();
        });

        describe("the page is scrolled down 1 page", () => {
            beforeAll(async () => {
                await getBootStrapButtons.scrollDownOnePage(getBootStrapButtons.primaryLink);
            });

            test("the active primary link button should not be disabled", async () => {
                expect(await getBootStrapButtons.isEnabled(getBootStrapButtons.primaryLink)).toBeTruthy();
            });
        });
    });
});