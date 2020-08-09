'use strict'

const ForbiddenAccessException = use('App/Exceptions/ForbiddenAccessException')
const NotFoundResourceException = use('App/Exceptions/NotFoundResourceException')
const NotAllowException = use('App/Exceptions/NotAllowException')
const AccountNotFoundException = use('App/Exceptions/AccountNotFoundException')

class AuthorizationService {
  verifyPermission (resource, user) {
    if (!resource) {
      throw new NotFoundResourceException()
    }

    if (resource.user_id !== user.id) {
      // Lanzando una Excepción GENERAL
      // --------------------------------------------
      /// /throw new Error()

      // Lanzando una Excepción PERSONALIZADA
      // --------------------------------------------
      throw new ForbiddenAccessException()
    }
  }

  verifyIfAllow (id, user, msgError) {
    // console.log(id, user.id)
    if (id !== user.id) {
      // console.log('Antes de lanzar la EXCEPTION:', id, user.id)
      throw new NotAllowException(msgError)
    }
  }

  verifyAuthData (response, error) {
    // Registrando el ERROR de Excepción de forma detallada...
    // ----------------------------------------------------------------------------------
    // if (error.code === 'E_USER_NOT_FOUND') {
    //   // return response.status(401).send('Cannot find user with provided email')
    //   // return response.status(401).send({ error: [ { 'message': 'Cannot find user with provided email' } ] })
    //   throw new AccountNotFoundException()
    // }

    // else if (error.code === 'E_PASSWORD_MISMATCH') {
    //   // return response.status(401).send('Invalid user password')
    //   return response.status(401).send({ error: [ { 'message': 'Invalid user password' } ] })
    // }

    // Registrando el ERROR de Excepción de forma más general...
    // ----------------------------------------------------------------------------------
    if ( (error.code === 'E_USER_NOT_FOUND') || (error.code === 'E_PASSWORD_MISMATCH') ) {
      throw new AccountNotFoundException()
    }

    else {
      throw new Error()
    }
  }
}

// De no exportar la clase, podría salir este mensaje de ERROR a la hora de llamar
// a un método de esta clase:
//      AuthorizationService.verifyPermission is not a function
module.exports = new AuthorizationService()
