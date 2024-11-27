const mongoose = require('mongoose');

const Usersignupschema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileno: { type: String, required: true },
});

const UsersignupModel = mongoose.model("users", Usersignupschema);

module.exports = UsersignupModel;

