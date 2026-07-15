import { equal } from "node:assert";
import { assert, expect } from "chai";
import { formatName } from "../src/main.js";
import absenceTypes from '../src/data/absenceTypes.json' with { type: 'json' };
import absenceStatuses from '../src/data/absenceStatuses.json' with { type: 'json' };

// describe() introduces a test suite - a block of similar unit tests or "test specs"
describe("Mocha", function () {
    // it() introduces a single unit test - sometimes called a "spec", formed a group of similar expectations
   it("should be running when I run 'npm test'", function () {
       // a sanity check is a trivial function or test that proves we set things up correctly
       expect(true).to.be.ok;
   }); 
});

describe("formatName", function () {
    const fullName = "arthur morgan";
    const expected = "Arthur Morgan";
    // TODO: function should only accept string type
    it("should correctly convert a full name to uppercase", function () {
        equal(formatName(fullName), expected);
    });
});

describe("absenceTypes", function () {
    const data = JSON.stringify(absenceTypes);
    const types = data.split(',');
   it("should have a length of 4", function () {
       assert.lengthOf(types, 4);
   });
});

describe("absenceStatuses", function () {
    const data = JSON.stringify(absenceStatuses);
    const statuses = data.split(',');
    it("should have a length of 3", function () {
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