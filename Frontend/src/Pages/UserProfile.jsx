import { Fragment, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../CSS/UserProfile.css";
import Error from "../Components/Error";
import toast from "react-hot-toast";
import convertToBase64 from "./convertToBase64";
import { FormLoader } from "../Components/Loader";

const UserProfile = () => {
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  let user = location.state?.user;
  const [imgFile, setImgFile] = useState();
  const [tempImage, setTempImage] = useState(null);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [change, setChange] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  //the backendUrl is suppose to be in .env file and that's how you can use it from .env file

  // const backendUrl = import.meta.env.REACT_APP_backendUrl || "http://localhost:8000/";

  const backendUrl = "https://ecommerce-backend-0wr7.onrender.com/";


  useEffect(() => {
    if (!user) {
      const userDataFromLocalStorage = localStorage.getItem("userData");
      if (userDataFromLocalStorage) {
        user = JSON.parse(userDataFromLocalStorage);
        setTempImage(user.profileImg);
        setName(user.name);
        setEmail(user.email);
      } else {
        setError("User not found!!");
      }
    } else {
      setTempImage(user.profileImg);
    }
  }, [user]);

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

  const updateProfileImage = async () => {
    if (!imgFile) {
      toast("No image selected.", {
        icon: "🚫",
        style: {
          borderRadius: "rgb(189, 224, 254)",
          background: "rgb(70, 11, 70)",
          color: "rgb(255, 210, 255)",
        },
      });
      return;
    }

    const token = localStorage.getItem("token");

    setLoading(true);
    try {
      const response = await fetch(
        `${backendUrl}ecommerce/user/updateProfileImage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email, profileImg: imgFile }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userData", JSON.stringify(data.user));
        toast("Profile picture updated!", {
          icon: "👍",
          style: {
            borderRadius: "rgb(189, 224, 254)",
            background: "rgb(70, 11, 70)",
            color: "rgb(255, 210, 255)",
          },
        });
        setChange(false);
      } else {
        toast("Failed to update profile picture.", {
          icon: "😢",
          style: {
            borderRadius: "rgb(189, 224, 254)",
            background: "rgb(70, 11, 70)",
            color: "rgb(255, 210, 255)",
          },
        });
      }
    } catch (error) {
      toast("An error occurred while updating the profile picture.", {
        icon: "😢",
        style: {
          borderRadius: "rgb(189, 224, 254)",
          background: "rgb(70, 11, 70)",
          color: "rgb(255, 210, 255)",
        },
      });
    } finally {
      setLoading(false)
    }
  };

  //Updating profile image, changes by Astha Negi 
  const handlePhotoChange = async (e) => {
    const fileInput = e.target.files[0];
    if (fileInput) {
      const base64 = await convertToBase64(fileInput);
      setTempImage(base64);
      setImgFile(base64);
      setChange(true);
    }
    else {
      toast("Please select an image", {
        icon: "🙏",
        style: {
          borderRadius: "rgb(189, 224, 254)",
          background: "rgb(70, 11, 70)",
          color: "rgb(255, 210, 255)",
        },
      });
    }
  };

  const handlePasswordReset = async () => {
    if (!newPassword) {
      toast("Password can't be empty.", {
        icon: "😢",
        style: {
          borderRadius: "rgb(189, 224, 254)",
          background: "rgb(70, 11, 70)",
          color: "rgb(255, 210, 255)",
        },
      });
      return;
    }
    const token = localStorage.getItem("token");

    setLoading(true);
    try {
      const response = await fetch(
        `${backendUrl}ecommerce/user/resetPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      if (response.ok) {
        toast("Password reset successful!", {
          icon: "🔒",
          style: {
            borderRadius: "rgb(189, 224, 254)",
            background: "rgb(70, 11, 70)",
            color: "rgb(255, 210, 255)",
          },
        });
        setResetPassword(false);
        setNewPassword("");
      } else {
        toast("Failed to reset password.", {
          icon: "😢",
          style: {
            borderRadius: "rgb(189, 224, 254)",
            background: "rgb(70, 11, 70)",
            color: "rgb(255, 210, 255)",
          },
        });
      }
    } catch (error) {
      toast("An error occurred while resetting the password.", {
        icon: "😢",
        style: {
          borderRadius: "rgb(189, 224, 254)",
          background: "rgb(70, 11, 70)",
          color: "rgb(255, 210, 255)",
        },
      });
    } finally {
      setLoading(false)
    }
  };

  return (
    <Fragment>
      <div className="profile-container">
        <div className="profile-image">
          <img src={tempImage} alt="User Profile" />
          {change &&
            <div>
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
              <button onClick={updateProfileImage} type="submit" disabled={isLoading}>
                {isLoading ? <FormLoader /> : "Update"}
              </button>
            </div>
          }

          {resetPassword &&
            <div className="password-reset">
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button onClick={handlePasswordReset} type="submit" disabled={isLoading}>
                {isLoading ? <FormLoader /> : "Reset Now"}
              </button>
            </div>
          }
        </div>
        <div className="profile-details">
          <div className="user-info">
            <h2 className="userProfile-subheading">UserName : {name}</h2>
            <p className="userProfile-paragraph">Email: {email}</p>
          </div>
          <div className="buttons">
            <button className="reset-password" onClick={() => setResetPassword(true)}>Reset Password</button>
            <button className="logo-out" onClick={handleLogout}>
              Log-Out
            </button>
            <button className="change-photo" onClick={() => setChange(true)}>Change Photo</button>
          </div>
        </div>
      </div>
      {error && <Error message={error} onClose={closeError} />}
    </Fragment>
  );
};

export default UserProfile;
