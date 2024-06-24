import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import AttachmentIcon from "@mui/icons-material/Attachment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { FormLoader } from "../Components/Loader";
import convertToBase64 from "./convertToBase64";

// components
import toast from 'react-hot-toast';
import Error from "../Components/Error";
import UserProfile from "./UserProfile";
import { useCart } from "../Components/CartContext";
import ".././CSS/Profile.css";
import Reg from "/reg.png";

const Profile = () => {
  // a simple usestate to handle loading state. initially set to off.
  const [isLoading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState('');
  const navigate = useNavigate();
  const { setUserData } = useCart();

  //the backendUrl is suppose to be in .env file and that's how you can use it from .env file

  // const backendUrl = import.meta.env.REACT_APP_backendUrl || "http://localhost:8000/";

  const backendUrl = "https://ecommerce-backend-0wr7.onrender.com/";

  const [file, setFile] = useState(null);

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

  //login
  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      setError("Please fill in all fields.");
    } else {
      // when user submits the login form, loading state is activated
      setLoading(true)
      try {
        const response = await fetch(
          `${backendUrl}ecommerce/user/login`,
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
        // user `finally` to finally toggle the loading state to off, no matter the request is a success or error.
      } finally {
        setLoading(false)
      }
    }
  };

  //signup
  const handleSignupFormSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!email || !username || !password || !file) {
      setError("Please fill in all fields.");
    } else {
      // when user submits the login form, loading state is activated
      setLoading(true)
      try {
        const response = await fetch(
          `${backendUrl}ecommerce/user/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
              name: username,
              profileImg: file,
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
          
          //moving to user page after registering
          navigate("/user");
        }
        else {
          const errorData = await response.json();
          setError(errorData.message || "Signup failed. Please check your credentials.");
          return;
        }
      } catch (error) {
        setError("An error occurred while signing up ");
        console.log(error);
        // user `finally` to finally toggle the loading state to off, no matter the request is a success or error.
      } finally {
        setLoading(false)
      }
    }
  };

  const handleFileChange = async (e) => {
    const fileInput = e.target.files[0];
    if (fileInput) {
      const base64 = await convertToBase64(fileInput);
      setFile(base64); // Update the file state with the base64 string.
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
              <h2>{isLogin ? "Login" : "Sign Up"}</h2>
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
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? <FormLoader /> : "Login"}
                  </button>

                </form>
              ) : (
                <form onSubmit={handleSignupFormSubmit}>

                  <div className="input-group">
                    <img src={file || Reg} alt="profile image" className="profile_img" />
                    <label className="file-label" htmlFor="fileInput">
                      Select Profile Picture
                      <AttachmentIcon className="icon" style={{ top: "8px" }} />
                      <input
                        style={{ border: "3px solid var(--color-6)", borderRadius: "10px" }}
                        type="file"
                        id="fileInput"
                        className="file-input"
                        accept="image/*"
                        name="fileInput"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
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
                  {/* same loading state for the signup form */}
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? <FormLoader /> : "Sign Up"}
                  </button>
                </form>
              )}
              <div className="toggle-btn">
                {/* also disable changing the form to another mode while processing request */}
                <button onClick={toggleLoginSignup} disabled={isLoading}>
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
