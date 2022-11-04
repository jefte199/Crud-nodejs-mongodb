const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    product: String,
    token_bot: Array,
})

const products = mongoose.model('products', DataSchema)

module.exports = { products }; 
