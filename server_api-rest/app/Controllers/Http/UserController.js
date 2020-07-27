'use strict'

const User = use('App/Models/User')

const AuthorizationService = use('App/Services/AuthorizationService')

class UserController {
  async index () {
    return User.all()
  }

  // -> Probando...
  // store() {
  //     //Lógica para guardar los datos del nuevo usuario...

  //     return {
  //         'message': 'Se creó un nuevo USUARIO desde el controlador de la API-REST.',
  //     }
  // }

  // -> SIN Autenticación Automática...
  // async store ({ request }) {
  //   // const { username, email, password } = request.all()

  //   // const user = User.create({
  //   //     username,
  //   //     email,
  //   //     password,
  //   // })

  //   // o, si se deseará establecer el EMAIL como el USERNAME
  //   // para ahorrarse la captura de ese dato

  //   const { email, password } = request.all()

  //   console.log(email, password)

  //   const user = await User.create({
  //     email,
  //     password,
  //     username: email
  //   })

  //   return user
  // }

  // -> CON Autenticación Automática...
  async store ({ request }) {
    const { email, password } = request.all()

    console.log(email, password)

    // const user = await User.create({
    //   email,
    //   password,
    //   username: email
    // })
    await User.create({
      email,
      password,
      username: email
    })

    return this.login(...arguments)
  }

  async login ({ request, auth }) {
    const { email, password } = request.all()

    const token = await auth.attempt(email, password)
    return token
  }

  async destroy ({ auth, params }) {
    const user = await auth.getUser()
    const { id } = params

    // Controlando desde un servicio o helper
    // ----------------------------------------------------
    const messageError = ':: No tiene permitido eliminar esta cuenta ::'
    // Cuando se recibe el parámetro, el dato es de tipo String, por ello,
    // para que sea considerado como Number, hay que pasarlo a ese tipo de dato
    AuthorizationService.verifyIfAllow(Number(id), user, messageError)

    await user.delete()

    console.log(`Se eliminó el usuario [${user.id}]:`, user.username)
    return user
  }
}

module.exports = UserController
