import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const FuelStationDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [fuelAvailability, setFuelAvailability] = useState({
        petrol: 1000,
        diesel: 500,
        powerPetrol: 300
    });
    const location = useLocation();
    const { station } = location.state;

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

    const updateOrderStatus = async (orderId, status) => {
        console.log(`Updating order ${orderId} to ${status}`); // Debugging log
        try {
            const response = await axios.put(`http://localhost:3001/orders/${orderId}`, { status });
            console.log(response.data); // Debugging log
            setOrders(prevOrders => prevOrders.map(order => order._id === orderId ? { ...order, status: response.data.status } : order));
            console.log(`Order ${orderId} updated to ${status}`); // Debugging log
        } catch (error) {
            console.error(`Error updating order status to ${status}:`, error);
        }
    };

    return (
        <div className="dashboard">
            <h1>Fuel Station Dashboard</h1>
            <div className="station-info">
                <h2>Fuel Station Information</h2>
                <p><strong>Owner Name:</strong> {station.ownerName}</p>
                <p><strong>Contact Number:</strong> {station.contactNumber}</p>
                <p><strong>Location:</strong> {station.location}</p>
            </div>
            <div className="fuel-availability">
                <h2>Fuel Availability</h2>
                <p><strong>Petrol:</strong> {fuelAvailability.petrol} liters</p>
                <p><strong>Diesel:</strong> {fuelAvailability.diesel} liters</p>
                <p><strong>Power Petrol:</strong> {fuelAvailability.powerPetrol} liters</p>
            </div>
            <h2>Fuel Orders Received</h2>
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
                            <button onClick={() => updateOrderStatus(order._id, 'Accepted')}>Accept Order</button>
                            <button onClick={() => updateOrderStatus(order._id, 'Rejected')}>Reject Order</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FuelStationDashboard;
