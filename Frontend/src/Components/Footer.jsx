import { Fragment, useEffect, useState } from "react";
import '../CSS/Footer.css';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import React from 'react';

const ScrollToTop = () => {
  // Function to calculate the scroll value and update the scrollToTop button
  const calcScrollValue = () => {
    let pos = document.body.scrollTop || document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let percentval = Math.round((pos * 100) / calcHeight);

    const scrollToTop = document.querySelector(".scrollToTop");

    if (pos > 100) {
      scrollToTop.style.display = "flex";
    } else {
      scrollToTop.style.display = "none";
    }

    scrollToTop.style.background = `conic-gradient(#571157 ${percentval}%, white ${percentval}%)`;
  };

  // Add click event listener to scrollToTop button
  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };

  useEffect(() => {
    // Call calcScrollValue on scroll and on load
    window.onscroll = calcScrollValue;
    window.onload = calcScrollValue;

    // Clean up event listeners on component unmount
    return () => {
      window.onscroll = null;
      window.onload = null;
    };
  }, []);

  return (
    <div className="scrollToTop" onClick={scrollToTop} style={{ display: 'none' }}>
      <div className="inner">
        <i className="fa fa-arrow-up icon"></i>
      </div>
    </div>
  );
};

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <footer className="footer">
        <div className="section">
          <h2>SpectaStyle</h2>
          <div className="email-signup">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              style={{ border: "3px solid var(--color-6)", borderRadius: "10px" }}
            />
            <button>Get monthly updates and free resources</button>
          </div>
        </div>

        <div className="section">
          <h2>Routes</h2>
          <ul>
            <li onClick={() => navigate('/about')}>About Us</li>
            <li>Services</li>
            <li onClick={() => navigate('/contact')}>Get In Touch</li>
            <li onClick={() => navigate('/faq')}>FAQ</li>
            <div className="social-icons">
              <Facebook />
              <Twitter />
              <Instagram />
              <LinkedIn />
            </div>
          </ul>
        </div>

        <div className="section">
          <h2>About Us</h2>
          <z>Phone: +91 565 8989 878</z>
          <z>Email: spectastyle@gmail.com</z>
          <z>Address: 1234 Smart Street, Nagpur 440058</z>
          <z style={{ fontWeight: 'bolder' }}>Design and Develop by <a style={{ textDecoration: 'none' }} href="https://harshalwebfolio.netlify.app">❤️Harshal Honde❤️</a></z>
        </div>

        <div className="section">
          <h2>LINKS</h2>
          <ul>
            <li>Website Builder</li>
            <li>Download for Mac</li>
            <li>Download for Windows</li>
          </ul>
        </div>

        <ScrollToTop />
      </footer>
    </Fragment>
  );
};

export default Footer;
