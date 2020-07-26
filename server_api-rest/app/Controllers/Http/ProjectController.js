'use strict'

const Project = use('App/Models/Project')

const AuthorizationService = use('App/Services/AuthorizationService')

class ProjectController {
  async index ({ auth, response }) {
    try {
      const user = await auth.getUser()
      // Pruebas...
      ////console.log('Usuario autenticado:', user)
      ////return {
      ////    message: 'Aloha desde Project.index ...'
      ////}

      return user.projects().fetch()
    } catch (error) {
      response.send('Missing or invalid jwt token :: ProjectController.index')
    }
  }

  async store ({ request, auth }) {
    const user = await auth.getUser()
    const { name } = request.all()

    const project = new Project()
    project.fill({
      name,
    })
    await user.projects().save(project)

    return project
  }

  async destroy ({ auth, params }) {
    const user = await auth.getUser()
    const { id } = params

    const project = await Project.find(id)

    // Controlando desde un servicio o helper
    // ----------------------------------------------------
    AuthorizationService.verifyPermission(project, user)

    await project.delete()

    console.log(`Se eliminó el proyecto [${project.id}]:`, project.name)
    return project
  }

  async update ({ auth, params, request }) {
    const user = await auth.getUser()
    const { id } = params

    const project = await Project.find(id)
    AuthorizationService.verifyPermission(project, user)

    project.merge(request.only('name'))
    await project.save()

    console.log(`Se actualizó el proyecto [${project.id}]:`, project.name)
    return project
  }
}

module.exports = ProjectController