import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderResult.css';

const Orderresult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;

    if (!state || !state.order) {
        return (
            <div className="order-result">
                <h1>Order Result</h1>
                <p>No order details available.</p>
            </div>
        );
    }

    const { order } = state;

    return (
        <div className="order-result">
            <h1>Order Placed Successfully!</h1>
            <div className="order-details">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Fuel Type:</strong> {order.fueltype}</p>
                <p><strong>Quantity:</strong> {order.quantity} liters</p>
                <p><strong>Total Amount:</strong> ₹{order.totalamount}</p>
                <p><strong>Delivery Location:</strong> {order.deliverylocation}</p>
                <p><strong>Order Date:</strong> {new Date(order.date).toLocaleString()}</p>
            </div>
            <button onClick={() => navigate('/userdashboard')}>Back to Dashboard</button>
        </div>
    );
};

export default Orderresult;
