import {By, Builder} from 'selenium-webdriver';
import { equal } from "node:assert";
import { assert, expect } from "chai";
import { formatName, isTextLengthValid, isInputString } from "../src/functions.js";
import { ABSENCE_REQUESTS_API_URL, APPLICATION_URL } from '../src/data/data.js';
import absenceTypes from '../src/data/absenceTypes.json' with { type: 'json' };
import absenceStatuses from '../src/data/absenceStatuses.json' with { type: 'json' };

// describe() introduces a test suite - a block of similar unit tests or "test specs"
describe("Mocha", () => {
    // it() introduces a single unit test - sometimes called a "spec", formed a group of similar expectations
   it("should be running when I run 'npm test'", () => {
       // a sanity check is a trivial function or test that proves we set things up correctly
       expect(true).to.be.ok;
   }); 
});

describe("React application", () => {
    it("should use valid API url", () => {
        expect(ABSENCE_REQUESTS_API_URL).to.include("https://");
    });

    it("should use valid application url", () => {
        expect(APPLICATION_URL).to.include("http://localhost");
    });

    it("should load in less than 5000ms", function (done) {
        this.timeout(5000);
        setTimeout(done, 4000);
    });
    
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });
    
    it("has root element", async () => {
        await driver.get(APPLICATION_URL);
        await driver.manage().setTimeouts({implicit: 2000});
        let root = await driver.findElement(By.id("root"));
        assert.exists(root);
    });

    after(async () => await driver.quit());
});

describe("isTextLengthValid", () => {
    it("should return true if length is valid", () => {
        expect(isTextLengthValid("text", 5)).to.be.true;
    });
    it("should return a boolean if length is invalid", () => {
        expect(isTextLengthValid("longtext", 5)).to.be.false;
    });
});

describe("isInputString", () => {
    it("should return true if is string", () => {
        expect(isInputString("string")).to.be.true;
    });
    it("should return false if is not string", () => {
        expect(isInputString(123)).to.be.false;
    });
    it("should return false if string contains numbers", () => {
        expect(isInputString("123")).to.be.false;
    });
});

describe("formatName", () => {
    // TODO: function should only accept string type
    let fullName; 
    let expected;
    before(() => {
        fullName = "arthur morgan";
        expected = "Arthur Morgan";
    })
    
    it("should correctly convert a full name to uppercase", () => {
        equal(formatName(fullName), expected);
    });
});

describe("absenceTypes", () => {
    const data = JSON.stringify(absenceTypes);
    const types = data.split(',');
   it("should have a length of 4", () => {
       assert.lengthOf(types, 4);
   });
});

describe("absenceStatuses", () => {
    const data = JSON.stringify(absenceStatuses);
    const statuses = data.split(',');
    it("should have a length of 3", () => {
        assert.lengthOf(statuses, 3);
    });
});

// handleRemoveRequest
// ApproveRequest
// DenyRequest
// setDisabled
// setStartDate
// setEndDate
// validateStartDate
// handleSubmit
// addRequestToState
// form validation checks onChange
// validateInput
// showToast
// fetchData
// mapAbsences