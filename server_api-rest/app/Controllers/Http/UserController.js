'use strict'

const User = use('App/Models/User')

class UserController {
  // Probando...
  // store() {
  //     //Lógica para guardar los datos del nuevo usuario...

  //     return {
  //         'message': 'Se creó un nuevo USUARIO desde el controlador de la API-REST.',
  //     }
  // }

  async store ({ request }) {
    // const { username, email, password } = request.all()

    // const user = User.create({
    //     username,
    //     email,
    //     password,
    // })

    // o, si se deseará establecer el EMAIL como el USERNAME
    // para ahorrarse la captura de ese dato

    const { email, password } = request.all()

    console.log(email, password)

    const user = await User.create({
      email,
      password,
      username: email
    })

    return user
  }
}

module.exports = UserController
