import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './userdashboard.css';

const Userdashboard = () => {
    const [userInfo, setUserInfo] = useState({});
    const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                if (location.state && location.state.userId) {
                    const response = await axios.get(`http://localhost:3001/users/${location.state.userId}`);
                    setUserInfo(response.data);
                } else {
                    console.error('No userId found in location state');
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserInfo();

        const interval = setInterval(() => {
            setCurrentDateTime(new Date().toLocaleString());
            fetchUserInfo();
        }, 5000);

        return () => clearInterval(interval);
    }, [location.state]);

    return (
        <div className="dashboard">
            <h1>User Dashboard</h1>
            <div className="user-info">
                <h2>Profile</h2>
                <p><strong>Name:</strong> {userInfo.username}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
                <p><strong>Phone:</strong> {userInfo.mobileno}</p>
            </div>
            <div className="dashboard-buttons">
                <button onClick={() => navigate('/orderhistory')}>View Order History</button>
                <button onClick={() => navigate('/orderpage')}>Place a New Order</button>
            </div>
            <p><strong>Current Time & Date:</strong> {currentDateTime}</p>
        </div>
    );
};

export default Userdashboard;
