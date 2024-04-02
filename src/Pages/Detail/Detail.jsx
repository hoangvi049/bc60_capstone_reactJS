import React, { useEffect, useState } from "react";
import "./style.css";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../../index";
import {
  getProductDetailApiActionAsync,
  setProductCartsAction,
} from "../../redux/reducers/productReducer";
const Detail = () => {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const { productDetail } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();
  const getProductDetail = async () => {
    const action = getProductDetailApiActionAsync(params.id);
    dispatch(action);
  };

  const handleAddToCart = () => {
    if (!localStorage.getItem("user_login")) {
      alert("Xin đăng nhập trước khi mua hàng");
      history.push("/login");
    } else {
      const cloneProduct = { ...productDetail, quantity };
      const action = setProductCartsAction(cloneProduct);
      dispatch(action);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, [params.id]);
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4 detail-img">
          <img src={productDetail.image} alt="..." />
        </div>
        <div className="col-md-8 detail-content">
          <h3>{productDetail.name}</h3>
          <p>{productDetail.description}</p>
          <h5>Available size</h5>
          <div className="row size-colection">
            {productDetail.size?.map((item, index) => {
              return (
                <div className="col-md-2" key={index}>
                  <button className="btn btn-dark">{item}</button>
                </div>
              );
            })}
          </div>
          <h4 className="detail-price my-2">{productDetail.price}$</h4>
          <div className="detail-quantity row my-2">
            <button
              className="btn col-md-1"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              +
            </button>
            <h4 className="col-md-1">{quantity}</h4>
            <button
              className="btn col-md-1"
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                } else {
                  setQuantity(1);
                }
              }}
            >
              -
            </button>
          </div>
          <button
            className="btn add-btn my-2"
            onClick={() => {
              handleAddToCart();
            }}
          >
            Add to card <i className="fa fa-cart-plus"></i>
          </button>
        </div>
      </div>
      <h1 className=" mt-5 text-center">-Related Products-</h1>

      <div className="releated-prd">
        <div className="row">
          {productDetail.relatedProducts?.map((item) => {
            return (
              <div className="col-md-4 product-item my-4" key={item.id}>
                <div className="card text-left">
                  <img className="card-img-top my-5" src={item.image} />
                  <img
                    className="favorite-icon"
                    src="/images/heart.svg"
                    alt=""
                  />
                  <div className="card-body mt-2">
                    <h4>{item.name}</h4>
                    <p className="card-text">{item.shortDescription}</p>
                  </div>
                  <div className="button-content d-flex">
                    <NavLink
                      to={`/detail/${item.id}`}
                      className="btn col-md-6 px-2"
                    >
                      <h4>Buy now</h4>
                    </NavLink>
                    <div className="price-content cold-md-6 m-auto">
                      <h4>{item.price}$</h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Detail;
