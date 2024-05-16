import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import toast from 'react-hot-toast';
import Error from "../Components/Error";
import ".././CSS/Profile.css";

const ResetPassword = () => {
    const [error, setError] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isconfirmPasswordVisible, setIsconfirmPasswordVisible] = useState(false);
    const navigate = useNavigate();


  const handleResetPassword = async (e) => {
    e.preventDefault();
  
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
  
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
    } else {
      try {
        const response = await fetch(
          "https://ecommerce-backend-0wr7.onrender.com/ecommerce/user/resetpw",
          //"http://localhost:4000/ecommerce/user/resetpw",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              password: password,
              confirmPassword : confirmPassword,
            }),
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          setError("success");
          toast("Successfully Your Password Changed", {
            icon: "😁",
            style: {
              borderRadius: "r0b(189, 224, 254)",
              background: "rgb(70, 11, 70)",
              color: "rgb(255, 210, 255)",
            },
          });
          navigate("/profile");
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Reset Password failed. Please check your credentials.");
        }
      } catch (error) {
        console.log(error)
        setError("An error occurred while changing password in.");
      }
    }
  };
  


    return (
        <div>
            <Fragment>
                <script src="https://www.google.com/recaptcha/api.js" async defer></script>
                <div className="profile-container">
                    <div className="profile-outer_box">
                        <div className="profile-card" style={{ boxShadow: "25px 25px 100px rgba(0, 0, 0, 0.2)" }}>
                            <h2>Reset Password</h2>

                            <form onSubmit={handleResetPassword}>
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
                                <div className="input-group">
                                    <input type={isconfirmPasswordVisible ? "text" : "password"}
                                        name="confirmPassword"
                                        placeholder="Enter Confirm Password"
                                        style={{ boxShadow: "none", width: "100%", border: "3px solid var(--color-6)", borderRadius: "10px" }}
                                    />
                                    {isconfirmPasswordVisible ? (
                                        <RemoveRedEyeIcon
                                            className="icon"
                                            onClick={() => setIsconfirmPasswordVisible(!isconfirmPasswordVisible)}
                                        />
                                    ) : (
                                        <VisibilityOffIcon
                                            className="icon"
                                            onClick={() => setIsconfirmPasswordVisible(!isconfirmPasswordVisible)}
                                        />
                                    )}
                                </div>
                                    <button type="submit">Reset Password</button>
                            </form>
                        </div>
                    </div>
                </div>
                {error && <Error message={error}  />}
            </Fragment>
        </div>
    )
}

export default ResetPassword
