const mongoose = require('mongoose');
        
const  deliveryBoySchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String,
    phoneNumber:Number,
    location:String,
    cDate: String,
    uDate: String
});


module.exports = mongoose.model("DeliveryBoy",deliveryBoySchema);