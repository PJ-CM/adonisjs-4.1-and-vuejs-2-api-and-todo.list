'use strict'

const ForbiddenAccessException = use('App/Exceptions/ForbiddenAccessException')
const NotFoundResourceException = use('App/Exceptions/NotFoundResourceException')

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
}

// De no exportar la clase, podría salir este mensaje de ERROR a la hora de llamar
// a un método de esta clase:
//      AuthorizationService.verifyPermission is not a function
module.exports = new AuthorizationService()
