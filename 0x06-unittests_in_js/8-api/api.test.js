const request = require('request');
const { expect } = require('chai');
const server = require('./api'); // Import the server instance

describe('Index page', () => {
  let serverInstance;

  before((done) => {
    serverInstance = server;
    done();
  });

  after((done) => {
    serverInstance.close(done); // Ensure the server is properly closed
  });

  it('should return status code 200', (done) => {
    request.get('http://localhost:7865', (error, response) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should return the correct result', (done) => {
    request.get('http://localhost:7865', (error, response, body) => {
      expect(body).to.equal('Welcome to the payment system');
      done();
    });
  });
});
