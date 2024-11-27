import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Usercsssignup.css';
import axios from 'axios';

const Usersignup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [errors, setErrors] = useState({});
    const [existingAccountError, setExistingAccountError] = useState('');
    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Username validation
        const usernamePattern = /^[a-zA-Z0-9?*-_]{3,}$/; 
        // At least 3 characters, letters, numbers, underscores 
        if (!username)
            { 
                isValid = false; 
                tempErrors['username'] = 'Username is required'; 
            } 
        else if (!usernamePattern.test(username))
             { isValid = false; 
                tempErrors['username'] = 'Username is not valid'; 
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

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            axios.post('http://localhost:3001/usersignup', { username, email, mobileno })
                .then(result => {
                    console.log(result);
                    navigate("/userlogin");
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
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                    {errors.username && <span className="error">{errors.username}</span>}

                    <label htmlFor="email">Email</label>
                    <input type="email" name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                    {errors.email && <span className="error">{errors.email}</span>}

                    <label htmlFor="mobileno">Mobile No</label>
                    <input type="number" name="mobileno"
                        value={mobileno}
                        onChange={(e) => setMobileno(e.target.value)}
                        required />
                    {errors.mobileno && <span className="error">{errors.mobileno}</span>}

                    {existingAccountError && <span className="error">{existingAccountError}</span>}

                    <input type="submit" value="Sign Up"/>
                </form>
                <p>
                    Already have an account? <Link to="/userlogin">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Usersignup;
