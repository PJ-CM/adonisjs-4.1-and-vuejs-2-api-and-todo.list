'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class ForbiddenAccessException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle (error, { response }) {
  //   return response.status(403).json({
  //     error: ':: No está permitido ELIMINAR un proyecto del cuál no se es el DUEÑO ::'
  //   })
  // }
  handle (error, { response }) {
    if (error) {
      return response.status(403).json({
        error: ':: No está permitido ELIMINAR un proyecto del cuál no se es el DUEÑO ::'
      })
    }
  }
}

module.exports = ForbiddenAccessException
