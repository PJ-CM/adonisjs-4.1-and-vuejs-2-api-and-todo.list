'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class AccountNotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  // handle () {}
  handle (error, { response }) {
    if (error) {
      // console.log('ERROR desde AccountNotFoundException:', error)
      // Se obtiene el mismo esultado empleando SEND o JSON
      return response.status(401).send({
        error: [ { 'message': 'Los CREDENCIALES facilitados no pertenecen a una cuenta registrada.' } ]
      })
    }
  }
}

module.exports = AccountNotFoundException
