import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { history } from "../index";
export const TOKEN = "accesstoken";
export const DOMAIN_BACKEND = "https://shop.cyberlearn.vn";

export const http = axios.create({
  baseURL: DOMAIN_BACKEND,
  timeout: 3000,
});

http.interceptors.request.use(
  (config) => {
    //tất cả các request gửi đi sẽ được chứa trong phần header là token đăng nhập
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${localStorage.getItem(TOKEN)}`,
    };
    return config;
  },
  (err) => {
    // Xử lý thất bại

    return Promise.reject(err);
  }
);
http.interceptors.response.use(
  (res) => {
    //Thành công
    return res;
  },
  (err) => {
    //Xử lý thất bại
    // window.location.href = '/';
    console.log("util", err.response);
    const statusCode = err.response.status;
    if (statusCode === 400) {
      //Chuyển hướng trang về home
      history.push("/");
    } else if (statusCode === 401) {
      //Kiểm tra token hết hạn hay chưa
      //Nếu hết hạn thì gọi api refeshtoken

      const decodedToken = jwtDecode(localStorage.getItem(TOKEN));

      const date = new Date(decodedToken.exp * 1000);
      if (date < Date.now()) {
        //Gọi api refresh token
        console.log("gọi api refresh token");
      }
      //Chuyển hướng về trang login bắt đăng nhập
      alert("Đăng nhập để vào trang này");
      history.push("/login");
    }

    return Promise.reject(err);
  }
);
