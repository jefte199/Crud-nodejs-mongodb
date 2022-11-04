const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    token_bot: String,
    product: Array,
})

const users = mongoose.model('users', userSchema)

module.exports = { users }; 
