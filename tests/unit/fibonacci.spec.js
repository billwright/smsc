const fibonacci = require("../../modules/fibonacci");
// const assert = require('assert');
const chai = require("chai");
const expect = chai.expect;
const should = chai.should;

describe("fibonacci", () => {
  it("returns 0 for fibonacci(0)", () => {
    // assert(fibonacci(0) === 0);
    expect(fibonacci(0)).to.equal(0);
  });

  it("returns 1 for fibonacci(1)", () => {
    expect(fibonacci(1)).to.equal(1);
  });

  it("returns 46368 for fibonacci(24)", () => {
    expect(fibonacci(24)).to.equal(46368);
  });

  it("throws an error if number is negative", () => {
    expect(() => fibonacci(-1)).to.throw();
  });

  it("throws an error if number is not a number", () => {
    expect(() => fibonacci("hello")).to.throw();
  });

  it("works if number is a string of a number", () => {
    expect(fibonacci("3")).to.equal(2);
  });
});
