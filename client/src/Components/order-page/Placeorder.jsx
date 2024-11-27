import React, { useState, useEffect } from 'react';
import './place-ordercss.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Placeorder = () => {
    const [fueltype, setFueltype] = useState('');
    const [quantity, setQuantity] = useState('');
    const [deliverylocation, setDeliverylocation] = useState('');
    const [totalamount, setTotalamount] = useState(0);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Define prices for different fuel types
    const fuelPrices = {
        petrol: 100,
        powerPetrol: 105,
        diesel: 90,
    };

    useEffect(() => {
        // Calculate the total amount whenever fueltype or quantity changes
        if (fueltype && quantity) {
            setTotalamount(quantity * fuelPrices[fueltype]);
        } else {
            setTotalamount(0);
        }
    }, [fueltype, quantity]);

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Fuel type validation
        if (!fueltype) {
            isValid = false;
            tempErrors['fueltype'] = 'Fuel type is required';
        }

        // Quantity validation (greater than 0)
        const quantityPattern = /^[1-9]\d*$/; // Must be a positive integer
        if (!quantity) {
            isValid = false;
            tempErrors['quantity'] = 'Quantity is required';
        } else if (!quantityPattern.test(quantity)) {
            isValid = false;
            tempErrors['quantity'] = 'Quantity must be a positive number';
        }

        // Delivery location validation
        const locationPattern = /^[a-zA-Z0-9 ,.-]{3,}$/; // At least 3 characters, letters, numbers, spaces, commas, periods, hyphens
        if (!deliverylocation) {
            isValid = false;
            tempErrors['deliverylocation'] = 'Delivery location is required';
        } else if (!locationPattern.test(deliverylocation)) {
            isValid = false;
            tempErrors['deliverylocation'] = 'Delivery location is not valid';
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const order = {
                id: new Date().getTime().toString(), // Ensure unique ID
                fueltype,
                quantity,
                deliverylocation,
                totalamount,
                date: new Date().toISOString(),
            };

            axios.post('http://localhost:3001/orders', order)
                .then(result => {
                    console.log(result);
                    navigate('/orderresult', { state: { order } });
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <div className="container">
        <div className="order-page">
            <h1>Place Your Order</h1>
            <form>
                <label htmlFor="fueltype">Fuel Type</label>
                <select
                    id="fueltype"
                    name="fueltype"
                    onChange={(e) => setFueltype(e.target.value)}
                    required
                >
                    <option value="">Select Fuel Type</option>
                    <option value="petrol">Petrol</option>
                    <option value="powerPetrol">Power Petrol</option>
                    <option value="diesel">Diesel</option>
                </select>
                {errors.fueltype && <span className="error">{errors.fueltype}</span>}
                
                <label htmlFor="quantity">Quantity (liters)</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
                {errors.quantity && <span className="error">{errors.quantity}</span>}
                
                <label htmlFor="deliverylocation">Delivery Location</label>
                <input
                    type="text"
                    id="deliverylocation"
                    name="deliverylocation"
                    onChange={(e) => setDeliverylocation(e.target.value)}
                    required
                />
                {errors.deliverylocation && <span className="error">{errors.deliverylocation}</span>}
                
                <p className='totalAmount'>Total Amount: ₹{totalamount}</p>
                
                <input type="submit" value="Place Order" onClick={handleSubmit} />
            </form>
        </div>
        </div>
    );
};

export default Placeorder;
