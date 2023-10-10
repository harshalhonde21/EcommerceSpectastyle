import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirecting
import axios from "axios";
import Errors from "../Components/Errors";
import "../css/MainDashboardLogin.css";
import { useDispatch } from "react-redux";
import { login } from "../actions/authActions";

const MainDashboardLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    agentName: "",
    agentPassword: "",
  });

  const { agentName, agentPassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ecommerce-backend-0wr7.onrender.com/ecommerce/agent/login",
        {
          agentName,
          agentPassword,
        }
      );
      if (response.data) {
        setError("sucess");
        dispatch(login());
        navigate("/dashboardharshal");
      } else {
        setError("Invalid agentName or agentPassword");
      }
    } catch (error) {
      setError("Login Error");
    }
  };

  const closeError = () => {
    setError(null);
  };

  return (
    <Fragment>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="form-group">
            <label htmlFor="agentName">Agent Name:</label>
            <input
              type="text"
              id="agentName"
              name="agentName"
              value={agentName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="agentPassword">Agent Password:</label>
            <input
              type="text"
              id="agentPassword"
              name="agentPassword"
              value={agentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <Errors message={error} onClose={closeError} />}
      </div>
    </Fragment>
  );
};

export default MainDashboardLogin;
