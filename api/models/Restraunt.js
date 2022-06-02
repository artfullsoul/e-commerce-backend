const mongoose = require('mongoose');

const  restrauntSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    restrauntName:String,
    restrauntLocation:String,
    resturantWallet: Number,
    cDate: String,
    uDate: String
});

module.exports = mongoose.model("Restraunt",restrauntSchema);