var _ = require('lodash'),
    clc = require('cli-color');

module.exports = function(options) {

  options = options || {};
  options.successColor = options.successColor || 'green';
  options.errorColor = options.errorColor || 'red';
  options.logFunction = typeof options.traceFunction === 'undefined' ? console.log : (options.logFunction || function() {});
  options.traceErrors = typeof options.traceErrors === 'undefined' ? true : options.traceErrors;

  function ringBell() {
    options.logFunction("\007");
  }

  function logSuccess(msg) {
    options.logFunction(clc[options.successColor](msg));
  }

  function logError(msg, err) {

    if(err && options.traceErrors) {
      msg += "\n"
      if(err.stack) { msg += err.stack; }
      else { msg += err; }
    }

    ringBell();
    options.logFunction(clc[options.errorColor](msg));
  }


  function logCallback(successMessage, errorMessage, callback) {
    callback = callback || function(){};

    return function(err, res) {

      var templateData = { err: err, res: res }

      var msg = err ?
                  _.template(errorMessage || "Error", templateData) :
                  _.template(successMessage || "Success", templateData);


      if(err) { logError(msg, err); }
      else { logSuccess(msg); }

      callback(err, res);
    }
  }

  return {
    cb: logCallback,
    success: logSuccess,
    error: logError
  }

}
