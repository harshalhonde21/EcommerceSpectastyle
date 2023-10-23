import { Fragment } from "react";
import '../CSS/Footer.css';
import { Facebook, Twitter, Instagram, LinkedIn, YouTube} from '@mui/icons-material'; // Import the shoes icon

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer">
        <div className="section">
          <h2>SpectaStyle</h2>
          <div className="email-signup">
            <input type="email" placeholder="Enter Your Email" />
            <button>Get monthly updates and free resources</button>
          </div>
        </div>

        <div className="section">
          <h2>Routes</h2>
          <ul>
            <li>About Us</li>
            <li>Services</li>
            <li>Get In Touch</li>
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
          <z style={{fontWeight:'bolder'}}>Design and Develop by <a style={{textDecoration:'none'}} href="https://harshalwebfolio.netlify.app">❤️Harshal Honde❤️</a></z>
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
