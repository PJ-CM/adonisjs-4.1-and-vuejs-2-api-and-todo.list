'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class NotFoundResourceException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // Así NO lo permite el StandardJS-ESLint
  // -----------------------------------------------------
  // handle (error, { response }) {
  // return response.status(404).json({
  //   error: ':: El RECURSO demandado no existe ::'
  // })
  // }
  // Así SI
  // -----------------------------------------------------
  handle (error, { response }) {
    if (error) {
      return response.status(404).json({
        error: ':: El RECURSO demandado no existe ::'
      })
    }
  }
}

module.exports = NotFoundResourceException
