// Imports the index.js file to be tested.
const server = require('../../index');

// Importing libraries
// TODO: Figure out why I don't need to require the mocha library to use
// 'describe' and 'it'.

// Chai HTTP provides an interface for live integration testing of the API's.
const chai = require('chai');
const chaiHttp = require('chai-http');
const generateNewRandom = require('../testUtils');
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;


describe('SMSC Server', () => {
    it('Returns the default welcome message', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.type).to.equal('text/html');
                expect(res.text).to.include('Minions Scrambling Club');
                done();
            });
    });

    it('Creates new Rocks', (done) => {
        const randomRockName = `Rock ${generateNewRandom()}`; 
        chai.request(server)
            .post('/rock')
            .send({ name: randomRockName, gps_coordinates: '123.3467, 44.9989' })
            .end((err, res) => {
                console.log('Id returned is:', res.body.id);
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('id');
                expect(res.body.id).to.not.be.an('integer');
                done();
            });
    });
});
