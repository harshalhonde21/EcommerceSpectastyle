import { Fragment } from "react";
import "../CSS/Contact.css";
import { Email, Phone, Store } from "@mui/icons-material";

const Contact = () => {
  return (
    <Fragment>
      <div className="contact-container">
        <div className="contact-info">
          <h1 className="contact-heading">Contact Us</h1>
          <h6 className="contact-paragraph">
            If you have any questions, feedback, or concerns about SpectaStyle,
            we are here to assist you. Our team is dedicated to providing
            top-quality shoes and exceptional customer service. You can reach
            out to us through various channels, including email, phone, or
            social media. Alternatively, you can use our convenient contact form
            or access our live chat support during our operating hours. Your
            inquiries, suggestions, and messages are important to us, and we
            strive to respond promptly. SpectaStyle values your input and is
            committed to ensuring your satisfaction with our products and
            services. Thank you for choosing SpectaStyle for your footwear
            needs, and we look forward to hearing from you soon.
          </h6>

          <h2 className="contact-subheading">Reach Us</h2>
          <h6 className="contact-paragraph">
            Email: SpectaStyle@gmail.com
            <br />
            Phone: +91 565 8989 878
            <br />
            Address: 1234 Smart Street,Nagpur 440058
          </h6>

          <h2 className="contact-subheading">Visit Our Store</h2>
          <h6 className="contact-paragraph">
            If you prefer an in-person shopping experience, we invite you to
            visit our physical store. Our knowledgeable staff will be happy to
            assist you and guide you through our products.
          </h6>

          <h2 className="contact-subheading">Social Media</h2>
          <h6 className="contact-paragraph">
            Stay connected with SpectaStyle on social media! Follow us for the
            latest shoe trends, exclusive offers, and customer testimonials.
            Join the SpectaStyle community today for fashion inspiration and
            more.
          </h6>

          <div className="social-icons">
            <Email
              style={{
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
              }}
            />
            <Phone
              style={{
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
              }}
            />
            <Store
              style={{
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
              }}
            />
          </div>
        </div>

        <div className="contact-form">
          <h2 className="contact-subheading">Contact Form</h2>
          <form>
            <div className="form-group">
              <input
                style={{
                  width: "100%",
                  marginBottom: "-2rem",
                  border: "2px solid rgb(70, 11, 70)",
                  borderRadius: "8px",
                }}
                type="text"
                id="name"
                name="name"
                placeholder="Good Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                style={{
                  width: "100%",
                  marginBottom: "-2rem",
                  border: "2px solid rgb(70, 11, 70)",
                  borderRadius: "8px",
                  fontSize: "16px", // Font size set to 16px
                  padding: "10px", // Padding set to 10px
                }}
                type="text"
                id="name"
                name="name"
                placeholder="Good Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                style={{
                  width: "100%",
                  marginBottom: "-2rem",
                  border: "2px solid rgb(70, 11, 70)",
                  borderRadius: "8px",
                  fontSize: "16px", // Font size set to 16px
                  padding: "10px", // Padding set to 10px
                }}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                style={{
                  width: "100%",
                  marginBottom: "-2rem",
                  border: "2px solid rgb(70, 11, 70)",
                  borderRadius: "8px",
                  fontSize: "16px", // Font size set to 16px
                  padding: "10px", // Padding set to 10px
                }}
                type="Number"
                id="email"
                name="email"
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                style={{
                  width: "100%",
                  border: "2px solid rgb(70, 11, 70)",
                  borderRadius: "8px",
                  backgroundColor: "rgb(255, 210, 255)",
                  fontFamily: "Rubik", // Font type set to Rubik
                  fontSize: "16px", // Font size set to 16px
                  padding: "10px", // Padding set to 10px
                }}
                id="message"
                name="message"
                placeholder="Your Message"
                rows="3"
                required
              />
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Contact;
