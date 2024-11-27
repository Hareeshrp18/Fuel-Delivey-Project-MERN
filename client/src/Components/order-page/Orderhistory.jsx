import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orderhistory.css';

const Orderhistory = () => {
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get('http://localhost:3001/orders');
                setOrderHistory(response.data);
            } catch (error) {
                console.error("Error fetching order history:", error);
            }
        };

        fetchOrderHistory();
        
        const interval = setInterval(() => {
            fetchOrderHistory();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="order-history-page">
            <h1>Order History</h1>
            {orderHistory.length === 0 ? (
                <div className="noorders"><p className='NoOrder'>No orders Placed</p></div>
            ) : (
                <ul>
                    {orderHistory.map(order => (
                        <li key={order._id} className='listinner'>
                            <strong>Order ID:</strong> {order._id} <br />
                            <strong>Fuel Type:</strong> {order.fueltype} <br />
                            <strong>Quantity:</strong> {order.quantity} liters <br />
                            <strong>Total Amount:</strong> ₹{order.totalamount} <br />
                            <strong>Delivery Location:</strong> {order.deliverylocation} <br />
                            <strong>Order Date:</strong> {new Date(order.date).toLocaleDateString()} <br />
                            <strong>Current Time & Date:</strong> {new Date().toLocaleString()}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Orderhistory;
