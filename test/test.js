expect = require('chai').expect

describe('callback-logger', function() {
  it('overrides the log function');
  it('returns function which receives callback');
  it('calls log function with success color');
  it('calls log function with error color');
  it('prints an error message on callback error');
  it('prints a success message on callback success');
  it('uses underscore templating');
});