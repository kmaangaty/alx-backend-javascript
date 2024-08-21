const { expect } = require('chai');
const getPaymentTokenFromAPI = require('./6-payment_token');

describe('getPaymentTokenFromAPI', function () {
  it('should resolve with a successful response when success is true', function (done) {
    getPaymentTokenFromAPI(true)
      .then((response) => {
        expect(response).to.include({ data: 'Successful response from the API' });
        done(); // Indicate the test is complete
      })
      .catch((err) => done(err)); // Handle potential errors
  });

  it('should do nothing when success is false', function (done) {
    const result = getPaymentTokenFromAPI(false);
    expect(result).to.be.undefined;
    done(); // Indicate the test is complete
  });
});
