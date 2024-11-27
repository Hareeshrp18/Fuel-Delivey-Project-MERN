const mongoose = require('mongoose');

const Orderschema = new mongoose.Schema({
    fueltype: { type: String, required: true },
    quantity: { type: String, required: true },   
    deliverylocation: { type: String, required: true },
    totalamount: { type: Number, required: true },
});

const OrderModel = mongoose.model('orders', Orderschema);

module.exports = OrderModel;
