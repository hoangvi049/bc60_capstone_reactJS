import React from "react";

const Carousel = () => {
  return (
    <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
      <ol className="carousel-indicators">
        <li
          data-bs-target="#carouselId"
          data-bs-slide-to={0}
          className="active"
          aria-current="true"
          aria-label="First slide"
        />
        <li
          data-bs-target="#carouselId"
          data-bs-slide-to={1}
          aria-label="Second slide"
        />
        <li
          data-bs-target="#carouselId"
          data-bs-slide-to={2}
          aria-label="Third slide"
        />
      </ol>
      <div className="carousel-inner" role="listbox">
        <div className="carousel-item active container">
          <div className="row">
            <div className="col-md-9">
              <img
                src="/images/banner.png"
                className="w-100 d-block"
                alt="First slide"
              />
            </div>
            <div className="col-md-3 my-auto">
              <h3>Product Name</h3>
              <p>Product description....</p>
              <button
                className="btn"
                style={{ backgroundColor: "#F8B653", color: "#FFFFFF" }}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
        <div className="carousel-item  container">
          <div className="row">
            <div className="col-md-9">
              <img
                src="./images/banner.png"
                className="w-100 d-block"
                alt="First slide"
              />
            </div>
            <div className="col-md-3 my-auto ">
              <h3>Product Name</h3>
              <p>Product description....</p>
              <button
                className="btn"
                style={{ backgroundColor: "#F8B653", color: "#FFFFFF" }}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
        <div className="carousel-item  container">
          <div className="row">
            <div className="col-md-9">
              <img
                src="./images/banner.png"
                className="w-100 d-block"
                alt="First slide"
              />
            </div>
            <div className="col-md-3 my-auto ">
              <h3>Product Name</h3>
              <p>Product description....</p>
              <button
                className="btn"
                style={{ backgroundColor: "#F8B653", color: "#FFFFFF" }}
              >
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselId"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselId"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
