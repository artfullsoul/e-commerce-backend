const mongoose = require('mongoose');

const  hungarymanSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    phoneNumber:Number,
    location:String,
    cDate: String,
    uDate: String
});
//ordersmodel
//deliveryboymodel
//locationmodel
//resturantwalletmodel

//SUDO CODE
// 1-> Body -> Hungry man ID & Dish ID(ResturantID can be found) & Delivery Boy & Location's of All 3
// 2-> Find out all the parameters which should be passed in body as request
// 3-> Assign order to deliveryBoy
// 4-> Order status.
// 5-> Delivery Boy Status.
// 6-> Adding 10% of price to wallet of returant


module.exports = mongoose.model("Hungryman",hungarymanSchema);