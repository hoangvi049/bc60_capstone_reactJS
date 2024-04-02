import React, { useEffect, useState } from "react";
import banner from "../../images/banner.png";
import "./style.css";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
import { http } from "../../util/config";

const Profile = () => {
  const [userProf, setUserProf] = useState({});
  console.log(userProf);
  const getUserProf = async () => {
    try {
      const result = await http.post("/api/Users/getProfile");
      console.log(result.data.content);
      setUserProf(result.data.content);
    } catch (err) {
      console.log(err);
    }
  };
  const phoneReg =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formInfo = useFormik({
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

      phone: yup.string().matches(phoneReg, "Số điện thoại không hợp lệ"),
    }),

    onSubmit: async (userInfo) => {
      try {
        const result = await axios({
          url: "https://shop.cyberlearn.vn/api/Users/updateProfile",
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
          data: userInfo,
        });
        alert("update thành công");
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    getUserProf();
  }, []);

  return (
    <div className="profile mt-5 container">
      <div className="container">
        <h1 className="">Profile</h1>
        <div className="row mt-2">
          <div className="col-3">
            <img src={userProf.avatar} alt="..." width={200} />
          </div>
          <div className="col-9">
            <form className="row">
              <div className="col-6">
                <div className="form-group">
                  <p>Email</p>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    placeholder={userProf.email}
                    name="email"
                    id="email"
                    onChange={formInfo.handleChange}
                    onBlur={formInfo.handleBlur}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p>Name</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={userProf.name}
                    name="name"
                    id="name"
                    onChange={formInfo.handleChange}
                    onBlur={formInfo.handleBlur}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p>Phone</p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={userProf.phone}
                    name="phone"
                    id="phone"
                    onChange={formInfo.handleChange}
                    onBlur={formInfo.handleBlur}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <p>Password</p>
                  <input
                    type="password"
                    className="form-control"
                    placeholder={userProf.password}
                    name="password"
                    id="password"
                    onChange={formInfo.handleChange}
                    onBlur={formInfo.handleBlur}
                  />
                </div>
              </div>
              <div className="col-6 "></div>
              <div className="col-6 pt-5">
                <div className="form-group">
                  <button type="submit" className="btn">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr />
      <div className="order-history mt-5">
        <h3>Order History</h3>
        <div className="order-content mt-5">
          {userProf.ordersHistory?.map((detail) => {
            return (
              <>
                <p key={detail.id}>
                  {" "}
                  + Orders have been placed on {detail.date}
                </p>
                <table key={detail.id} className="table">
                  <thead>
                    <tr>
                      <td>id</td>
                      <td>img</td>
                      <td>name</td>
                      <td>price</td>
                      <td>quantity</td>
                      <td>total</td>
                    </tr>
                  </thead>
                  <tbody>
                    {detail.orderDetail?.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td className="td-img">
                            <img src={item.image} alt=".." />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price * item.quantity}$</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
