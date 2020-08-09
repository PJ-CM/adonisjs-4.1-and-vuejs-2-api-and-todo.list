'use strict'

class ProjectUpdate {
  get rules () {
    return {
      name: 'required|max:80'
    }
  }

  get messages() {
    return {
      'name.required': 'El campo NOMBRE es requerido.',
      'name.max': 'El NOMBRE debe tener un MÁXIMO de 80 caracteres.'
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).json({ error: errorMessages });
  }
}

module.exports = ProjectUpdate
