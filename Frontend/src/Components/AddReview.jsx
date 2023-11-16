import { useState } from "react";
import axios from "axios";
import "../CSS/AddReview.css";

const AddReview = ({ productId, onClose }) => {
  const [reviewText, setReviewText] = useState("");
  const userId = JSON.parse(localStorage.getItem("userData"))._id;

  const handleSubmitReview = () => {

    if (!reviewText.trim()) {
      return;
    }

    axios
      .post(
        `https://ecommerce-backend-0wr7.onrender.com/ecommerce/product/products/${productId}/reviews/${userId}`,
        { reviewText },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Review added successfully:", response.data);
        onClose();
      })
      .catch((error) => {
        console.log("Error adding review to product:", error);
      });
  };

  return (
    <div className="overlay">
      <div className="dialogue-container">
        <input
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid var(--color-2)",
            borderRadius: "4px",
            fontFamily: "var(--font-rubik)",
          }}
          className="input-box"
          type="text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Enter your review..."
        />

        <button
          style={{
            background: "var(--color-4)",
            color: "black",
            fontWeight: "bold",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontFamily: "var(--font-rubik)",
            marginRight: "10px",
            marginBottom: "5px",
          }}
          className="submit-button"
          onClick={handleSubmitReview}
        >
          Submit Review
        </button>

        <button
          style={{
            background: "var(--color-4)",
            color: "black",
            fontWeight: "bold",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontFamily: "var(--font-rubik)",
            marginRight: "10px",
          }}
          className="submit-button"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddReview;
