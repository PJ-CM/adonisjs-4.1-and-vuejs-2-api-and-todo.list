'use strict'

const Project = use('App/Models/Project')
const Task = use('App/Models/Task')

const AuthorizationService = use('App/Services/AuthorizationService')

class TaskController {
  async index ({ auth, params }) {
    const user = await auth.getUser()
    const { id } = params

    const project = await Project.find(id)
    AuthorizationService.verifyPermission(project, user)

    return project.tasks().fetch()
  }

  async listAll () {
    return await Task.all()
  }

  async store ({ request, auth, params }) {
    const user = await auth.getUser()
    const { description } = request.all()
    const { id } = params

    const project = await Project.find(id)
    AuthorizationService.verifyPermission(project, user)

    const task = new Task()
    task.fill({
      description
    })
    await project.tasks().save(task)

    return task
  }

  async destroy ({ auth, params }) {
    const user = await auth.getUser()
    const { id } = params

    const task = await Task.find(id)
    const project = await task.project().fetch()

    // Controlando desde un servicio o helper
    // ----------------------------------------------------
    AuthorizationService.verifyPermission(project, user)

    await task.delete()

    console.log(`Se eliminó la tarea [${task.id}] del proyecto [${project.id}]:`)
    return task
  }

  async destroyAllFromParent ({ auth, params }) {
    const user = await auth.getUser()
    const { id } = params

    const project = await Project.find(id)
    AuthorizationService.verifyPermission(project, user)

    return project.tasks().delete()
  }

  async update ({ auth, params, request }) {
    const user = await auth.getUser()
    const { id } = params

    const task = await Task.find(id)
    const project = await task.project().fetch()
    AuthorizationService.verifyPermission(project, user)

    task.merge(request.only([
      'description',
      'completed',
    ]))
    await task.save()

    console.log(`Se actualizó la tarea [${task.id}] del proyecto [${project.id}].`)
    return task
  }
}

module.exports = TaskController
