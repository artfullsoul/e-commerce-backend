const mongoose = require('mongoose');
// const childSchema = mongoose.Schema({
//     _id: mongoose.Schema.Types.ObjectId,
//     fullName:String,
//     DOB:String,
//     admissionForClass: String
// })
const parentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fullName: String,
    phoneNumber: Number,
    emailId: String,
    address: String,
    childData: mongoose.Schema.Types.Mixed,
    // "87/15 Tyagi Road,Dehradun,uttrakhand"
    // Flat No.- H1115, Pura skydale, Silver County Road, near harlur lake, hurlur,bnglore-karnatka -560103
    cDate: String,
    uDate: String
});

module.exports = mongoose.model("Parent",parentSchema);