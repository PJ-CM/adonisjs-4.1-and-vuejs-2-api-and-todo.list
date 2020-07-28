import axios from 'axios'
import store from './store'

// export default () => {
//   return axios.create({
//     baseURL: store.state.baseURL,
//     timeout: 1000,
//   })
// }
// Lo ANTERIOR es lo mismo que esto
export default () => axios.create({
  baseURL: store.state.baseURL,
  timeout: 5000,

  // Cabeceras necesarias para poder capturar datos del usuario autenticado
  headers: {
    Authorization: `Bearer ${store.state.authentication.token}`
  }
})
