'use strict'

const User = use('App/Models/User')

const AuthorizationService = use('App/Services/AuthorizationService')

class UserController {
  async index () {
    return await User.all()
  }

  async getAuth ({ auth }) {
    const user = await auth.getUser()
    return user
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
    const { email, password, password_confirmation } = request.all()

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

  // Sin Validación, ni devolviendo USER
  // -----------------------------------------------------------
  // async login ({ request, auth }) {
  //   const { email, password } = request.all()

  //   const token = await auth.attempt(email, password)
  //   return token
  // }

  // CON Validación y devolviendo USER
  // -----------------------------------------------------------
  async login ({ request, auth, response }) {
    const { email, password } = request.all()

    try {
      const token = await auth.attempt(email, password)
      const user = await User.findBy('email', email)
      return { token, user }

    } catch (error) {
      // if (error.code === 'E_USER_NOT_FOUND') {
      //   // return response.status(401).send('Cannot find user with provided email')
      //   return response.status(401).send({ error: [ { 'message': 'Cannot find user with provided email' } ] })
      // }

      // else if (error.code === 'E_PASSWORD_MISMATCH') {
      //   // return response.status(401).send('Invalid user password')
      //   return response.status(401).send({ error: [ { 'message': 'Invalid user password' } ] })
      // }

      // else {
      //   throw new Error()
      // }

      AuthorizationService.verifyAuthData(response, error)
    }
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
