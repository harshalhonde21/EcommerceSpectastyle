import { Fragment } from "react";
import "../CSS/Footer.css";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material"; // Import the shoes icon
import { useNavigate } from "react-router-dom";

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
							style={{
								border: "3px solid var(--color-6)",
								borderRadius: "10px",
							}}
						/>
						<button>Get monthly updates and free resources</button>
					</div>
				</div>

				<div className="section">
					<h2>Routes</h2>
					<ul>
						<li onClick={() => navigate("/about")}>About Us</li>
						<li>Services</li>
						<li onClick={() => navigate("/contact")}>
							Get In Touch
						</li>
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
					<a
						className="contact-info"
						href="tel:+915658989878"
						style={{
							fontWeight: "",
							textDecoration: "none",
							color: "inherit",
							cursor: "pointer",
						}}
					>
						Phone: +91 565 8989 878
					</a>
					<a
						className="contact-info"
						href="mailto:spectastyle@gmail.com"
						style={{
							fontWeight: "",
							textDecoration: "none",
							color: "inherit",
						}}
					>
						Email: spectastyle@gmail.com
					</a>
					<z className="contact-info">
						Address: 1234 Smart Street,Nagpur 440058
					</z>
					<z style={{ fontWeight: "bolder" }}>
						Design and Develop by{" "}
						<a
							style={{ textDecoration: "none" }}
							href="https://harshalwebfolio.netlify.app"
						>
							❤️Harshal Honde❤️
						</a>
					</z>
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
