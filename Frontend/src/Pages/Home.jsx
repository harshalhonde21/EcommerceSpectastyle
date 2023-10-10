import { Fragment } from "react";
import "../CSS/Home.css";
import HomeSecond from "./HomeSecond";
import Product from "./Product";

const Home = () => {
  return (
    <Fragment>
      <div className="home-container">
        <div className="home-left">
          <h1>
            <b>NEW TRENDS</b> FOR SHOES
          </h1>
          <div className="para">
            <p>
              Welcome to our premium e-commerce shoe haven! Uncover an extensive
              array of stylish and comfortable footwear, showcasing the latest
              trends and timeless classics. From casual kicks to elegant heels,
              find your perfect pair and step into fashion-forward confidence
              with us.
            </p>
          </div>
        </div>
        <div className="home-right">
          <img
            src="../../assets/shoes-image5.png"
            alt="Rotating Image"
            className="rotating-image"
          />
        </div>
      </div>
      <HomeSecond />
      <Product />
    </Fragment>
  );
};

export default Home;
