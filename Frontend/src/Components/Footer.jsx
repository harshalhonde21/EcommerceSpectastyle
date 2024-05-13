import React, { Fragment, useState } from "react";
import '../CSS/Footer.css';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material'; // Import the shoes icon
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = () => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(email);
    setIsValidEmail(isValid);
    return isValid;
  };

  const handleButtonClick = () => {
    if (validateEmail()) {
      // Assuming registration is successful
      alert(`Thank you for registering with email: ${email}`);
      // Additional actions after successful registration can be added here
    } else {
      alert("Please enter a valid email address");
    }
  };

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
              style={{ border: "3px solid var(--color-6)", borderRadius: "10px", borderColor: isValidEmail ? "var(--color-6)" : "red" }}
              value={email}
              onChange={handleEmailChange}
            />
            {!isValidEmail && <p style={{ color: "red", margin: "0" }}>Please enter a valid email address</p>}
            <button onClick={handleButtonClick}>Get monthly updates and free resources</button>
          </div>
        </div>

        <div className="section">
          <h2>Routes</h2>
          <ul>
            <li onClick={() => navigate('/about')}>About Us</li>
            <li>Services</li>
            <li onClick={() => navigate('/contact')}>Get In Touch</li>
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
          <z>Address: 1234 Smart Street,Nagpur 440058</z>
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
      </footer>
    </Fragment>
  );
};

export default Footer;
