import { Fragment } from "react";
import '../CSS/Footer.css';
import { Facebook, Twitter, Instagram, LinkedIn, YouTube} from '@mui/icons-material'; // Import the shoes icon
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer">
        <div className="section">
          <h2>
            <NavLink className="linkto" to="/">
              SpectaStyle
            </NavLink>
          </h2>
          <div className="email-signup">
            <input type="email" placeholder="Enter Your Email" />
            <button>Get monthly updates and free resources</button>
          </div>
        </div>

        <div className="section">
          <h2>Routes</h2>
          <ul>
            <li> <NavLink to="/about" className="linkto">About Us</NavLink></li>
            <li> <NavLink to="/product" className="linkto">Services</NavLink></li>
            <li> <NavLink to="/contact" className="linkto">Get In Touch</NavLink></li>
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
          <z>Phone: <a className="linkto" href="tel:+915658989878">+91 565 8989 878</a></z>
          <z>Email: <a className="linkto" href="mailto:spectastyle@gmail.com">spectastyle@gmail.com</a></z>
          <z>Address: 1234 Smart Street,Nagpur 440058</z>
          <z style={{fontWeight:'bolder'}}>Design and Develop by <a className="linkto" href="https://harshalwebfolio.netlify.app">❤️Harshal Honde❤️</a></z>
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
