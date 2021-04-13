const Angular = require("../pageObject/angularPage");
const helpers = require("../helpers/functions");
const webdriver = require("selenium-webdriver");
let driver;

const reporter = {
    specDone: async (result) => {
        if (result.status === "failed") {
            const screenshot = await driver.takeScreenshot();
            helpers.writeScreenShot(screenshot);
        }
    },
};
// eslint-disable-next-line no-undef
jasmine.getEnv().addReporter(reporter);

describe("Tests for angular page", () => {
    let angularPage;
    
    beforeAll(async () => {
        driver = helpers.driver();
        angularPage = new Angular(driver, webdriver);
        await angularPage.load();
    });

    afterAll(async () => {
        driver.quit();
    });

    describe("TC-1 Checking landing pages elements", () => {
        test("Angular logo in the top navbar should be visible", async () => {
            expect(await angularPage.isVisible(angularPage.locator.angularLogoInNavbar)).toBeTruthy();
        });

        test("Angular logo in the hero section should be visible", async () => {
            expect(await angularPage.isVisible(angularPage.locator.angularLogoInHero)).toBeTruthy();
        });

        test("text in hero section should be OK", async () => {
            expect(await angularPage.getText(angularPage.locator.heroText)).toBe("The modern web\ndeveloper's platform");
        });

        test("Get started button should be visible in the hero section", async () => {
            expect(await angularPage.isVisible(angularPage.locator.getStartedButton)).toBeTruthy();
        });

        describe("Get started button is clicked in the hero section", () => {
            beforeAll(async () => {
                await angularPage.clickOn(angularPage.locator.getStartedButton, angularPage.locator.headerText);
            });

            test("the URL should be OK", async () => {
                expect(await angularPage.getCurrentURL()).toBe("https://angular.io/docs");
            });

            test("the title on the content should be OK", async () => {
                expect(await angularPage.getTitle()).toBe("Angular - Introduction to the Angular Docs");
            });
        });

    });

    describe("TC-2 Checking search field on landing page", () => {
        test("Search input in the top navbar should be visible", async () => {
            expect(await angularPage.isVisible(angularPage.locator.searchInput)).toBeTruthy();
        });

        test("it should be empty", async () => {
            expect(await angularPage.getInputText(angularPage.locator.searchInput)).toBe("");
        });

        test("it should be Search as placeholder", async () => {
            expect(await angularPage.getAttribute(angularPage.locator.searchInput, "placeholder")).toBe("Search");
        });

        describe("it is clicked in and typed in", () => {
            beforeAll(async () => {
                await angularPage.clickOn(angularPage.locator.searchInput, angularPage.locator.searchInput);
                await angularPage.fieldIsTypedIn(angularPage.locator.searchInput, "directive");
            });

            test("Directive word should be in the searchfield", async () => {
                expect(await angularPage.getInputText(angularPage.locator.searchInput)).toBe("directive");
            });

            test("Directive should be listed in the API section", async () => {
                const searchResultListItem = await angularPage.getSearchResultListItem("Directive", "api");
                expect(await angularPage.isVisible(searchResultListItem)).toBeTruthy();
            });

            describe("Directive is clicked in the API section", () => {
                beforeAll(async () => {
                    const searchResultListItem = await angularPage.getSearchResultListItem("Directive", "api");
                    await angularPage.clickOn(searchResultListItem);
                });

                test("the URL should be OK", async () => {
                    expect(await angularPage.getCurrentURL()).toBe("https://angular.io/api/core/Directive");
                });

                test("the title on the content should be OK", async () => {
                    expect(await angularPage.isTitleOk("Angular - Directive")).toBeTruthy();
                });
            });
        });
    });
});
