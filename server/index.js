const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UsersignupModel = require('./models/usersigupmodel');
const FssignupModel = require('./models/fuelstationmodel');
const DpsignupModel = require('./models/dpmodel');
const OrderModel = require('./models/ordermodel');
const app = express();
const port = 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
     
mongoose.connect('mongodb://localhost:27017/FuelDelivery')
    .then(() => {
        console.log('MongoDB connected');
    }).catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.post('/usersignup', async (req, res) => {
        try {
            console.log('Signup request received:', req.body);
            const existingUser = await UsersignupModel.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already has an account.' });
            }
            const newUser = new UsersignupModel(req.body);
            await newUser.save();
            res.status(201).json(newUser);
        } catch (err) {
            console.error('Error during signup:', err);
            res.status(500).json({ message: 'Internal Server Error', error: err });
        }
    });

// User login
app.post('/userlogin', async (req, res) => {
    const user = await UsersignupModel.find({ username: req.body.username, mobileno: req.body.mobileno });
    console.log(req.body);
    console.log(user);
    res.json(user);
});

    

// Get user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await UsersignupModel.findById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error("Error fetching user:", err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
});


// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await UsersignupModel.find();
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
});


// Fuel station signup
app.post('/fssignup', async (req, res) => { 
    try { 
         console.log('Fuel Station Signup request received:', req.body);
         const existingStation = await FssignupModel.findOne({ email: req.body.email }); 
         if (existingStation) 
        { 
            return res.status(400).json({ message: 'Fuel station already has an account.' }); 
        } 
        const newStation = new FssignupModel(req.body); 
        await newStation.save();
        res.status(201).json(newStation); 
    }
     catch (err) { 
        console.error('Error during fuel station signup:', err); 
        res.status(500).json({ message: 'Internal Server Error', error: err });
    } 
});

// Delivery partner signup
app.post('/dpsignup', async (req, res) => { 
    try { 
        console.log('Delivery Partner Signup request received:', req.body); 
        const existingPartner = await DpsignupModel.findOne({ email: req.body.email }); 
        if (existingPartner) { 
            return res.status(400).json({ message: 'User already has an account.' });
         }
          const newPartner = new DpsignupModel(req.body);
           await newPartner.save(); 
           res.status(201).json(newPartner);
         }
         catch (err) { 
            console.error('Error during delivery partner signup:', err);
            res.status(500).json({ message: 'Internal Server Error', error: err });
         } });
     
// Place a new order
app.post('/orders', async (req, res) => {
    try {
        const newOrder = new OrderModel(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
});

// Get all orders or filter by status
app.get('/orders', async (req, res) => {
    try {
        const { status } = req.query;
        const orders = status ? await OrderModel.find({ status }) : await OrderModel.find();
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
});



// Update order status
app.put('/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const order = await OrderModel.findByIdAndUpdate(id, { status }, { new: true });
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        console.error('Error updating order:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
});



// Delete an order
app.delete('/orders/:id', async (req, res) => {
    try {
        await OrderModel.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting order:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
});

// Delivery partner login
app.post('/dplogin', async (req, res) => {
    const dpartner = await DpsignupModel.find({ dpname: req.body.dpname, mobileno: req.body.mobileno });
    console.log(req.body);
    console.log(dpartner);
    res.json(dpartner);
});


// Get all users
app.get('/userlogin', async (req, res) => {
    try {
        const users = await UsersignupModel.find();
        res.status(200).json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ message: "Internal Server Error", error: err });
    }
});


// Fuel station login
app.post('/fslogin', async (req, res) => {
    try {
        const station = await FssignupModel.findOne({ ownerName: req.body.ownerName, contactNumber: req.body.contactNumber });
        if (station) {
            res.json(station);
        } else {
            res.status(400).json({ message: 'Invalid owner name or contact number' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
