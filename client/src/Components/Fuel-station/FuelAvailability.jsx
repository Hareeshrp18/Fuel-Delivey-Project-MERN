import React, { useState } from 'react';

const FuelAvailability = () => {
    const [fuelAvailability, setFuelAvailability] = useState([
        { type: 'Petrol', quantity: 1000 },
        { type: 'Diesel', quantity: 500 },
        { type: 'Power Petrol', quantity: 300 }
    ]);

    return (
        <div className="fuel-availability">
            <h2>Fuel Availability</h2>
            <ul>
                {fuelAvailability.map((fuel, index) => (
                    <li key={index}>
                        <strong>{fuel.type}</strong>: {fuel.quantity} liters
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FuelAvailability;
