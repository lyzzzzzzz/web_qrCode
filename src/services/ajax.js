import axios from "axios";

axios.defaults.baseURL = "http://172.16.234.167:8080/qrcode/app";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.timeout = 10000


export let isAuthenticated = true

//请求添加token
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['bearerToken'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
})

//返回值解构
axios.interceptors.response.use(response => {
  let data = response.data;
  if (data.code === 200) {
    isAuthenticated = true
    return Promise.resolve({
      data: data.data,
      msg: data.msg,
      code: data.code,
    });
  }
  if (data.code === 40009&&data.code ===40010) {
    this.$message(data.msg)
    isAuthenticated = false
  }
  return Promise.reject(
    data.msg ||
    "网络错误"
  );
}, err => {
  console.log("http err:", err);
  let isCancel = axios.isCancel(err);
  if (isCancel) {
    return new Promise(() => { });
  }
  return Promise.reject(
    err.response.data &&
    err.response.data.msg ||
    "网络错误"
  );
})

export function post(url, data, otherConfig) {
  return axios.post(url, data, otherConfig);
}

export function get(url, data, otherConfig) {
  return axios.get(url, { params: data, ...otherConfig });
}
