import React, { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStarHalf,
  FaStar,
} from "react-icons/fa";
import testimonials from "./testimonials";
import './Testimonials.css';

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const itemsPerPage = isSmallScreen ? 1 : 3;

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const getVisibleTestimonials = () => {
    const end = currentIndex + itemsPerPage;
    if (end > testimonials.length) {
      return [
        ...testimonials.slice(currentIndex),
        ...testimonials.slice(0, end - testimonials.length),
      ];
    }
    return testimonials.slice(currentIndex, end);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} color="#ffd700" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStarHalf key={i} color="#ffd700" />);
      } else {
        stars.push(<FaStar key={i} color="#d1d5db" />);
      }
    }

    return stars;
  };

  return (
    <div className='main'>
      <div
        className='heading'
      >
        What Our Users Say
      </div>
      <div className='center'>
      </div>
      <div className='testimonials-container'>
        <div className='testimonials-slide-left'>
          <button
            onClick={handlePrev}
            className='button1'
          >
            <FaChevronLeft size={35} />
          </button>
        </div>
        <div className='testimonials'>
          <div className='testimonialss'>
            {getVisibleTestimonials().map((testimonial, index) => (
              <div key={index} className='testimonial'>
                <div
                  className='testimoniall'
                >
                  <div className='testimonial-top'>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className='testimonial-img'
                    />
                    <div>
                      <p
                        className='testimonial-name'
                      >
                        {testimonial.name}
                      </p>
                      <p
                        className='testimonial-position'
                      >
                        {testimonial.position}, {testimonial.company}
                      </p>
                      <div className='stars'>
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                  <p
                    className='content'
                  >
                    {testimonial.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='testimonials-slide-right'>
          <button
            onClick={handleNext}
            className='button1'
          >
            <FaChevronRight size={35} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;