'use strict'

class Register {
  get rules () {
    return {
      email: 'required|email|unique:users,email',
      password: 'required|min:8|confirmed'
    }
  }

  get messages() {
    return {
      'email.required': 'El campo EMAIL es requerido.',
      'email.email': 'El EMAIL suministrado no es válido.',
      'email.unique': 'El EMAIL indicado ya es empleado por otro usuario.',
      'password.required': 'El campo PASSWORD es requerido.',
      'password.min': 'El PASSWORD debe tener un MÍNIMO de 8 caracteres.',
      'password.confirmed': 'El PASSWORD y su CONFIRMACIÓN no coinciden.'
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).json({ error: errorMessages });
  }
}

module.exports = Register
