const mongoose = require('mongoose')


// Schema: Data structure of collection Users
const Schema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: String
});
module.exports.Users = mongoose.model('Users', Schema);

