import React, { Fragment, useState } from 'react';
import "../CSS/PlaceOrder.css";

const PlaceOrder = () => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');

    const countries = ["Country1", "Country2", "Country3"];

    const stateData = {
        Country1: ["State1", "State2", "State3"],
        Country2: ["State2-1", "State2-2", "State2-3"],
        Country3: ["State3-1", "State3-2", "State3-2"],
    };

    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        setCountry(selectedCountry);
        setState('');
    }

    const handleStateChange = (event) => {
        setState(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <Fragment>
            <div className="PlaceOrder-outer-container">
                <h1>Place Order</h1>
                <form className='form-submit' onSubmit={handleSubmit}>
                    <input type="text" style={{width:'100%', border:'3px solid rgb(189, 224, 254)', borderRadius:'5px'}} placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    <input type="text" style={{width:'100%', border:'3px solid rgb(189, 224, 254)', borderRadius:'5px'}} placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                    <input type="text" style={{width:'100%', border:'3px solid rgb(189, 224, 254)', borderRadius:'5px'}} placeholder="Pin Code" value={pinCode} onChange={(e) => setPinCode(e.target.value)} required />
                    <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />

                    <select value={country} onChange={handleCountryChange} required>
                        <option value="" disabled>Select Country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </select>

                    {country && (
                        <select value={state} onChange={handleStateChange} required>
                            <option value="" disabled>Select State</option>
                            {stateData[country].map((state, index) => (
                                <option key={index} value={state}>{state}</option>
                            ))}
                        </select>
                    )}

                    <button id='btn-order' type="submit">Submit</button>
                </form>
            </div>
        </Fragment>
    )
}

export default PlaceOrder;
