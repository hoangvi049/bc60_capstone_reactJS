import React from "react";
import "./style.css";
import eye from "../../images/eye.png";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const phoneReg =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formRegister = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      gender: true,
      phone: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Vui lòng nhập email")
        .email("Email không hợp lệ"),
      name: yup.string().required("Vui lòng nhập tên đăng ký "),

      password: yup
        .string()
        .required("Vui lòng nhập password")
        .min(3, "password cần nhiều hơn 6 kí tự")
        .max(32, "password không được nhiều hơi 32 kí tự"),

      passwordConfirm: yup
        .string()
        .required("Vui lòng nhập lại password")
        .oneOf([yup.ref("password")], "password không trùng khớp"),

      phone: yup.string().matches(phoneReg, "Số điện thoại không hợp lệ"),
    }),

    onSubmit: async (userRegister) => {
      console.log(userRegister);
      try {
        const res = await axios({
          url: "https://shop.cyberlearn.vn/api/Users/signup",
          method: "POST",
          data: userRegister,
        });
        alert("Đăng ký thành công");
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <form className="container" onSubmit={formRegister.handleSubmit}>
      <h1>Register</h1>
      <hr className="line" />
      <div className="row register-form">
        <div className="form-group register-form-group">
          <p>Email</p>
          <input
            className="form-control"
            type="text"
            name="email"
            id="email"
            placeholder="email"
            onChange={formRegister.handleChange}
            onBlur={formRegister.handleBlur}
          />
          {formRegister.errors.email && (
            <p className="text text-danger">{formRegister.errors.email}</p>
          )}
        </div>
        <div className="form-group register-form-group">
          <p>Name</p>
          <input
            className="form-control"
            type="text"
            name="name"
            id="name"
            placeholder="name"
            onChange={formRegister.handleChange}
            onBlur={formRegister.handleBlur}
          />
          {formRegister.errors.name && (
            <p className="text text-danger">{formRegister.errors.name}</p>
          )}
        </div>
        <div className="form-group register-form-group">
          <p>Password</p>
          <div className="password-form">
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={formRegister.handleChange}
              onBlur={formRegister.handleBlur}
            />
            <span className="password-icon">
              <img src={eye} alt="..." />
            </span>
          </div>
          {formRegister.errors.password && (
            <p className="text text-danger">{formRegister.errors.password}</p>
          )}
        </div>
        <div className="form-group register-form-group">
          <p>Phone</p>
          <input
            className="form-control"
            type="text"
            name="phone"
            id="phone"
            placeholder="phone"
            onChange={formRegister.handleChange}
            onBlur={formRegister.handleBlur}
          />
          {formRegister.errors.phone && (
            <p className="text text-danger">{formRegister.errors.phone}</p>
          )}
        </div>
        <div className="form-group register-form-group">
          <p>Password confirm</p>
          <input
            className="form-control"
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            placeholder="password confirm"
            onChange={formRegister.handleChange}
            onBlur={formRegister.handleBlur}
          />
          {formRegister.errors.passwordConfirm && (
            <p className="text text-danger">
              {formRegister.errors.passwordConfirm}
            </p>
          )}
        </div>
        <div className="form-group register-form-group">
          <div className="form-gender pt-3">
            <p>Gender</p>
            <div className="input-radio">
              <input
                type="radio"
                name="gender"
                value={true}
                onChange={formRegister.handleChange}
                onBlur={formRegister.handleBlur}
              />
              <br />
              <label>Male</label>
            </div>
            <div className="input-radio">
              <input
                type="radio"
                name="gender"
                value={false}
                onChange={formRegister.handleChange}
                onBlur={formRegister.handleBlur}
              />
              <br />
              <label>Female</label>
            </div>
          </div>
        </div>
        <div className="form-group register-form-group"></div>
        <div className="form-group register-form-group register-content">
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
