import Axios from 'axios'
import { message } from 'antd'

const instance = Axios.create({
  baseURL: '/api',
  timeout: 10000
})

// instance.interceptors.request.use(config => {
//   const token = window.localStorage.getItem("token");
//   if (token && config.url !== "/login") {
//     config.headers["Authorization"] = "Bearer " + token;
//   }
//   return config;
// });
instance.interceptors.response.use(
  res => {
    return Promise.resolve(res.data)
  },
  err => {
    message.error(err.response.data.message)
    return Promise.reject(err)
  }
)

export default instance
