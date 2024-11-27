import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const DeliveryPartnerDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:3001/orders');
                setOrders(response.data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();

        const interval = setInterval(() => {
            fetchOrders();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dashboard">
            <h1>Delivery Partner Dashboard</h1>
            <h2>Confirmed Orders</h2>
            {orders.length === 0 ? (
                <p>No Orders Available</p>
            ) : (
                <ul className='listouter'>
                    {orders.map(order => (
                        <li key={order._id} className='listinner'>
                            <strong>Order ID:</strong> {order._id} <br />
                            <strong>Fuel Type:</strong> {order.fueltype} <br />
                            <strong>Quantity:</strong> {order.quantity} liters <br />
                            <strong>Total Amount:</strong> ₹{order.totalamount} <br />
                            <strong>Delivery Location:</strong> {order.deliverylocation} <br />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DeliveryPartnerDashboard;
