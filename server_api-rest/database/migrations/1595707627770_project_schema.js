'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      // // La línea ANTERIOR, añadiendo el borrado en cascada, equivale a lo que sigue...
      // table.integer('user_id').unsigned()
      // // table.foreign('user_id')
      //   .references('id').inTable('users')
      //   // .onDelete('CASCADE')
      //   .onDelete('SET NULL')
      table.timestamps()

      /*
      CONCLUSIONES

      Esta línea que sigue
      table.integer('user_id').unsigned().references('id').inTable('users')
      debería equivaler con esta otra
      table.foreign('user_id').references('id').inTable('users')

      No obstante, cuando se pretende construir la tabla con la segunda opción, salta un ERROR que no es solventado hasta que vuelve a incluirse la primera línea.
      Luego, no se sabe si una y otra se necesitan o es que la segunda no es del todo correcta.
      Puede ser que la columna referenciada, osea, la "user_id" deba estar creada antes de asignarla como clave foránea ( foreign('user_id') ).

      El caso es que, tras las pruebas efectuadas, la función del borrado en CASCADA no ha resultado como se deseaba.
      */
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema
