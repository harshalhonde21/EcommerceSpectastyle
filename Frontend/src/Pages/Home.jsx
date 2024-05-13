import { Fragment } from "react";
import "../CSS/Home.css";
import HomeSecond from "./HomeSecond";
import Product from "./Product";
import Image from "../../public/shoes-image5.png";
import Arrow from "../../public/arrow.png";
import { useNavigate } from "react-router-dom";


const Home = () => {

  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="home-container">
        <div className="top">
          <div className="top-left">
            <h1 className="top-left-1">SPECTASTYLE</h1>
            <h6 className="top-left-2">
              Your one stop Sneaker Shop!
            </h6>
            <h6 className="top-left-2">
              Welcome to our premium e-commerce shoe haven! Discover stylish and
              comfortable footwear, showcasing the latest trends and timeless
              classics. From casual kicks to elegant heels, find your perfect
              pair and step into fashion-forward confidence with us.
            </h6>
          </div>
          <div className="top-right">
            <img src={Image} alt="" />
          </div>
        </div>
        <div className="bottom">
          <button className="btn-1" onClick={()=>{navigate('/product')}}>
            Products
          </button>
          <button className="btn-2" onClick={()=>{navigate('/about')}}>
            About Us
          </button>
        </div>
        <div className="down-arrow">
          <img src={Arrow} alt="" id="arrow"/>
        </div>
      </div>
      <HomeSecond />
      <Product />
    </Fragment>
  );
};

export default Home;
