const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    phoneNumber : String,
    address : String,
    email : String,
    profileImage : String
});
module.exports = mongoose.model('User', userSchema)