const GetBootStrap = require("../pageObject/getbootstrapPage");
const getBootStrap = new GetBootStrap();


describe("TC-3 Checking form elements", () => {
    beforeAll(async () => {
        await getBootStrap.load("forms/", getBootStrap.downloadButton);
    });

    test("the URL should be OK", async () => {
        expect(await getBootStrap.getCurrentURL()).toBe("https://getbootstrap.com/docs/4.4/components/forms/");
    });

    test("the title on the content should be OK", async () => {
        expect(await getBootStrap.getTitle()).toBe("Forms · Bootstrap");
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