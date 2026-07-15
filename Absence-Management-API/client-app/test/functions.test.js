import { equal } from "node:assert";
import { assert, expect } from "chai";
import { formatName } from "../src/functions.js";
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