import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import "../CSS/PlaceOrder.css";

const PlaceOrder = () => {

  const navigate = useNavigate();

  const selectNavigate = () => {
    navigate("/address-payment-placeOrder/confirmOrder")
  }

  const [userAddresses, setUserAddresses] = useState([]);
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
      const apiUrl = `http://localhost:5500/ecommerce/user-address/addAddress/${userId}`;
      const response = await axios.post(apiUrl, formData);


      if (response.status === 201) {
        console.log("Address added successfully!");
        navigate('/address-payment-placeOrder/confirmOrder');
      } else {
        console.error("Error adding address.");
      }

    } catch (error) {
      console.error("Error:", error);
    }
    setFormData({
      address: "",
      city: "",
      pincode: "",
      phoneNumber: "",
      country: "",
      state: "",
    });
  };

  // for fetching my address data from mongo cloud

  const fetchUserAddresses = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;
    try {
      const apiUrl = `http://localhost:5500/ecommerce/user-address/getAddresses/${userId}`;
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        setUserAddresses(response.data);
        localStorage.setItem("Address", JSON.stringify(response.data));
      } else {
        console.error("Error fetching addresses.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const deleteAddress = async (addressId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;

    try {
      const apiUrl = `http://localhost:5500/ecommerce/user-address/deleteAddress/${userId}/${addressId}`;
      const response = await axios.delete(apiUrl);

      if (response.status === 200) {
        console.log("Address deleted successfully!");
        fetchUserAddresses();
      } else {
        console.error("Error deleting address.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  return (
    <Fragment>
      <h1 style={{ position: "relative", top: '8rem' }}>Place Order</h1>
      <div className="PlaceOrder-outer-container">
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
        <div className="right-container-dataShow">
          <h1 className="dataShow-heading">Select the Address</h1>
          {userAddresses.map((address, index) => (
            <div className="dataShow-address" key={index}>
              <h5 className="address">Address: {address.address}</h5>
              <h5 className="city">City: {address.city}</h5>
              <h5 className="pinCode">Pin Code: {address.pincode}</h5>
              <h5 className="phoneNumber">Phone Number: {address.phoneNumber}</h5>
              <h5 className="country">Country: {address.country}</h5>
              <h5 className="state">State: {address.state}</h5>
              <button type="submit">Update</button>
              <button
                type="button"
                onClick={() => deleteAddress(address._id)}
              >
                Delete
              </button>
              <button type="submit" onClick={selectNavigate}>Select</button>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default PlaceOrder;
