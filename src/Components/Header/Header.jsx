import React, { useState } from "react";
import "./style.css";
import logo from "../../images/logo.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartProduct } = useSelector((state) => state.productReducer);

  const totalCount = cartProduct.reduce((total, product) => {
    return (total += product.quantity);
  }, 0);
  const user_login = localStorage.getItem("user_login");
  const user_login1 = JSON.parse(user_login);
  const renderRegister = () => {
    if (user_login) {
      <NavLink className="nav-link d-none" to="register">
        Register
      </NavLink>;
    } else {
      return (
        <NavLink className="nav-link" to="register">
          Register
        </NavLink>
      );
    }
  };
  const renderLoginLink = () => {
    if (!user_login) {
      return (
        <NavLink className="nav-link" to="login">
          Login
        </NavLink>
      );
    } else {
      return (
        <NavLink className="nav-link" to="profile">
          Hi! {user_login1.email}
        </NavLink>
      );
    }
  };

  return (
    <nav className=" navbar   navbar-expand-sm navbar-dark">
      <NavLink className="navbar-brand" to="/">
        <img src={logo} alt="..." />
      </NavLink>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      />
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="me-auto mt-2 mt-lg-0"></ul>
        <ul className="navbar-nav me-1 mt-2 mt-lg-0">
          <li className="nav-item">
            <NavLink className="nav-link" to="search" aria-current="page">
              <i className="fa fa-search"></i>
              <span>Search</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link " to="carts" aria-current="page">
              <i className="fa fa-cart-plus"></i>
              <span>({totalCount})</span>
            </NavLink>
          </li>
          <li className="nav-item">{renderLoginLink()}</li>
          <li className="nav-item"> {renderRegister()}</li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
