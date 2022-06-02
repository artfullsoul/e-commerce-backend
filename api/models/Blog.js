const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Title: String,
    Body: String,
    cDate: String,
    uDate: String
});

module.exports = mongoose.model("Blog",blogSchema);