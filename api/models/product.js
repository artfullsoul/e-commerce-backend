const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    cDate: String,
    uDate: String
});

module.exports = mongoose.model("Product",productSchema);