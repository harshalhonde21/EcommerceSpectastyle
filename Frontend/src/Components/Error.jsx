// import CloseIcon from "@mui/icons-material/Close";
import ".././CSS/Error.css";

const ErrorComponent = ({ message, onClose }) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h6 className="error-message">{message}</h6>
        <button className="error-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default ErrorComponent;
