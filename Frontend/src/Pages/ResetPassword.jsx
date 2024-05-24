import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import { FormLoader } from "../Components/Loader";

// components
import toast from 'react-hot-toast';
import Error from "../Components/Error";
import { useCart } from "../Components/CartContext";
import ".././CSS/Profile.css";

const ResetPassword = () => {
    // a simple usestate to handle loading state. initially set to off.
    const [isLoading, setLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const { setUserData } = useCart();

    const [showInputs, setShowInputs] = useState(false);
    const [sendOtp, setSendOtp] = useState(null);

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

    // making POST method for sending the OTP to the user and then UPDATING the user PASSWORD
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        //sending OTP to the user
        if (showInputs === false) {
            const email = e.target.email.value;
            if (!email) {
                setError("Please provide a email");
            }
            else {
                try {
                    setLoading(true)
                    const response = await fetch(
                        "http://localhost:4000/ecommerce/user/sendOpt",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: email,
                            }),
                        }
                    )
                    const data = await response.json();
                    if (data.success === false) {
                        setError(data.message)
                    }
                    else {
                        setSendOtp(data.otp);
                        setShowInputs(true)
                        localStorage.setItem("userEmail", email)
                    }
                } catch (error) {
                    console.log("otp error", error)
                }
                finally {
                    setLoading(false)
                }
            }
        }
        //updating the user PASSWORD in data base 
        else {
            const otp = e.target.otp.value;
            if (!otp || otp != sendOtp) {
                setError("Otp is wrong or Please fill otp");
            } else {

                const email = localStorage.getItem("userEmail")
                const password = e.target.password.value;

                if (!password) {
                    setError("Please fill new password or try again");
                }
                else {
                    // when user submits the login form, loading state is activated
                    setLoading(true)
                    try {
                        const response = await fetch(
                            "http://localhost:4000/ecommerce/user/resetPassword",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    email: email,
                                    newPassword: password,
                                }),
                            }
                        );

                        const data = await response.json();
                        if (response.ok) {
                            const token = data.token;
                            localStorage.setItem("token", token);
                            localStorage.setItem("userData", JSON.stringify(data.user));

                            setError("success");
                            toast("You Are Successfully Update your password Saved Me In Your Mind Welcome to Your Profile!", {
                                icon: "😁",
                                style: {
                                    borderRadius: "r0b(189, 224, 254)",
                                    background: "rgb(70, 11, 70)",
                                    color: "rgb(255, 210, 255)",
                                },
                            });
                            navigate("/user");
                        } else {
                            setError(data.message);
                        }
                    } catch (error) {
                        setError("An error occurred while updating password.");
                    } finally {
                        setLoading(false)
                    }
                }
            }
        }
    }

    const closeError = () => {
        setError(null);
    };

    return (
        <Fragment>
            <div className="profile-container">
                <div className="profile-outer_box">
                    <div className="profile-card" style={{ boxShadow: "25px 25px 100px rgba(0, 0, 0, 0.2)" }}>
                        <h2>Forget Password</h2>
                        <form onSubmit={handlePasswordSubmit}>
                            {showInputs === false ?
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
                                : <>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            name="otp"
                                            placeholder="Enter OTP"
                                            style={{ border: "3px solid var(--color-6)", borderRadius: "10px", width: "100%" }}

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
                                </>}
                            <button type="submit" disabled={isLoading}>
                                {isLoading ? <FormLoader /> : "Send OTP"}
                            </button>
                        </form>

                    </div>
                </div>
            </div>
            {error && <Error message={error} onClose={closeError} />}
        </Fragment>
    );
}

export default ResetPassword;
