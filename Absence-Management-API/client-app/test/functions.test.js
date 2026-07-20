import {By, Builder} from 'selenium-webdriver';
import { equal } from "node:assert";
import {expect, assert} from "chai";
import * as chai from "chai";
import { request, default as chaiHttp } from 'chai-http';
import { formatName, isTextLengthValid, isInputString } from "../src/functions.js";
import { API_URL, DEV_BASE_URL, absenceTypes, absenceStatuses } from '../src/data/data.js';

// describe() introduces a test suite - a block of similar unit tests or "test specs"
describe("Mocha", () => {
    // it() introduces a single unit test - sometimes called a "spec", formed a group of similar expectations
   it("should be running when I run 'npm test'", () => {
       // a sanity check is a trivial function or test that proves we set things up correctly
       expect(true).to.be.ok;
   }); 
});

describe("React application", () => {

    chai.use(chaiHttp);
    
    it("should use valid API url", () => {
        expect(API_URL).to.include("/api/absence-requests");
    });

    it("API url should use HTTPS", () => {
        expect(API_URL).to.include("https://");
    })

    it('GET request for API endpoint should return 200 response status', () => {
        fetch(API_URL)
            .then(response => {
                expect(response).to.have.status(200);
            });
    });
    
    it("should be valid dev url", () => {
        expect(DEV_BASE_URL).to.include("http://localhost");
    });

    it('GET request for Node.js server should return 200 response status', done => {
        request.execute(DEV_BASE_URL)
            .get('/')
            .end((error, response) => {
                expect(response).to.have.status(200);
                done();
            });
    });

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });
    
    it("has root element", async () => {
        await driver.get(DEV_BASE_URL);
        await driver.manage().setTimeouts({implicit: 2000});
        let root = await driver.findElement(By.id("root"));
        assert.exists(root);
    });

    after(async () => await driver.quit());
});

describe("does employeeName input trigger error", () => {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });
    
    it("shows error toast", async () => {
        await driver.get(DEV_BASE_URL);
        await driver.manage().setTimeouts({implicit: 2000});
        let employeeNameField = await driver.findElement(By.name("employeeName"));
        await employeeNameField.sendKeys("0");
        let errorToast = await driver.findElement(By.id("error-toast-employeeName"));
        assert.exists(errorToast);
    });

    it("highlights field error", async () => {
        await driver.get(DEV_BASE_URL);
        await driver.manage().setTimeouts({implicit: 2000});
        let employeeNameField = await driver.findElement(By.name("employeeName"));
        await employeeNameField.sendKeys("0");
        let fieldClass = await employeeNameField.getAttribute("class");
        expect(fieldClass).to.have.string('is-invalid');
    });
    
    // TODO: check if submit button is disabled
    
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
    
    it("should correctly convert a full name to title case", () => {
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