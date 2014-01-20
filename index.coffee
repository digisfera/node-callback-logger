_ = require('lodash')
clc = require('cli-color')

module.exports = (successColor = 'green', errorColor = 'red', logFunction = console.log, traceFunction = console.trace) ->
  logGen = (customSuccessMessage, customErrorMessage) ->
    (err, res) ->

      templateData = { err: err, res: res }

      message =
        if err
          if customErrorMessage then _.template(customErrorMessage, templateData)
          else "Error"
        else 
          if customSuccessMessage then _.template(customSuccessMessage, templateData)
          else "Success"

      if err
        logFunction(clc.red(message))
        traceFunction(err)
      else
        logFunction(clc.green(message))

  logGen.success = (msg) -> logGen(msg)(null)
  logGen.error = (msg) -> logGen(null, msg)(true)
  
  logGen