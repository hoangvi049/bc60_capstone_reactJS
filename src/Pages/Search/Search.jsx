import React, { useEffect, useRef } from "react";
import banner from "../../images/banner.png";
import "./style.css";
import { NavLink, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getProductByKeyword } from "../../redux/reducers/productReducer";

const Search = () => {
  const tuKhoaRef = useRef("");
  const [searchParam, setSearchParam] = useSearchParams({
    tuKhoa: "",
  });

  const { arrProductSearch } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  const tuKhoa = searchParam.get("tuKhoa");

  console.log(arrProductSearch);

  const getApiProduct = async (keyword) => {
    const action = getProductByKeyword(keyword);
    dispatch(action);
  };

  useEffect(() => {
    getApiProduct(tuKhoa);
  }, [tuKhoa]);

  const handleChange = (event) => {
    tuKhoaRef.current = event.target.value;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParam({
      tuKhoa: tuKhoaRef.current,
    });
  };
  return (
    <div className="container mt-5">
      <form className="" onSubmit={handleSubmit}>
        <h4>Search</h4>
        <div className="form-search ">
          <input
            type="text"
            className="form-control"
            id="tuKhoa"
            name="tuKhoa"
            onChange={handleChange}
          />
          <button className="btn" type="submit">
            Search
          </button>
        </div>
      </form>
      <div className="result-search mt-5 ">
        <h1>Search Result</h1>
        <div className="row">
          {arrProductSearch.map((product) => {
            return (
              <div className="col-md-4 product-item my-4" key={product.id}>
                <div className="card text-left">
                  <img className="card-img-top my-5" src={product.image} />
                  <img
                    className="favorite-icon"
                    src="./images/heart.svg"
                    alt=""
                  />
                  <div className="card-body mt-2">
                    <h4>{product.name}</h4>
                    <p className="card-text">{product.shortDescription}</p>
                  </div>
                  <div className="button-content d-flex">
                    <NavLink
                      to={`/detail/${product.id}`}
                      className="btn col-md-6 px-2"
                    >
                      <h4>Buy now</h4>
                    </NavLink>
                    <div className="price-content cold-md-6 m-auto">
                      <h4>{product.price}$</h4>
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

export default Search;
