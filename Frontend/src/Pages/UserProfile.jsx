import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../CSS/UserProfile.css";
import Logo from "/Logo.png";
import Error from "../Components/Error";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  let user = location.state?.user;

  if (!user) {
    const userDataFromLocalStorage = localStorage.getItem("userData");
    if (userDataFromLocalStorage) {
      user = JSON.parse(userDataFromLocalStorage);
    } else {
      setError("User not found!!");
    }
  }

  const closeError = () => {
    setError(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    toast("You are logouted Meet Us soon!", {
      icon: "😢",
      style: {
        borderRadius: "rgb(189, 224, 254)",
        background: "rgb(70, 11, 70)",
        color: "rgb(255, 210, 255)",
      },
    });

    navigate("/");
  };

  return (
    <Fragment>
      <div className="profile-container">
        <div className="profile-image">
          <img src={Logo} alt="User Profile" />
        </div>
        <div className="profile-details">
          <div className="user-info">
            <h2 className="userProfile-subheading">UserName : {user.name}</h2>
            <p className="userProfile-paragraph">Email: {user.email}</p>
          </div>
          <div className="buttons">
            <button className="reset-password">Reset Password</button>
            <button className="logo-out" onClick={handleLogout}>
              Log-Out
            </button>
            <button className="change-photo">Change Photo</button>
          </div>
        </div>
      </div>
      {error && <Error message={error} onClose={closeError} />}
    </Fragment>
  );
};

export default UserProfile;
