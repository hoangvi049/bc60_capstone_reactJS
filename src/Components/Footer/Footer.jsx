import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <footer className="footer p-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h2>GeeksforGeeks</h2>
          </div>
          <div className="col-md-3">
            <h5>About Us</h5>
            <p>
              GeeksforGeeks is a leading platform that provides computer science
              resources and coding challenges for programmers and technology
              enthusiasts along with interview and exam preparations for
              upcoming aspirants.
            </p>
          </div>
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: info@example.com</li>
              <li>Phone: +1233567890</li>
              <li>Address: 123 Street, City, Country</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Follow Us</h5>
            <ul className="list-inline footer-links">
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-facebook" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-linkedin" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-6">
            <p>© 2024 Your Website. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-end">
            <ul className="list-inline footer-links">
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  Privacy Policy
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  Terms of Service
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
