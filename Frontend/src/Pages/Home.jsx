import { Fragment } from "react";
import "../CSS/Home.css";
import HomeSecond from "./HomeSecond";
import Product from "./Product";
import Testimonials from '../Components/Testimonials/Testimonials.jsx'
import Image from "../../public/shoes-image5.png";
import Arrow from "../../public/arrow.png";
import { useNavigate } from "react-router-dom";
import Tilt from 'react-parallax-tilt';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="home-container">
        <div className="top">
          <div className="top-left">
            <h1 className="top-left-1">SPECTASTYLE</h1>
            <h6 className="top-left-2-h6">Your one stop Sneaker Shop!</h6>
            <h6 className="top-left-2">
              Welcome to our premium e-commerce shoe haven! Discover stylish and
              comfortable footwear, showcasing the latest trends and timeless
              classics. From casual kicks to elegant heels, find your perfect
              pair and step into fashion-forward confidence with us.
            </h6>
            <div className="btn-container">
              <button className="btn-1" onClick={() => navigate('/product')}>
                Products
              </button>
              <button className="btn-2" onClick={() => navigate('/about')}>
                About Us
              </button>
            </div>
          </div>
          <Tilt
            scale={1.05}
            transitionSpeed={3000}
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            perspective={1000}>
            <div className="top-right ">
              <img src={Image} alt="Sneaker" />
            </div>
          </Tilt>
        </div>
        <div className="down-arrow">
          <img src={Arrow} alt="Down Arrow" id="arrow" />
        </div>
      </div>
      <HomeSecond />
      <Product />
      <Testimonials />
    </Fragment>
  );
};

export default Home;
