import "../css/Errors.css";

const Errors = ({ message, onClose }) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <p className="error-message">{message}</p>
        <button className="error-button" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Errors;