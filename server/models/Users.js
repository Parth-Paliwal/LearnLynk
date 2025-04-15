const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName : String,
    userEmail  : String,
    role : String,
    password : String,
})

module.exports = mongoose.model('User' , UserSchema);