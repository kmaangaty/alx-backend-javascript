const sinon = require('sinon');
const { expect } = require('chai');
const sendPaymentRequestToApi = require('./5-payment');

describe('sendPaymentRequestToApi', function () {
  let consoleSpy;

  // Hook: before each test, set up the spy
  beforeEach(function () {
    consoleSpy = sinon.spy(console, 'log');
  });

  // Hook: after each test, restore the spy
  afterEach(function () {
    consoleSpy.restore();
  });

  it('should log "The total is: 120" when called with 100 and 20', function () {
    // Call the function
    sendPaymentRequestToApi(100, 20);

    // Check that console.log was called with the correct string
    expect(consoleSpy.calledOnceWithExactly('The total is: 120')).to.be.true;

    // Check that console.log was called only once
    expect(consoleSpy.calledOnce).to.be.true;
  });

  it('should log "The total is: 20" when called with 10 and 10', function () {
    // Call the function
    sendPaymentRequestToApi(10, 10);

    // Check that console.log was called with the correct string
    expect(consoleSpy.calledOnceWithExactly('The total is: 20')).to.be.true;

    // Check that console.log was called only once
    expect(consoleSpy.calledOnce).to.be.true;
  });
});
