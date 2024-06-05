import { Fragment } from "react";
import '../CSS/About.css';

const About = () => {
  return (
    <Fragment>
      <div className="about-container">
        <div className="items">
          <div className="section-box">
            <h1 className="section-heading">ABOUT SPECTASTYLE</h1>
            <p className="section-content">Established in 2000, we have dedicated two decades to perfecting footwear, creating timeless designs that marry fashion and comfort. Join us on our remarkable shoe journey.</p>
          </div>

          <div className="section-box">
            <h2 className="section-heading">Our Goals</h2>
            <p className="section-content">Our goals encompass exceptional customer service, sustainability, global community building, innovation in design and technology, and achieving carbon neutrality by 2030. These aspirations drive us to provide quality footwear and make a positive impact on the world.</p>
          </div>

          <div className="section-box">
            <h2 className="section-heading">Efficient Delivery</h2>
            <p className="section-content">We take pride in our efficient delivery system. With a focus on timely and secure delivery, we ensure your orders reach you promptly, adding convenience to your shopping experience and making us your trusted choice for quality footwear.</p>
          </div>

          <div className="section-box">
            <h2 className="section-heading">Thanks For Trust in US.</h2>
            <p className="section-content">Thank you for choosing SPECTASTYLE for your shoe shopping needs.</p>
          </div>

        </div>
      </div>
    </Fragment>
  );
}

export default About;
