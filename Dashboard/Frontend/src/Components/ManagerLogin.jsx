import { Fragment, useState } from "react";
import axios from "axios";
import Errors from "../Components/Errors";
import "../css/ManagerLogin.css";

const ManagerLogin = () => {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [agentFormData, setAgentFormData] = useState({
    agentName: "",
    agentPassword: "",
  });

  const { name, password } = formData;
  const { agentName, agentPassword } = agentFormData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAgentChange = (e) => {
    setAgentFormData({
      ...agentFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ecommerce-backend-0wr7.onrender.com/ecommerce/manager/login",
        {
          name,
          password,
        }
      );
      setFormData({ name: "", password: "" });
      if (response.data) {
        setError("Successfully Login Now U can signup the Agents to Handle the DASHBOARD");
        setIsLoggedIn(true);
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setFormData({ name: "", password: "" });
      setError("An error occurred while logging in");
    }
  };

  const handleAgentSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://ecommerce-backend-0wr7.onrender.com/ecommerce/agent/signup",
        {
          agentName,
          agentPassword,
        }
      );  
      setAgentFormData({ agentName: "", agentPassword: "" });
      if (response.data) {
        setError("Agent Signup Successful");
      } else {
        setError("Agent Signup Failed");
      }
    } catch (error) {
      setAgentFormData({ agentName: "", agentPassword: "" });
      setError("An error occurred during agent signup");
    }
  };

  const closeError = () => {
    setError(null);
  };

  return (
    <Fragment>
      {isLoggedIn ? (
        // Display agent signup form
        <div className="outer-Manager">
          <h1 style={{ textAlign: "center" }}>Agent Signup</h1>
          <form className="login-form" onSubmit={handleAgentSignup}>
            <div className="form-group">
            <h1 style={{color:'black', textAlign:'center', marginBottom:'2rem'}}>Agent Signup</h1>
              <label htmlFor="agentName">Agent Name:</label>
              <input
                type="text"
                id="agentName"
                name="agentName"
                value={agentName}
                onChange={handleAgentChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="agentPassword">Agent Password:</label>
              <input
                type="password"
                id="agentPassword"
                name="agentPassword"
                value={agentPassword}
                onChange={handleAgentChange}
                required
              />
            </div>
            <button type="submit">Signup</button>
          </form>
          {error && <Errors message={error} onClose={closeError} />}
        </div>
      ) : (
        // Display login form
        <div className="outer-Manager">
          <h1 style={{ textAlign: "center" }}>Manager Handler</h1>
          <form className="login-form" onSubmit={handleSubmit}>
          <h1 style={{color:'black', textAlign:'center', marginBottom:'2rem'}}>Manager Login</h1>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {error && <Errors message={error} onClose={closeError} />}
        </div>
      )}
    </Fragment>
  );
};

export default ManagerLogin;
