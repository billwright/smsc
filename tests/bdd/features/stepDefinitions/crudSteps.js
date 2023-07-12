const pactum = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
require('dotenv').config();

const BASE_URL = process.env.BASE_URL;

let spec;

Before(function () {
    console.log('In the Before function');
});

After(function () {
    console.log('In the After function');
    // Delete all created objects
    for (let key in createdObjects) {
        for (let i = 0; i < createdObjects[key].length; i++) {
            let id = createdObjects[key][i];
            let path = `${key}/${id}`;
            console.log(`Deleting ${path}...`);
            deleteAtPath(path);
        }
    }
});

function convertToJson(entity) {
    const json = {};
    for (let prop in entity) {
        if (Object.prototype.hasOwnProperty.call(entity, prop)) {
            key = prop.toLowerCase().replace(' ', '_');
            json[key] = populate(entity[prop]);
        }
    }
    return json;
}

let latestRandom;
function generateNewRandom() {
    latestRandom = Math.floor(Math.random() * 10000);
    return latestRandom;
}

createdObjects = {};
function rememberCreatedObject(path, objectId) {
    if (!createdObjects.hasOwnProperty(path)) {
        createdObjects[path] = [];
    }
    createdObjects[path].push(objectId);
    console.log('Created objects are:', createdObjects);
}

function populate(value) {
    return value.replace('<random>', generateNewRandom());
}

Given(/^the server is running$/, async function () {
    await pactum.spec().get(BASE_URL).expectStatus(200);
});

When(
    /^I (post|put) the following data to the endpoint "(.*)":$/,
    function (action, endpoint, dataTable) {
        entities = dataTable.hashes();
        firstEntity = entities[0];

        spec = pactum.spec();
        spec.withJson(convertToJson(firstEntity));
        const fullURL = BASE_URL + endpoint;
        console.log('The full URL:', fullURL);
        spec[action](fullURL);
    }
);

// https://github.com/pactumjs/pactum/discussions/76
async function deleteAtPath(path) {
    await pactum.spec()
    .delete(BASE_URL + path)
    .expectStatus(200);
}

When(/^I delete the object at url "(.*)"$/, deleteAtPath);

Then(/^the (post|put) succeeds$/, async function (action) {
    await spec.toss();
    spec.response().should.have.status(201);
    // https://github.com/pactumjs/pactum/discussions/81
    rememberCreatedObject(spec._response.req.path, spec._response.json.id);
});
