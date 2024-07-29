import { Fragment } from "react";
import '../CSS/About.css';


const features = [
  {
    name: 'Our Goal',
    description: 'Our goals encompass exceptional customer service, sustainability, global community building, innovation in design and technology, and achieving carbon neutrality by 2030. These aspirations drive us to provide quality footwear and make a positive impact on the world.',
  },
  {
    name: 'Efficient Delivery',
    description: 'We take pride in our efficient delivery system. With a focus on timely and secure delivery, we ensure your orders reach you promptly, adding convenience to your shopping experience and making us your trusted choice for quality ',
  },
  
];
const About = () => {
 
  return (
    <Fragment>
      <div className="about-container">
               
               {/* Hero */}
      <section className="history-mission">
        <div className="content-wrapper">
         
          <div className="text-center">
            <h1 className="title">Your Ultimate Sneaker Destination</h1>
            <p className="description">
            At SPECTASTYLE, we blend fashion and comfort to create shoes you'll love. Discover the latest trends and classic designs today!  
            </p>
            <div className="button-group">
              <a href="/product" className="btn-primary">Get started</a>
              <a href="/about" className="btn-secondary">Learn more &rarr;</a>
            </div>
          </div>
        </div>
        <div className="video-wrapper">
          <video
            className="video"
            autoPlay
            loop
            muted
          >
            <source src='https://videos.pexels.com/video-files/2853795/2853795-uhd_2560_1440_24fps.mp4' type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
     

         {/* core values */}
<section className="core-values-vision">
      <div className="container">
        <div className="content">
          <div className="text-section">
            <h2 className="heading-secondary">Our Proposal</h2>
            <p className="heading-primary">Commitment</p>
            <p className="description">
              "Our commitment to excellence drives us to innovate continuously, ensuring every pair of shoes we offer is a testament to quality, style, and durability. Join us on our remarkable shoe journey as we strive to make every step you take a stylish and comfortable one."
            </p>
            <dl className="features-list">
              {features.map((feature) => (
                <div key={feature.name} className="feature-item">
                  <dt className="feature-name">
                    {feature.name}
                  </dt>{' '}
                  <dd className="feature-description">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <img
            alt="team"
            src="http://www.burgan-systems.com/wp-content/uploads/2024/02/blog4-1.png"
            className="image"
          />
           <div className="announcement">
            <div className="announcement-text">
              Announcing our new Arrivals.
              <a href="/product" className="announcement-link">
                Explore more &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>




      
      </div>
    </Fragment>
  );
}

export default About;