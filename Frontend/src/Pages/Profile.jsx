import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import AttachmentIcon from "@mui/icons-material/Attachment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// components
import Error from "../Components/Error";
import UserProfile from "./UserProfile";
import ".././CSS/Profile.css";

const Profile = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    if (token && userData) {
      setAuthenticated(true);
      const user = JSON.parse(userData);
      setUser(user);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const toggleLoginSignup = () => {
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

          // Always navigate to the "/user" page after successful login
          navigate("/user");
        } else {
          setError("Login failed. Please check your credentials.");
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

          // Always navigate to the "/user" page after successful signup
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
      {authenticated ? (
        <UserProfile />
      ) : (
        <div className="profile-container">
          <div className="profile-outer_box">
            <div className="profile-card">
              <h2>{isLogin ? "Login" : "Signup"}</h2>
              {isLogin ? (
                <form onSubmit={handleLoginFormSubmit}>
                  <div className="input-group">
                    <EmailIcon
                      style={{
                        position: "absolute",
                        top: "0.5rem",
                        left: "13.5rem",
                        color: "rgb(70, 11, 70)",
                      }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                    />
                    {isPasswordVisible ? (
                      <RemoveRedEyeIcon
                        style={{
                          position: "absolute",
                          top: "0.5rem",
                          left: "13.5rem",
                          color: "rgb(70, 11, 70)",
                        }}
                        className="password-toggle"
                        onClick={() => setIsPasswordVisible(false)}
                      />
                    ) : (
                      <VisibilityOffIcon
                        style={{
                          position: "absolute",
                          top: "0.5rem",
                          left: "13.5rem",
                          color: "rgb(70, 11, 70)",
                        }}
                        className="password-toggle"
                        onClick={() => setIsPasswordVisible(true)}
                      />
                    )}
                  </div>
                  <button type="submit">Login</button>
                </form>
              ) : (
                <form onSubmit={handleSignupFormSubmit}>
                  <div className="input-group">
                    <EmailIcon
                      style={{
                        position: "absolute",
                        top: "0.5rem",
                        left: "13.5rem",
                        color: "rgb(70, 11, 70)",
                      }}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="input-group">
                    <PersonIcon
                      style={{
                        position: "absolute",
                        top: "0.5rem",
                        left: "13.5rem",
                        color: "rgb(70, 11, 70)",
                      }}
                    />
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter Username"
                      style={{border:"none", width:'16rem', borderRadius:'7px', marginBottom:'1px', height:'2.5rem'}}
                    />
                  </div>
                  <div className="input-group">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      name="password"
                      placeholder="Enter Password"
                    />
                    {isPasswordVisible ? (
                      <RemoveRedEyeIcon
                        style={{
                          position: "absolute",
                          top: "0.5rem",
                          left: "13.5rem",
                          color: "rgb(70, 11, 70)",
                        }}
                        className="password-toggle"
                        onClick={() => setIsPasswordVisible(false)}
                      />
                    ) : (
                      <VisibilityOffIcon
                        style={{
                          position: "absolute",
                          top: "0.5rem",
                          left: "13.5rem",
                          color: "rgb(70, 11, 70)",
                        }}
                        className="password-toggle"
                        onClick={() => setIsPasswordVisible(true)}
                      />
                    )}
                  </div>
                  <div className="input-group">
                    <AttachmentIcon
                      style={{
                        position: "absolute",
                        top: "0.5rem",
                        left: "13.5rem",
                        color: "rgb(70, 11, 70)",
                      }}
                    />
                    <label className="file-label" htmlFor="fileInput">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      id="fileInput"
                      className="file-input"
                      accept="image/*"
                      name="fileInput"
                    />
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
