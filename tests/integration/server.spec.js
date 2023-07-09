// Imports the index.js file to be tested.
const server = require('../../index'); 
// Importing libraries

// Chai HTTP provides an interface for live integration testing of the API's.
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
const {assert, expect} = chai;

describe('Server!', () => {
  // Sample test case given to test / endpoint.
  it('Returns the default welcome message', done => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.type).to.equal('text/html');
        expect(res.text).to.include('Minions Scrambling Club');
        done();
      });
  });

  // ===========================================================================
  // TO-DO: Part A Login unit test case
});