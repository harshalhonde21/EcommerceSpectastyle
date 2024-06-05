import { Fragment, useEffect, useState} from "react";
import '../CSS/Footer.css';
import { Facebook, Twitter, Instagram, LinkedIn} from '@mui/icons-material'; // Import the shoes icon
import XIcon from '@mui/icons-material/X';
import { useNavigate } from "react-router-dom";


const Footer = () => {

  const navigate = useNavigate();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            setShowBackToTop(true);
        } else {
            setShowBackToTop(false);
        }
    });
}, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
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
                      style={{ border: "3px solid var(--color-6)", borderRadius: "10px" }}
                    />
            <button>Get monthly updates and free resources</button>
          </div>
        </div>

        <div className="section">
          <h2>Routes</h2>
          <ul>
            <li onClick={()=>navigate('/about')}>About Us</li>
            <li>Services</li>
            <li onClick={()=>navigate('/contact')}>Get In Touch</li>
            <li onClick={()=>navigate('/faq')}>FAQ</li>
            <div className="social-icons">
              <Facebook />
              <XIcon />
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
        {showBackToTop && (
        <div id="back-to-top-container">
      <div class="circle1" onClick={scrollToTop}>
    <svg id="back-to-top" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
    </svg>
    </div>
    </div>
    )}
      </footer>
    </Fragment>
  );
};

export default Footer;
