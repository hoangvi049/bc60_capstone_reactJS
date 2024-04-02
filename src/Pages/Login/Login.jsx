import React from "react";
import "./style.css";
import * as yup from "yup";
import { useFormik } from "formik";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { history } from "../..";
import { useDispatch } from "react-redux";
import { setOrderDetailEmail } from "../../redux/reducers/productReducer";
const Login = () => {
  const dispatch = useDispatch();
  const formLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Vui lòng nhập email")
        .email("Email không hợp lệ"),
      password: yup
        .string()
        .required("Vui lòng nhập password")
        .min(3, "password cần nhiều hơn 3 kí tự")
        .max(32, "password không được nhiều hơi 32 kí tự"),
    }),
    onSubmit: async (userLogin) => {
      try {
        const result = await axios({
          url: `https://shop.cyberlearn.vn/api/Users/signin`,
          method: "POST",
          data: userLogin, //object format giống sever quy định
        });
        console.log(result.data);
        alert("Đăng nhập thành công");
        const token = result.data.content.accessToken;
        const userLoginResult = result.data.content;

        localStorage.setItem("user_login", JSON.stringify(userLoginResult));
        localStorage.setItem("accesstoken", token);

        history.push("/profile");
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <form className="container" onSubmit={formLogin.handleSubmit}>
      <h1>Login</h1>
      <hr className="line"></hr>
      <div className="form container">
        <div className="form-group">
          <p>Email</p>
          <input
            type="text"
            className="form-control"
            name="email"
            id="email"
            onChange={formLogin.handleChange}
            onBlur={formLogin.handleBlur}
          />
          {formLogin.errors.email && (
            <p className="text text-danger">{formLogin.errors.email}</p>
          )}
        </div>
        <div className="form-group">
          <p>Password</p>
          <input
            type="password"
            className="form-control"
            name="password"
            id="password"
            onChange={formLogin.handleChange}
            onBlur={formLogin.handleBlur}
          />
          {formLogin.errors.email && (
            <p className="text text-danger">{formLogin.errors.email}</p>
          )}
        </div>
        <div className="login-content">
          <NavLink to="/register">Register now?</NavLink>
          <button className="btn" type="submit">
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
