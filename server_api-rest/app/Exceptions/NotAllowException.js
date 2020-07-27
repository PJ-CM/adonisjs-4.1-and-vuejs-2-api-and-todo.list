'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class NotAllowException extends LogicalException {
  constructor (message) {
    //// console.log(message)
    super(message)
  }

  /**
   * Handle this exception by itself
   */
  handle (error, { response }) {
    //// console.log('¿Qué pasó...?')
    //// console.log('Desde el HANDLE:', error.message)
    if (error) {
      return response.status(403).json({
        error: error.message
      })
    }
  }
}

module.exports = NotAllowException
