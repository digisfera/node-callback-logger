# callback-logger

Log callback results


## Installation

    npm install callback-logger

## Usage


### CallbackLogger(options)

Supported options:

* `successColor` - (default: 'green') Color for success messages. See [cli-color](https://github.com/medikoo/cli-color) for a list of supported colors
* `errorColor` - (default: 'red') Color for error messages
* `logFunction` - (default: `console.log`) Function to call to log a message. It should be of the form `function(message)`
* `traceErrors` - (default: `true`) When an error occurs, append the error stack to the message


### logger.success(message)

Log a message as a success


### logger.error(message, err)

Log a message as an error. If `err` is passed and `options.traceErrors` is true, the stack trace will also be logged.


### logger.cb(successMessage, errorMessage)

Return a function which logs the result of a callback of type `(err, success)`. If `err` is defined, `errorMessage` is used, otherwise `successMessage` is used.

Underscore templating may be used on `successMessage` and `errorMessage`. The variables `err` and `res` contain the result of the callback



## Example

    var logger = require('callback-logger')();

    fs.writeFile('file.txt', 'contents', logger.cb('Successfully wrote file', 'Error while writing file'));

    glob('*.txt', logger.cb('Found <%= res.length %> files', 'Error on glob'));

    logger.success('Done something');
    logger.error('Something went wrong');