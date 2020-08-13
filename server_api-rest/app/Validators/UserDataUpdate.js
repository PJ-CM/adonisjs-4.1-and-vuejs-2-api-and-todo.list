'use strict'

class UserDataUpdate {
  get rules () {
    const userId = this.ctx.params.id

    return {
      username: `required|max:80|unique:users,username,id,${userId}`,
      email: `required|email|unique:users,email,id,${userId}`
    }
  }

  get messages() {
    return {
      'username.required': 'El campo USERNAME es requerido.',
      'username.max': 'El USERNAME debe tener un MÁXIMO de 80 caracteres.',
      'username.unique': 'El USERNAME indicado ya es empleado por otro usuario.',
      'email.required': 'El campo EMAIL es requerido.',
      'email.email': 'El EMAIL suministrado no es válido.',
      'email.unique': 'El EMAIL indicado ya es empleado por otro usuario.'
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).json({ error: errorMessages });
  }
}

module.exports = UserDataUpdate
