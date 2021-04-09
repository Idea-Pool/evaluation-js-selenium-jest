const Angular = require("../pageObject/angularPage");
const browserDriver = require("../helper/browser");
const webdriver = require("selenium-webdriver");

describe("Tests for angular page", () => {
    let driver;
    let angularPage;

    beforeAll(async () => {
        driver = browserDriver();
        angularPage = new Angular(driver, webdriver);
        await angularPage.load();
    });

    afterAll(async () => {
        driver.quit();
    });

    describe("TC-1 Checking landing pages elements", () => {
        test("Angular logo in the top navbar should be visible", async () => {
            expect(await angularPage.isVisible(angularPage.angularLogoInNavbar)).toBeTruthy();
        });

        test("Angular logo in the hero section should be visible", async () => {
            expect(await angularPage.isVisible(angularPage.angularLogoInHero)).toBeTruthy();
        });

        test("text in hero section should be OK", async () => {
            expect(await angularPage.getText(angularPage.heroText)).toBe("The modern web\ndeveloper's platform");
        });

        test("Get started button should be visible in the hero section", async () => {
            expect(await angularPage.isVisible(angularPage.getStartedButton)).toBeTruthy();
        });

        describe("Get started button is clicked in the hero section", () => {
            beforeAll(async () => {
                await angularPage.clickOn(angularPage.getStartedButton, angularPage.sidebar);
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
            expect(await angularPage.isVisible(angularPage.searchInput)).toBeTruthy();
        });

        test("it should be empty", async () => {
            expect(await angularPage.getInputText(angularPage.searchInput)).toBe("");
        });

        test("it should be Search as placeholder", async () => {
            expect(await angularPage.getAttribute(angularPage.searchInput, "placeholder")).toBe("Search");
        });

        describe("it is clicked in and typed in", () => {
            beforeAll(async () => {
                await angularPage.clickOn(angularPage.searchInput, angularPage.searchInput);
                await angularPage.fieldIsTypedIn(angularPage.searchInput, "directive");
            });

            test("Directive word should be in the searchfield", async () => {
                expect(await angularPage.getInputText(angularPage.searchInput)).toBe("directive");
            });

            test("Directive should be listed in the API section", async () => {
                const searchResultListItem = await angularPage.getSearchResultListItem("Directive", "api");
                expect(await angularPage.isVisible(searchResultListItem)).toBeTruthy();
            });

            describe("Directive is clicked in the API section", () => {
                beforeAll(async () => {
                    const searchResultListItem = await angularPage.getSearchResultListItem("Directive", "api");
                    await angularPage.clickOn(searchResultListItem);
                    await angularPage.waitForElementInvisible(searchResultListItem);
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
