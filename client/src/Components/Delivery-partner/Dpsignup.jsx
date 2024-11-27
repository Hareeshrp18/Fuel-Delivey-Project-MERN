import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dpsignupcss.css';

const Dpsignup = () => {
    const [dpname, setDpname] = useState('');
    const [email, setEmail] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [vehicleno, setVehicleno] = useState('');
    const [dplocation, setDplocation] = useState('');
    const [errors, setErrors] = useState({});
    const [existingAccountError, setExistingAccountError] = useState('');
    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Username validation
        const usernamePattern = /^[a-zA-Z0-9_]{3,}$/; // At least 3 characters, letters, numbers, underscores
        if (!dpname) {
            isValid = false;
            tempErrors['dpname'] = 'Username is required';
        } else if (!usernamePattern.test(dpname)) {
            isValid = false;
            tempErrors['dpname'] = 'Username is not valid';
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

        // Mobile number validation (Indian mobile number format)
        const mobilePattern = /^[6-9]\d{9}$/;
        if (!mobileno) {
            isValid = false;
            tempErrors['mobileno'] = 'Mobile number is required';
        } else if (!mobilePattern.test(mobileno)) {
            isValid = false;
            tempErrors['mobileno'] = 'Mobile number is not valid';
        }

        // Vehicle number validation
        const vehiclePattern = /^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/;
        if (!vehicleno) {
            isValid = false;
            tempErrors['vehicleno'] = 'Vehicle number is required';
        } else if (!vehiclePattern.test(vehicleno)) {
            isValid = false;
            tempErrors['vehicleno'] = 'Vehicle number is not valid';
        }

        // Location validation
        if (!dplocation) {
            isValid = false;
            tempErrors['dplocation'] = 'Location is required';
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            axios.post('http://localhost:3001/dpsignup', { dpname, email, mobileno, vehicleno, dplocation })
                .then(result => {
                    console.log(result);
                    navigate("/dplogin");
                })
                .catch(err => {
                    if (err.response && err.response.status === 400) {
                        setExistingAccountError('User already has an account.');
                    } else {
                        console.log(err);
                    }
                });
        }
    };

    return (
        <div className="container">
            <div className="signup-page">
                <h1>Delivery Partner Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="dpname">Username</label>
                    <input
                        type="text"
                        id="dpname"
                        name="dpname"
                        value={dpname}
                        onChange={(e) => setDpname(e.target.value)}
                        required
                    />
                    {errors.dpname && <span className="error">{errors.dpname}</span>}
                    
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
                    
                    <label htmlFor="mobileno">Mobile No</label>
                    <input
                        type="number"
                        id="mobileno"
                        name="mobileno"
                        value={mobileno}
                        onChange={(e) => setMobileno(e.target.value)}
                        required
                    />
                    {errors.mobileno && <span className="error">{errors.mobileno}</span>}
                    
                    <label htmlFor="vehicleno">Vehicle No</label>
                    <input
                        type="text"
                        id="vehicleno"
                        name="vehicleno"
                        value={vehicleno}
                        onChange={(e) => setVehicleno(e.target.value)}
                        required
                    />
                    {errors.vehicleno && <span className="error">{errors.vehicleno}</span>}
                    
                    <label htmlFor="dplocation">Location</label>
                    <input
                        type="text"
                        id="dplocation"
                        name="dplocation"
                        value={dplocation}
                        onChange={(e) => setDplocation(e.target.value)}
                        required
                    />
                    {errors.dplocation && <span className="error">{errors.dplocation}</span>}
                    
                    {existingAccountError && <span className="error">{existingAccountError}</span>}

                    <input type="submit" value="Sign Up" />
                    <p>
                        Already have an account? <Link to="/dplogin">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Dpsignup;
