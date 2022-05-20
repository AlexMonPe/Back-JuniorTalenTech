const mongoose = require('mongoose')


// Schema: Data structure of collection Users
const Schema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    role: String
});
const Users = mongoose.model('Users', Schema);
module.exports = Users;
