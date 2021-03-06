'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// -------------------------------------------------------------------------------

// Probando...

// Route.get('/', () => {
//   return { greeting: 'Hello world in JSON' }
// })

// Route.post('api/users/register', () => {
//     return { message: 'Se registró un nuevo USARIO en la API-REST' }
// })

// -------------------------------------------------------------------------------

Route.group(() => {
  Route.post('register', 'UserController.store')
    .validator(['Register'])
  // Route.post('register-and-authenticate', 'UserController.storeAndLogin')
  Route.post('login', 'UserController.login')
    .validator(['Login'])

  Route.get('', 'UserController.index').middleware('auth')
  Route.get('auth', 'UserController.getAuth').middleware('auth')
  Route.delete('delete/:id', 'UserController.destroy').middleware('auth')
  Route.patch('update/:id', 'UserController.update').middleware('auth')
    .validator(['UserDataUpdate'])
  Route.patch('update-passw/:id', 'UserController.updatePassw').middleware('auth')
    .validator(['UserPasswUpdate'])

  Route.patch('projects/change-owner', 'ProjectController.changeOwnerToGenericUser').middleware('auth')

  Route.delete('projects/delete', 'ProjectController.destroyAllFromParent').middleware('auth')
  Route.delete('tasks/delete', 'TaskController.destroyAllFromGrandParent').middleware('auth')
}).prefix('api/users/')

Route.group(() => {
  Route.get('', 'ProjectController.index')
  Route.get('list-all', 'ProjectController.listAll')
  Route.post('store', 'ProjectController.store')
    .validator(['ProjectStore'])
  Route.delete('delete/:id', 'ProjectController.destroy')
  // Route.delete('delete-all-from', 'ProjectController.destroyAllFromParent')
  Route.patch('update/:id', 'ProjectController.update')
    .validator(['ProjectUpdate'])

  Route.get(':id/tasks', 'TaskController.index')
  Route.post(':id/tasks/store', 'TaskController.store')
    .validator(['TaskStore'])
  Route.delete(':id/tasks/delete', 'TaskController.destroyAllFromParent')
}).prefix('api/projects/')
  .middleware('auth')

Route.group(() => {
  Route.get('list-all', 'TaskController.listAll')
  Route.get('list-auth', 'TaskController.listAuth')
  Route.delete('delete/:id', 'TaskController.destroy')
  Route.patch('update/:id', 'TaskController.update')
    .validator(['TaskUpdate'])
}).prefix('api/tasks/').middleware('auth')
