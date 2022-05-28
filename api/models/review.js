const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: String,
    description: String,
    cDate: String,
    uDate: String
});

module.exports = mongoose.model("Review",reviewSchema);