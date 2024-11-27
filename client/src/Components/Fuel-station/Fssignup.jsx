import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Fssignup.css';
import axios from 'axios';

const Fssignup = () => {
    const [stationName, setStationname] = useState('');
    const [ownerName, setOwnername] = useState('');
    const [location, setLocation] = useState('');
    const [contactNumber, setContactnumber] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [existingAccountError, setExistingAccountError] = useState('');
    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Station Name validation
        const stationNamePattern = /^[a-zA-Z0-9-_ ]{3,}$/; 
        if (!stationName) {
            isValid = false;
            tempErrors['stationName'] = 'Station Name is required';
        } else if (!stationNamePattern.test(stationName)) {
            isValid = false;
            tempErrors['stationName'] = 'Station Name is not valid';
        }

        // Owner Name validation
        const ownerNamePattern = /^[a-zA-Z ]{3,}$/; // At least 3 characters, letters, spaces
        if (!ownerName) {
            isValid = false;
            tempErrors['ownerName'] = 'Owner Name is required';
        } else if (!ownerNamePattern.test(ownerName)) {
            isValid = false;
            tempErrors['ownerName'] = 'Owner Name is not valid';
        }

        // Location validation
        const locationPattern = /^[a-zA-Z0-9 ,.-]{3,}$/; // At least 3 characters, letters, numbers, spaces, commas, periods, hyphens
        if (!location) {
            isValid = false;
            tempErrors['location'] = 'Location is required';
        } else if (!locationPattern.test(location)) {
            isValid = false;
            tempErrors['location'] = 'Location is not valid';
        }

        // Contact Number validation (Indian mobile number format)
        const contactNumberPattern = /^[6-9]\d{9}$/;
        if (!contactNumber) {
            isValid = false;
            tempErrors['contactNumber'] = 'Contact Number is required';
        } else if (!contactNumberPattern.test(contactNumber)) {
            isValid = false;
            tempErrors['contactNumber'] = 'Contact Number is not valid';
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            isValid = false;
            tempErrors['email'] = 'Email is required';
        } else if (!emailPattern.test(email)) {
            isValid = false;
            tempErrors['email'] = 'Email is not valid';
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setExistingAccountError('');
        if (validate()) {
            axios.post('http://localhost:3001/fssignup', { stationName, ownerName, location, contactNumber, email })
                .then(result => {
                    console.log(result);
                    navigate("/fslogin");
                })
                .catch(err => {
                    if (err.response && err.response.status === 400) {
                        setExistingAccountError('Account already exist.');
                    } else {
                        console.error(err);
                    }
                });
        }
    };

    return (
        <div className="container">
            <div className="signup-page">
                <h1>Fuel Station Signup</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="stationName">Station Name</label>
                    <input
                        type="text"
                        id="stationName"
                        name="stationName"
                        value={stationName}
                        onChange={(e) => setStationname(e.target.value)}
                        required
                    />
                    {errors.stationName && <span className="error">{errors.stationName}</span>}

                    <label htmlFor="ownerName">Owner Name</label>
                    <input
                        type="text"
                        id="ownerName"
                        name="ownerName"
                        value={ownerName}
                        onChange={(e) => setOwnername(e.target.value)}
                        required
                    />
                    {errors.ownerName && <span className="error">{errors.ownerName}</span>}

                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                    {errors.location && <span className="error">{errors.location}</span>}

                    <label htmlFor="contactNumber">Contact Number</label>
                    <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        value={contactNumber}
                        onChange={(e) => setContactnumber(e.target.value)}
                        required
                    />
                    {errors.contactNumber && <span className="error">{errors.contactNumber}</span>}

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <span className="error">{errors.email}</span>}

                    {existingAccountError && <span className="error">{existingAccountError}</span>}

                    <input type="submit" value="Signup" />
                </form>
                <p>
                    Already have an account? <Link to="/fslogin">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Fssignup;
