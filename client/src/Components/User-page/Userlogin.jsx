import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Usercsslogin.css';
import axios from 'axios';

const Userlogin = () => {
    const [username, setUsername] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Username validation
        const usernamePattern = /^[a-zA-Z0-9_]{3,}$/; // At least 3 characters, letters, numbers, underscores
        if (!username) {
            isValid = false;
            tempErrors['username'] = 'Username is required';
        } else if (!usernamePattern.test(username)) {
            isValid = false;
            tempErrors['username'] = 'Username is not valid';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const res = await axios.post('http://localhost:3001/userlogin', { username, mobileno });
                if (res.data.length === 0) {
                    alert('Invalid username or mobile number');
                } else {
                    alert('Logged in successfully');
                    navigate("/userdashboard", { state: { userId: res.data[0]._id } }); // Navigate with user ID
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        }
    };

    return (
        <main className='container'>
            <div className="login-page">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        required 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    {errors.username && <span className="error">{errors.username}</span>}
                    
                    <label htmlFor="mobileno">Mobile No</label>
                    <input 
                        type="number" 
                        id="mobileno" 
                        name="mobileno" 
                        required 
                        onChange={(e) => setMobileno(e.target.value)} 
                    />
                    {errors.mobileno && <span className="error">{errors.mobileno}</span>}
                    
                    <input type="submit" value="Login" />
                    <p>
                    Don't have an account? <Link to="/usersignup">Sign up</Link>
                </p>
                </form>
                
            </div>
        </main>
    );
};

export default Userlogin;
