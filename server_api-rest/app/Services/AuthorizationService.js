'use strict'

const ForbiddenAccessException = use('App/Exceptions/ForbiddenAccessException')
const NotFoundResourceException = use('App/Exceptions/NotFoundResourceException')
const NotAllowException = use('App/Exceptions/NotAllowException')

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
    console.log(id, user.id)
    if (id !== user.id) {
      console.log('Antes de lanzar la EXCEPTION:', id, user.id)
      throw new NotAllowException(msgError)
    }
  }
}

// De no exportar la clase, podría salir este mensaje de ERROR a la hora de llamar
// a un método de esta clase:
//      AuthorizationService.verifyPermission is not a function
module.exports = new AuthorizationService()
