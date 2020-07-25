'use strict'

const Project = use('App/Models/Project')

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
}

module.exports = ProjectController
