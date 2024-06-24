import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "../CSS/PlaceOrder.css";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const PlaceOrder = () => {
  const location = useLocation();
  const totalCartValue = location.state?.totalCartValue;
  const navigate = useNavigate();
  const [userAddresses, setUserAddresses] = useState([]);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    pincode: "",
    phoneNumber: "",
    country: "",
    state: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [updatedFormData, setUpdatedFormData] = useState({});
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);

  const goToOrder = () => {
    toast("Address Selected success!", {
      icon: "😄",
      style: {
        borderRadius: "rgb(189, 224, 254)",
        background: "rgb(70, 11, 70)",
        color: "rgb(255, 210, 255)",
      },
    });
    navigate("/address-payment-placeOrder/confirmOrder", { state: { totalCartValue } });
  };

  const handleCountryChange = (country) => {
    setCountryId(country.id);
    setFormData({ ...formData, country: country.name, state: "", city: "" });
  };

  const handleStateChange = (state) => {
    setStateId(state.id);
    setFormData({ ...formData, state: state.name });
  };

  const handleCityChange = (city) => {
    setFormData({ ...formData, city: city.name });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;

    try {
      const apiUrl = `https://ecommerce-backend-0wr7.onrender.com/ecommerce/user-address/addAddress/${userId}`;
      const response = await axios.post(apiUrl, formData);

      if (response.status === 201) {
        toast("Address Added success! Reload to show to address", {
          icon: "😄",
          style: {
            borderRadius: "rgb(189, 224, 254)",
            background: "rgb(70, 11, 70)",
            color: "rgb(255, 210, 255)",
          },
        });
        fetchUserAddresses();
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

  const handleEditClick = (address) => {
    setEditMode(true);
    setUpdatedFormData({ ...address });
    setSelectedAddressId(address._id);
  };

  const handleSaveClick = async () => {
    if (selectedAddressId) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const userId = userData._id;

      try {
        const apiUrl = `https://ecommerce-backend-0wr7.onrender.com/ecommerce/user-address/updateAddress/${userId}/${selectedAddressId}`;
        const response = await axios.put(apiUrl, updatedFormData);

        if (response.status === 200) {
          toast("Address updated success!", {
            icon: "😄",
            style: {
              borderRadius: "rgb(189, 224, 254)",
              background: "rgb(70, 11, 70)",
              color: "rgb(255, 210, 255)",
            },
          });
          setEditMode(false);
          setSelectedAddressId(null);
          fetchUserAddresses();
        } else {
          console.error("Error updating address.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const deleteAddress = async (addressId) => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;

    try {
      const apiUrl = `https://ecommerce-backend-0wr7.onrender.com/ecommerce/user-address/deleteAddress/${userId}/${addressId}`;
      const response = await axios.delete(apiUrl);

      if (response.status === 200) {
        toast("Address Deleted success!", {
          icon: "😞",
          style: {
            borderRadius: "rgb(189, 224, 254)",
            background: "rgb(70, 11, 70)",
            color: "rgb(255, 210, 255)",
          },
        });
        fetchUserAddresses();
      } else {
        console.error("Error deleting address.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUserAddresses = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userId = userData._id;
    try {
      const apiUrl = `https://ecommerce-backend-0wr7.onrender.com/ecommerce/user-address/getAddresses/${userId}`;
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

          <CountrySelect
            onChange={handleCountryChange}
            placeHolder="Select Country"
          />

          {countryId !== 0 && (
            <StateSelect
              countryid={countryId}
              onChange={handleStateChange}
              placeHolder="Select State"
            />
          )}

          {stateId !== 0 && (
            <CitySelect
              countryid={countryId}
              stateid={stateId}
              onChange={handleCityChange}
              placeHolder="Select City"
            />
          )}

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

          <PhoneInput
            country={'us'}
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            inputStyle={{
              width: "100%",
              border: "3px solid rgb(189, 224, 254)",
              backgroundColor: "rgb(256,212,252)",
              borderRadius: "5px",
            }}
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true
            }}
          />

          <button id="btn-order" type="submit">
            Submit
          </button>
        </form>

        <div className="right-container-dataShow">
          <h1 className="dataShow-heading">Select the Address</h1>
          {userAddresses.map((address, index) => (
            <div className="dataShow-address" key={index}>
              {editMode && selectedAddressId === address._id ? (
                <div>
                  <input
                    style={{ border: "2px solid rgb(70, 11, 70)", width: '100%', marginBottom: '0.5px' }}
                    type="text"
                    value={updatedFormData.address}
                    onChange={(e) =>
                      setUpdatedFormData({
                        ...updatedFormData,
                        address: e.target.value,
                      })
                    }
                  />
                  <input
                    style={{ border: "2px solid rgb(70, 11, 70)", width: '100%', marginBottom: '0.5px' }}
                    type="text"
                    value={updatedFormData.city}
                    onChange={(e) =>
                      setUpdatedFormData({
                        ...updatedFormData,
                        city: e.target.value,
                      })
                    }
                  />
                  <input
                    style={{ border: "2px solid rgb(70, 11, 70)", width: '100%', marginBottom: '0.5px' }}
                    type="text"
                    value={updatedFormData.pincode}
                    onChange={(e) =>
                      setUpdatedFormData({
                        ...updatedFormData,
                        pincode: e.target.value,
                      })
                    }
                  />
                  <PhoneInput
                    country={'us'}
                    value={updatedFormData.phoneNumber}
                    onChange={(value) =>
                      setUpdatedFormData({
                        ...updatedFormData,
                        phoneNumber: value,
                      })
                    }
                    inputStyle={{
                      width: "100%",
                      border: "2px solid rgb(70, 11, 70)",
                      backgroundColor: "rgb(256,212,252)",
                      borderRadius: "5px",
                    }}
                  />
                  <button onClick={handleSaveClick}>Save</button>
                </div>
              ) : (
                <div>
                  <p>Address: {address.address}</p>
                  <p>City: {address.city}</p>
                  <p>Pincode: {address.pincode}</p>
                  <p>Phone Number: {address.phoneNumber}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={() => handleEditClick(address)}>Edit</button>
                    <button onClick={() => deleteAddress(address._id)}>Delete</button>
                    <button onClick={goToOrder}>Select</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default PlaceOrder;
