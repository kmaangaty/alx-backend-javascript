const request = require('request');
const { expect } = require('chai');
const server = require('./api');

describe('Index page', () => {
  let serverInstance;

  before((done) => {
    serverInstance = server;
    done();
  });

  after((done) => {
    if (serverInstance) {
      serverInstance.close(done); // Ensure the server is properly closed
    } else {
      done(); // If serverInstance is not defined, just call done
    }
  });

  it('should return status code 200', (done) => {
    request.get('http://localhost:7865', (error, response) => {
      if (error) return done(error);
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should return the correct result', (done) => {
    request.get('http://localhost:7865', (error, response, body) => {
      if (error) return done(error);
      expect(body).to.equal('Welcome to the payment system');
      done();
    });
  });
});
