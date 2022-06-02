const DeliveryBoy = require("../models/DeliveryBoy");
const express = require('express');
const mongoose = require("mongoose");

const assignDeliveryBoy = async(userLocation) => {
    return await DeliveryBoy.findOne({location:userLocation})
        .exec()
        .then(doc => {
            // console.log("DOC > ID IS",doc._id.valueOf());
            if(doc)
                return doc._id.valueOf();
            else
                return null;

        })
        .catch(err => {
            console.log("ERROR AT GET ORDER BY ID",err)
            return null
        });
}
module.exports = assignDeliveryBoy;