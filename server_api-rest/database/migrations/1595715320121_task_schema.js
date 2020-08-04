'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TaskSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()
      table.string('description', 255).notNullable()
      table.integer('project_id').unsigned().references('id').inTable('projects')
      // La línea ANTERIOR equivale a la que sigue
      // // table.foreign('project_id').references('id').inTable('projects')
      // Y para establecer el borrado en cascada...
      // table.foreign('project_id')
      //   .references('id').inTable('projects')
      //   .onDelete('CASCADE')
      table.boolean('completed').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TaskSchema
