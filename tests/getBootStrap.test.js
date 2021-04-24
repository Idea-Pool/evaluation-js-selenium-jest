const GetBootStrap = require("../pageObject/getbootstrapPage");
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

describe("Tests for getBootStrap page", () => {
    let getBootStrap;

    beforeAll(async () => {
        driver = helpers.driver();
        getBootStrap = new GetBootStrap(driver, webdriver);
        await getBootStrap.load("forms/", getBootStrap.locator.downloadButton);
    });

    afterAll(async () => {
        driver.quit();
    });

    describe("TC-3 Checking form elements", () => {
        test("the URL should be OK", async () => {
            expect(await getBootStrap.getCurrentURL()).toBe("https://getbootstrap.com/docs/4.4/components/forms/");
        });

        test("the title on the content should be OK", async () => {
            expect(await getBootStrap.getTitle()).toBe("Forms · Bootstrap");
        });

        test("the readonly input should not be in the viewport", async () => {
            // There isn't function to check it.
        });

        describe("The readonly input is scrolled into the viewport", () => {
            beforeAll(async () => {
                await getBootStrap.scrollToElement(getBootStrap.locator.readOnlyInputField);
            });

            test("the readonly input should be in the viewport", async () => {
                // There isn't function to check it.
            });

            test("the readonly input should be readonly", async () => {
                expect(await getBootStrap.getAttribute(getBootStrap.locator.readOnlyInputField, "readonly")).toBeTruthy();
            });
        });
    });

    describe("TC-4 Interaction with checkbox form elements", () => {
        beforeAll(async () => {
            await getBootStrap.load("forms/#checkboxes-and-radios", getBootStrap.locator.downloadButton);
        });

        test("the default checkbox should be enabled", async () => {
            expect(await getBootStrap.isEnabled(getBootStrap.locator.defaultCheckbox)).toBeTruthy();
        });

        test("the disabled checkbox should be disabled", async () => {
            expect(await getBootStrap.isEnabled(getBootStrap.locator.disabledCheckbox)).toBeFalsy();
        });

        test("the default checkbox should be unchecked", async () => {
            expect(await getBootStrap.isSelected(getBootStrap.locator.defaultCheckbox)).toBeFalsy();
        });

        describe("the default checkbox is clicked on", () => {
            beforeAll(async () => {
                await getBootStrap.clickOn(getBootStrap.locator.defaultCheckbox);
            });

            test("the default checkbox should be checked", async () => {
                expect(await getBootStrap.isSelected(getBootStrap.locator.defaultCheckbox)).toBeTruthy();
            });
        });
    });

    describe("TC-5 Interaction with radio form elements", () => {
        test("the default radio should be enabled", async () => {
            expect(await getBootStrap.isEnabled(getBootStrap.locator.defaultRadioButton)).toBeTruthy();
        });

        test("the disabled radios should be disabled", async () => {
            expect(await getBootStrap.isEnabled(getBootStrap.locator.disabledRadioButton)).toBeFalsy();
        });

        test("the default radio should be selected", async () => {
            expect(await getBootStrap.isSelected(getBootStrap.locator.defaultRadioButton)).toBeTruthy();
        });

        test("the second default radio should not be selected", async () => {
            expect(await getBootStrap.isSelected(getBootStrap.locator.secondDefaultRadioButton)).toBeFalsy();
        });

        describe("the second default radio is clicked on", () => {
            beforeAll(async () => {
                await getBootStrap.clickOn(getBootStrap.locator.secondDefaultRadioButton);
            });

            test("the default radio should not be selected", async () => {
                expect(await getBootStrap.isSelected(getBootStrap.locator.defaultRadioButton)).toBeFalsy();
            });

            test("the second default radio should be selected", async () => {
                expect(await getBootStrap.isSelected(getBootStrap.locator.secondDefaultRadioButton)).toBeTruthy();
            });
        });
    });

    describe("TC-7 Checking select form elements", () => {
        beforeAll(async () => {
            await getBootStrap.scrollToElement(getBootStrap.locator.emailField);
        });

        test("the example select should be visible", async () => {
            expect(await getBootStrap.isVisible(getBootStrap.locator.exampleSelect)).toBeTruthy();
        });

        test("the example multiple select should be a multiple select", async () => {
            expect(await getBootStrap.getAttribute(getBootStrap.locator.exampleMultiSelect, "multiple")).toBeTruthy();
        });

        test("the selected option in example select should be 1", async () => {
            expect(await getBootStrap.getAttribute(getBootStrap.locator.exampleSelect, "value")).toBe("1");
        });

        test("there should not be option like hello in example select", async () => {
            expect(await getBootStrap.getTexts(await getBootStrap.locator.options)).toEqual(
                expect.not.arrayContaining(["hello"]));
        });

        test("there should be option like 2 in example select", async () => {
            expect(await getBootStrap.getTexts(await getBootStrap.locator.options)).toEqual(
                expect.arrayContaining(["2"]));
        });

        describe("The option 2 is selected in example select", () => {
            beforeAll(async () => {
                await getBootStrap.selectMultiSelect(getBootStrap.locator.exampleSelect, await getBootStrap.locator.options, 1);
            });

            test("the selected option in example select should be 2", async () => {
                expect(await getBootStrap.getAttribute(getBootStrap.locator.exampleSelect, "value")).toBe("2");
            });

            test("the number of options in example select should be 5", async () => {
                const elements = await getBootStrap.getTexts(await getBootStrap.locator.options);
                expect(elements.length).toBe(5);
            });
        });
    });
});