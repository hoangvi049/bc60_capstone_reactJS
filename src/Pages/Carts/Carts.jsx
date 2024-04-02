import React, { useEffect } from "react";
import "./style.css";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { history } from "../..";
import { clearCart } from "../../redux/reducers/productReducer";
const Carts = () => {
  const dispatch = useDispatch();
  const { cartProduct } = useSelector((state) => state.productReducer);

  const cloneOrder = { orderDetail: [], email: "" };
  // cloneOrder.orderDetail = [...cartProduct];
  cloneOrder.email = JSON.parse(localStorage.getItem("user_login")).email;

  for (let i = 0; i < cartProduct.length; i++) {
    const product = {
      productId: cartProduct[i].id,
      quantity: cartProduct[i].quantity,
    };
    cloneOrder.orderDetail.push(product);
  }
  const postOrder = async () => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Users/order",
        method: "POST",
        data: cloneOrder,
      });
      alert("Mua thành công");
      console.log(cloneOrder);
      const action = clearCart();
      dispatch(action);
      history.push("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, []);
  return (
    <div className="container mt-5">
      <h2>Carts</h2>
      <hr className="mb-5" />

      <div className="carts-content">
        <table className="table">
          <thead>
            <tr>
              <td>id</td>
              <td>img</td>
              <td>name</td>
              <td>price</td>
              <td>quantity</td>
              <td>total</td>
              <td>action</td>
            </tr>
          </thead>
          <tbody>
            {cartProduct.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td className="td-img">
                    <img src={item.image} alt=".." />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}$</td>
                  <td>
                    {" "}
                    <button className="btn btn-success">+</button>
                    <span className="quantity me-2"> {item.quantity}</span>
                    <button className="btn btn-success">-</button>
                  </td>
                  <td>{item.quantity * item.price}$</td>
                  <td>
                    <button className="btn btn-danger">
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="button-buy">
          <button
            className="btn btn-warning text-white"
            onClick={() => postOrder()}
          >
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carts;
