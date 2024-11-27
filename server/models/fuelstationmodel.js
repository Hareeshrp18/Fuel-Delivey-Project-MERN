const mongoose = require('mongoose');

const Fssignupschema = new mongoose.Schema({
    stationName: { type: String, required: true },
    ownerName: { type: String, required: true },
    location: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
});

const FssignupModel = mongoose.model("fuelstations", Fssignupschema);

module.exports = FssignupModel;
