import React, { useEffect, useState } from "react";
import "./style.css";
import Carousel from "../../Components/Carousel/Carousel";
import { useDispatch } from "react-redux";
import { http } from "../../util/config";
import { setProductAction } from "../../redux/reducers/productReducer";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [arrProduct, setArrProduct] = useState([]);
  const dispatch = useDispatch();
  console.log(arrProduct);
  const getApiProduct = async () => {
    const res = await http.get("/api/product");
    const action = setProductAction(res.data.content);
    dispatch(action);

    setArrProduct(res.data.content);
  };

  useEffect(() => {
    getApiProduct();
  }, []);
  return (
    <div>
      <Carousel />
      <div className="product">
        <h1>Product Feature</h1>
      </div>
      <div className="container product-list mt-4">
        <div className="row">
          {arrProduct.map((item) => {
            return (
              <div className="col-md-4 product-item my-4" key={item.id}>
                <div className="card text-left">
                  <img className="card-img-top my-5" src={item.image} />
                  <img
                    className="favorite-icon"
                    src="./images/heart.svg"
                    alt=""
                  />
                  <div className="card-body mt-2">
                    <h4>{item.name}</h4>
                    <p className="card-text">{item.shortDescription}t</p>
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

export default Home;
