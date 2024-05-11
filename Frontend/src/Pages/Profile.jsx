import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import AttachmentIcon from "@mui/icons-material/Attachment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"

// components
import toast from 'react-hot-toast';
import Error from "../Components/Error";
import UserProfile from "./UserProfile";
import { useCart } from "../Components/CartContext";
import ".././CSS/Profile.css";

const Profile = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const { setUserData } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      setAuthenticated(true);
      const users = JSON.parse(userData);
      setUser(users);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const toggleLoginSignup = () => {
    toast("Just Do It And Shop With Us", {
      icon: "😎",
      style: {
        borderRadius: "r0b(189, 224, 254)",
        background: "rgb(70, 11, 70)",
        color: "rgb(255, 210, 255)",
      },
    });
    setIsLogin(!isLogin);
  };


  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
  
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    if (!email || !password) {
      setError("Please fill in all fields.");
    } else {
      try {
        const response = await fetch(
          "https://ecommerce-backend-0wr7.onrender.com/ecommerce/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          const token = data.token;
  
          localStorage.setItem("token", token);
          localStorage.setItem("userData", JSON.stringify(data.user));
  
          setError("success");
          setUserData(data.user);
          toast("You Are Success Login Welcome to Your Profile!", {
            icon: "😁",
            style: {
              borderRadius: "r0b(189, 224, 254)",
              background: "rgb(70, 11, 70)",
              color: "rgb(255, 210, 255)",
            },
          });
          navigate("/user");
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Login failed. Please check your credentials.");
        }
      } catch (error) {
        setError("An error occurred while logging in.");
      }
    }
  };
  

  const handleSignupFormSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const fileInput = e.target.fileInput.files[0];

    if (!email || !username || !password || !fileInput) {
      setError("Please fill in all fields.");
    } else {
      try {
        const response = await fetch(
          "https://ecommerce-backend-0wr7.onrender.com/ecommerce/user/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
              name: username,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const token = data.token;


          localStorage.setItem("token", token);
          localStorage.setItem("userData", JSON.stringify(data.user));

          setError("success");
          toast("You Are Success Signup Saved Me In Your Mind Welcome to Your Profile!", {
            icon: "😁",
            style: {
              borderRadius: "r0b(189, 224, 254)",
              background: "rgb(70, 11, 70)",
              color: "rgb(255, 210, 255)",
            },
          });
          navigate("/user");
        } else {
          setError("Signup failed. Please check your credentials.");
        }
      } catch (error) {
        setError("An error occurred while signing up.");
      }
    }
  };

  const closeError = () => {
    setError(null);
  };


  return (
    <Fragment>
      <script src="https://www.google.com/recaptcha/api.js" async defer></script>

      {authenticated ? (
        <UserProfile user={user} />
      ) : (
        <div className="profile-container">
          <div className="profile-outer_box">
            <div className="profile-card" style={{ boxShadow: "25px 25px 100px rgba(0, 0, 0, 0.2)" }}>
              <h2>{isLogin ? "Login" : "Signup"}</h2>
              {isLogin ? (
                <form onSubmit={handleLoginFormSubmit}>
                  <div className="input-group">
                    <EmailIcon className="icon"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      style={{ border: "3px solid var(--color-6)", borderRadius: "10px" }}

                    />
                  </div>
                  <div className="input-group">
                    <input type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                      style={{ boxShadow: "none", width: "100%", border: "3px solid var(--color-6)", borderRadius: "10px" }}
                    />
                    {isPasswordVisible ? (
                      <RemoveRedEyeIcon
                        className="icon"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      />
                    ) : (
                      <VisibilityOffIcon
                        className="icon"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      />
                    )}
                  </div>
                  <button  type="submit">Login</button>

                </form>
              ) : (
                <form onSubmit={handleSignupFormSubmit}>
                  <div className="input-group">
                    <EmailIcon className="icon" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      style={{ border: "3px solid var(--color-6)", borderRadius: "10px" }}
                    />
                  </div>
                  <div className="input-group">
                    <PersonIcon className="icon" />
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter Username"
                      style={{ boxShadow: "none", marginBottom: "0.7rem", width: '100%', border: "3px solid var(--color-6)", borderRadius: "10px" }}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                      style={{ boxShadow: "none", marginBottom: "1.2rem", width: '100%', border: "3px solid var(--color-6)", borderRadius: "10px" }}
                    />
                    {isPasswordVisible ? (
                      <RemoveRedEyeIcon
                        className="icon" onClick={() => setIsPasswordVisible(false)}
                      />
                    ) : (
                      <VisibilityOffIcon className="icon"
                        onClick={() => setIsPasswordVisible(true)}
                      />
                    )}
                  </div>
                  <div className="input-group">
                    <label className="file-label" htmlFor="fileInput">
                      Profile Picture
                      <AttachmentIcon className="icon" style={{ top: "8px" }} />
                      <input
                        style={{ border: "3px solid var(--color-6)", borderRadius: "10px" }}
                        type="file"
                        id="fileInput"
                        className="file-input"
                        accept="image/*"
                        name="fileInput"
                      />
                    </label>
                  </div>
                  <button type="submit">Signup</button>
                </form>
              )}
              <div className="toggle-btn">
                <button onClick={toggleLoginSignup}>
                  {isLogin
                    ? "Don't have an account? Signup"
                    : "Already have an account? Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {error && <Error message={error} onClose={closeError} />}
    </Fragment>
  );
};

export default Profile;
