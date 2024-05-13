import { Fragment } from "react";
import "../CSS/Home.css";
import HomeSecond from "./HomeSecond";
import Product from "./Product";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Home = () => {
  const images = [
    "/poster1.jpg",
    "/poster2.jpg",
    
    
    // Add more image paths here if needed
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 700
  };
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
            <div className=" h-full md:bg-left-top bg-cover bg-no-repeat bg-center home-left" style={{ backgroundImage: `url(${image})` }} >
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

      <HomeSecond />
      <Product />
    </Fragment>
  );
};

export default Home;
