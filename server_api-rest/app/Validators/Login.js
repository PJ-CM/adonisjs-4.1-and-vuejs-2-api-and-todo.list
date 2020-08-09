'use strict'

class Login {
  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  get messages() {
    return {
      'email.required': 'El campo EMAIL es requerido.',
      'email.email': 'El EMAIL suministrado no es válido.',
      'password.required': 'El campo PASSWORD es requerido.'
    };
  }

  async fails(errorMessages) {
    // -> Enviando todo el Array de ERROR (mensaje, campo implicado,regla de validación)
    // return this.ctx.response.json({ error: errorMessages });
    // -> Enviando, solamente, el mensaje de error
    // return this.ctx.response.json({ error: errorMessages[0].message });
    // -> Enviando, solamente, el mensaje de error a la vez que se establece un Error HTTP
    return this.ctx.response.status(401).json({ error: errorMessages });
    // Es lo mismo emplear ".json()" o ".send()", los dos dan el mismo resultado
    // return this.ctx.response.status(401).json({ error: errorMessages[0].message });
  }
}

module.exports = Login
