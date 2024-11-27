import React, { useState, useEffect } from 'react';


const FuelOrders = () => {
    const [fuelOrders, setFuelOrders] = useState([
        { id: 1, type: 'Petrol', quantity: 50, customer: 'John Doe' },
        { id: 2, type: 'Diesel', quantity: 100, customer: 'Jane Smith' }
    ]);

    return (
        <div className="fuel-orders">
            <h2>Fuel Orders Received</h2>
            <ul>
                {fuelOrders.map((order) => (
                    <li key={order.id}>
                        <strong>Order ID:</strong> {order.id} <br />
                        <strong>Fuel Type:</strong> {order.type} <br />
                        <strong>Quantity:</strong> {order.quantity} liters <br />
                        <strong>Customer:</strong> {order.customer}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FuelOrders;
