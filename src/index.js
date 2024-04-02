import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./Pages/Home/Home";
import Search from "./Pages/Search/Search";
import Detail from "./Pages/Detail/Detail";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Carts from "./Pages/Carts/Carts";
import HomeTemplate from "./Templates/HomeTemplate/HomeTemplate";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Profile from "./Pages/Profile/Profile";

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HistoryRouter history={history}>
    {" "}
    <Provider store={store}>
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="profile" element={<Profile />} />
          <Route path="search" element={<Search />}></Route>
          <Route path="carts" element={<Carts />}></Route>

          <Route path="detail">
            <Route path=":id" element={<Detail />}></Route>
          </Route>
        </Route>
      </Routes>
    </Provider>
  </HistoryRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
