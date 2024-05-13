import { Fragment } from "react";
import "../CSS/Home.css";
import HomeSecond from "./HomeSecond";
import Product from "./Product";
import Image from "../../public/shoes-image5.png";
import Arrow from "../../public/arrow.png";
import { useNavigate } from "react-router-dom";


import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Home = () => {

  const images = [
    "/carousel-1.jpg",
    "/carousel-2.jpg",
    "/carousel-3.jpg",
    
    
    // Add more image paths here if needed
  ];
  const settings = {
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 700
  };

  const navigate = useNavigate();


  return (
    // <Fragment>
    //   <div className="home-container">
    //     <div className="home-left">
    //       <h1>
    //         <b>NEW TRENDS</b> FOR SHOES
    //       </h1>
    //       <div className="para">
    //         <p>
    //           Welcome to our premium e-commerce shoe haven! Uncover an extensive
    //           array of stylish and comfortable footwear, showcasing the latest
    //           trends and timeless classics. From casual kicks to elegant heels,
    //           find your perfect pair and step into fashion-forward confidence
    //           with us.
    //         </p>
    //       </div>
    //     </div>
    //     <div className="home-right">
    //       <img
    //         src="/shoes-image5.png"
    //         alt="Rotating Image"
    //         className="rotating-image"
    //       />
    //     </div>
    //   </div>
    //   
    // </Fragment>
    <Fragment>

      <Slider {...settings}>
        {images.map((image, index) => (

          <div className=" h-[100vh] w-[100vw]  " >
            <div className=" h-[100vh] md:bg-left-top bg-cover bg-no-repeat bg-center home-left" style={{ backgroundImage: `url(${image})` }} >
              <h1>
                NEW TRENDS FOR SHOES
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
            
          </div>
        ))}
      </Slider>


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
