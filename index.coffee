_ = require('lodash')
clc = require('cli-color')

module.exports = (successColor = 'green', errorColor = 'red', logFunction = console.log, traceFunction = console.trace) ->
  logCallback = (customSuccessMessage, customErrorMessage) ->
    (err, res) ->

      templateData = { err: err, res: res }

      message =
        if err
          if customErrorMessage then _.template(customErrorMessage, templateData)
          else "Error"
        else 
          if customSuccessMessage then _.template(customSuccessMessage, templateData)
          else "Success"

      if err then logError(msg, err)      
      else logSuccess(msg, res)
        

  logSuccess = (msg, res) ->
    logFunction(clc.green(msg))

  logError = (msg, err) ->
    logFunction(clc.red(message))
    traceFunction(err)
  
  {
    cb: logCallback
    success: logSuccess
    error: logError
  }