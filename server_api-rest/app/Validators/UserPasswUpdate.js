'use strict'

class UserPasswUpdate {
  get rules () {
    return {
      password: 'required|min:8|confirmed'
    }
  }

  get messages() {
    return {
      'password.required': 'El campo PASSWORD es requerido.',
      'password.min': 'El PASSWORD debe tener un MÍNIMO de 8 caracteres.',
      'password.confirmed': 'El PASSWORD y su CONFIRMACIÓN no coinciden.'
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).json({ error: errorMessages });
  }
}

module.exports = UserPasswUpdate
