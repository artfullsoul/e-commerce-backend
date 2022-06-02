const mongoose = require('mongoose');

const  orderSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orderNumber:String,
    hungryManId:String,
    restrauntId:String,
    dishId:String,
    locationToDeliver:String,
    deliveryBoyId:String,
    status:String,
    cDate: String,
    uDate: String
});


module.exports = mongoose.model("Order",orderSchema);