const { Given, When, Then } = require('@cucumber/cucumber');

let input = null;
Given('an input number of {int}', function (inputNumber) {
    return input = inputNumber;
});

const pactum = require('pactum');
let spec;
require('dotenv').config();
const BASE_URL = process.env.BASE_URL + '/primeFactors/api?input=';
When('I get the prime factors from the endpoint', function () {
    spec = pactum.spec();
    spec.get(BASE_URL + input);
});

Then('the REST call succeeds', async function () {
    await spec.expectStatus(200);
});

const chai = require('chai');
const expect = chai.expect;
Then(/^the prime factors returned are:$/, async function (factors) {
    const actualList  = spec._response.json.factors;
    const expectedList = factors.raw().flat().map(y => parseInt(y));
    expect(actualList).to.eql(expectedList);
});
