import axios from "axios";
import { headerPath, dataSetKey } from "@/utils/utils.js";

axios.defaults.timeout = 60000;
axios.defaults.baseURL = process.env.VUE_APP_API;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = headerPath.Authorization;

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    if (config.method === "post") {
      config.data = JSON.stringify(config.data);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器即异常处理
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    console.log(err);
    if (err && err.response) {
      switch (err.response.status) {
        case 1001:
          console.log("当前页格式有误");
          break;
        case 500:
          console.log("操作失败");
          break;
        case 404:
          console.log("请求的资源不存在");
          break;
        case 401:
          console.log("连接错误");
          break;
        default:
          console.log(`连接错误${err.response.status}`);
      }
    } else {
      console.log("连接到服务器失败");
    }
    return Promise.reject(err);
  }
);



export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function post(url, data = {}, isSetKey = true) {
  return new Promise((resolve, reject) => {
    if (Object.keys(data).length > 0 && isSetKey) {
      data = dataSetKey(data);
    }
    axios.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
