'use strict'

class TaskUpdate {
  get rules () {
    return {
      description: 'required|max:255'
    }
  }

  get messages() {
    return {
      'description.required': 'El campo DESCRIPCIÓN es requerido.',
      'description.max': 'El DESCRIPCIÓN debe tener un MÁXIMO de 255 caracteres.'
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).json({ error: errorMessages });
  }
}

module.exports = TaskUpdate
