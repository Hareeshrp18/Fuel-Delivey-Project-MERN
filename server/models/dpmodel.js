const mongoose = require('mongoose');

const Deliverypartnersignupschema = new mongoose.Schema({
    dpname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileno: { type: String, required: true },
    vehicleno: { type: String, required: true },
    dplocation: { type: String, required: true },
});
const DpsignupModel = mongoose.model('dpusers', Deliverypartnersignupschema);

module.exports = DpsignupModel;
