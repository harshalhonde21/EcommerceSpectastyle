import { Fragment, useState } from "react";
import axios from "axios";
import "../CSS/PlaceOrder.css";

const PlaceOrder = () => {
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    pincode: "",
    phoneNumber: "",
    country: "",
    state: "",
  });

  const countries = ["Country1", "Country2", "Country3"];

  const stateData = {
    Country1: ["State1", "State2", "State3"],
    Country2: ["State2-1", "State2-2", "State2-3"],
    Country3: ["State3-1", "State3-2", "State3-2"],
  };

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setFormData({ ...formData, country: selectedCountry, state: "" });
  };

  const handleStateChange = (event) => {
    setFormData({ ...formData, state: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;
    console.log("user id is", userId)
    console.log(formData)

    try {
      const apiUrl = `http://localhost:5500/ecommerce/user-address/addAddress/${userId}`; // Replace with your API endpoint
      const response = await axios.post(apiUrl, formData);
     

      if (response.status === 201) {
        console.log("Address added successfully!");
        // You can handle success as needed, e.g., redirect to a success page.
      } else {
        console.error("Error adding address.");
        // Handle errors here, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Clear the form after submission
    setFormData({
      address: "",
      city: "",
      pincode: "",
      phoneNumber: "",
      country: "",
      state: "",
    });
  };

  return (
    <Fragment>
      <div className="PlaceOrder-outer-container">
        <h1>Place Order</h1>
        <form className="form-submit" onSubmit={handleSubmit}>
          <input
            style={{
              width: "100%",
              border: "3px solid rgb(189, 224, 254)",
              borderRadius: "5px",
            }}
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />

          <input
            style={{
              width: "100%",
              border: "3px solid rgb(189, 224, 254)",
              borderRadius: "5px",
            }}
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />

          <input
            style={{
              width: "100%",
              border: "3px solid rgb(189, 224, 254)",
              borderRadius: "5px",
            }}
            type="text"
            placeholder="Pin Code"
            value={formData.pincode}
            onChange={(e) =>
              setFormData({ ...formData, pincode: e.target.value })
            }
            required
          />

          <input
            style={{
              width: "100%",
              border: "3px solid rgb(189, 224, 254)",
              borderRadius: "5px",
            }}
            type="tel"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
            required
          />

          <select
            value={formData.country}
            onChange={handleCountryChange}
            required
          >
            <option value="" disabled>
              Select Country
            </option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>

          {formData.country && (
            <select
              value={formData.state}
              onChange={handleStateChange}
              required
            >
              <option value="" disabled>
                Select State
              </option>
              {stateData[formData.country].map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          )}

          <button id="btn-order" type="submit">
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default PlaceOrder;
