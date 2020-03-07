import Axios from "axios";

const instance = Axios.create({
  baseURL: "/api",
  timeout: 10000
});

// instance.interceptors.request.use(config => {
//   const token = window.localStorage.getItem("token");
//   if (token && config.url !== "/login") {
//     config.headers["Authorization"] = "Bearer " + token;
//   }
//   return config;
// });
instance.interceptors.response.use(
  res => {
    debugger;
    return Promise.resolve(res.data);
  },
  err => {
    debugger;
    return Promise.reject(err);
  }
);

export default instance;
