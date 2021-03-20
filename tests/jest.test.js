const Angular = require("../pageObject/angularPage");
const angularPage = new Angular();


describe("TC-1 Checking landing pages elements", () => {

    beforeAll(async () => {
        await angularPage.load();
    });

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
            expect(await angularPage.getCurrentURL(angularPage.heroText)).toBe("https://angular.io/docs");
        });

        test("the title on the content should be OK", async () => {
            expect(await angularPage.getTitle()).toBe("Angular - Introduction to the Angular Docs");
        });
    });

});