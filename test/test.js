// Import the dependencies for testing
// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../ssoc';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../ssoc');

// Configure chai
chai.use(chaiHttp);
chai.should();

// Tests
describe('SSOC', () => {
  describe('GET /', () => {
    // Test to get landing page
    it('should get landing page', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
