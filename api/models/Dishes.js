const mongoose = require('mongoose');

const  dishesSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    dishName:String,
    restrauntId:String,
    dishPrice:Number,
    cDate: String,
    uDate: String
});

module.exports = mongoose.model("Dishes",dishesSchema);