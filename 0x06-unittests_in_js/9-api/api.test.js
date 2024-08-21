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
    if (serverInstance) {
      serverInstance.close(done); // Ensure the server is properly closed
    } else {
      done(); // If serverInstance is not defined, just call done
    }
  });

  it('should return status code 200 for index', (done) => {
    request.get('http://localhost:7865', (error, response) => {
      if (error) return done(error);
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should return the correct result for index', (done) => {
    request.get('http://localhost:7865', (error, response, body) => {
      if (error) return done(error);
      expect(body).to.equal('Welcome to the payment system');
      done();
    });
  });
});

describe('Cart page', () => {
  it('should return status code 200 when :id is a number', (done) => {
    request.get('http://localhost:7865/cart/12', (error, response) => {
      if (error) return done(error);
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('should return status code 404 when :id is NOT a number', (done) => {
    request.get('http://localhost:7865/cart/hello', (error, response) => {
      if (error) return done(error);
      expect(response.statusCode).to.equal(404);
      done();
    });
  });

  it('should return the correct result when :id is a number', (done) => {
    request.get('http://localhost:7865/cart/45', (error, response, body) => {
      if (error) return done(error);
      expect(body).to.equal('Payment methods for cart 45');
      done();
    });
  });

  it('should return the correct result when :id is NOT a number', (done) => {
    request.get('http://localhost:7865/cart/hello', (error, response, body) => {
      if (error) return done(error);
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
});
