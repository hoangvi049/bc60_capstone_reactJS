import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Menu from "../../Components/Menu/Menu";
import Footer from "../../Components/Footer/Footer";

const HomeTemplate = () => {
  return (
    <div>
      <Header />
      <Menu />
      <div>
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default HomeTemplate;
