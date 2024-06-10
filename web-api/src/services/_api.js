import axios from 'axios'

import { API_URL, APP_KEY } from 'src/config'

const api = axios.create({ baseURL: API_URL })

// api.interceptors.request.use(async (config) => {
//   try {
//     const data = localStorage.getItem(APP_KEY)
//     if (data) {
//       const { jwt = null } = JSON.parse(localStorage.getItem(APP_KEY))
//       if (jwt) config.headers.Authorization = `Bearer ${jwt}`
//     }
//     return config
//   } catch (error) {
//     return config
//   }
// })

// api.interceptors.response.use(null, async (error) => {
//   if (error && error.response && error.response.status === 403) {
//     localStorage.removeItem(APP_KEY)
//     window.location.reload()
//   }
//   if (error) throw error
// })

export default api
export { api }
