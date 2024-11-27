import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FsLogin.css';
import axios from 'axios';

const Fslogin = () => {
    const [ownerName, setOwnername] = useState('');
    const [contactNumber, setContactnumber] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Owner Name validation (matches signup form)
        const ownerNamePattern = /^[a-zA-Z0-9_]{3,}$/;
        if (!ownerName) {
            isValid = false;
            tempErrors['ownerName'] = 'Owner Name is required';
        } else if (!ownerNamePattern.test(ownerName)) {
            isValid = false;
            tempErrors['ownerName'] = 'Owner Name is not valid';
        }

        // Contact Number validation (matches signup form)
        const contactNumberPattern = /^[6-9]\d{9}$/;
        if (!contactNumber) {
            isValid = false;
            tempErrors['contactNumber'] = 'Contact Number is required';
        } else if (!contactNumberPattern.test(contactNumber)) {
            isValid = false;
            tempErrors['contactNumber'] = 'Contact Number is not valid';
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const res = await axios.post('http://localhost:3001/fslogin', { ownerName, contactNumber });
                if (res.data) {
                    alert('Logged in successfully');
                    navigate('/fuelstationdashboard', { state: { station: res.data } });
                } else {
                    alert('Invalid owner name or contact number');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('Invalid owner name or contact number');
            }
        }
    };

    return (
        <div className="container">
            <div className="login-page">
                <h1>Fuel Station Login</h1>
                <form>
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
                    
                    <label htmlFor="contactNumber">Contact Number</label>
                    <input 
                        type="number" 
                        id="contactNumber" 
                        name="contactNumber" 
                        value={contactNumber}
                        onChange={(e) => setContactnumber(e.target.value)} 
                        required 
                    />
                    {errors.contactNumber && <span className="error">{errors.contactNumber}</span>}
                    
                    <input type="submit" value="Login" onClick={handleSubmit} />
                    <p>
                        Don't have an account? <Link to="/fssignup">Signup</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Fslogin;
