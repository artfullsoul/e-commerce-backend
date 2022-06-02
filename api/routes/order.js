const express = require('express');
const router = express.Router();
const Order =  require("../models/Order");
const mongoose = require("mongoose");
const getDate = require("../assets/getDate");
const assignDeliveryBoy = require("../assets/assignDeliveryBoy");
const Restraunt = require("../models/Restraunt");
const Dishes = require("../models/Dishes");
router.get('/',(req,res,next) => {
    Order.find()
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log("ERROR AT GET ALL Review",err)
            res.status(500).json({error:err});
        });
    // res.status(200).json({
    //     message:"Handling GET request to /products"
    // })
})
// [
//     {"propName":"name","value":"grapes"}
// ]
router.post('/',async (req,res,next) => {
    //Like here we are able to get data only due to bodyparser
    const finalDate = getDate();
    var deliveryBoyId = await assignDeliveryBoy(req.body.locationToDeliver);
    console.log("DELIVERY BOY ID",deliveryBoyId)
    const order = new Order({
        _id: new mongoose.Types.ObjectId(), 
        orderNumber:req.body.orderNumber,
        hungryManId:req.body.hungryManID,
        restrauntId:req.body.restrauntId,
        dishId:req.body.dishId,
        locationToDeliver: req.body.locationToDeliver,
        deliveryBoyId: deliveryBoyId,
        status: deliveryBoyId === null ? "No Delivery Boy available" : "Order Received",
        cDate:finalDate,
        uDate:finalDate,
    })
    order
        .save()
        .then((result) =>
        {
            console.log(res);
            res.status(200).json({
                message:"Handling POST request to /review",
                review: result
            })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({error:err})
        })
        // res.status(200).json({
        //     message:"Handling POST request to /review",
        //     review: order
        // })
    
})

router.get('/:orderId',(req,res,next) => {
    const id = req.params.orderId;
    Order.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc)
                res.status(200).json(doc);
            else
            res.status(404).json({message:"No valid Product found"});
        })
        .catch(err => {
            console.log("ERROR AT GET ORDER BY ID",err)
            res.status(500).json({error:err});
        });
    // res.status(200).json({
    //     message:"You passed an ID"
    // })
})
router.patch("/:orderId",async (req, res, next) => {
    
    const finalDate = getDate();
    const id = req.params.orderId;
    const updateOps = {};
    var orderDelivered = false;
    for (const ops of req.body) {
        if(ops.propName === "status" && ops.value === "delivered")
          orderDelivered = true;
        updateOps[ops.propName] = ops.value;
    }
    updateOps["uDate"] = finalDate;
    Order.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        console.log(result);
        if(orderDelivered === true)
        {
            console.log("CALLED 1")
            Order.findById(id)
                .exec()
                .then(async doc => {
                    console.log(doc);
                    var dishPrice = null;
                    await Dishes.findById(doc.dishId)
                        .exec()
                        .then(result => {
                            console.log("DISH ",result)
                            dishPrice = result.dishPrice-10;
                        })
                    console.log("DISH PRICE IS ",dishPrice);
                    if(dishPrice !== null)
                        Restraunt.updateOne({ _id: doc.restrauntId }, {
                            resturantWallet: dishPrice
                          })
                          .exec()
                          .then((result) => {
                              console.log("UPDATE Resturant",result)
                          })     
                          .catch((err))
                })
                .catch(err => {
                    console.log("ERROR AT GET ORDER BY ID",err)
                });
        }
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
});
router.delete('/:orderId',(req,res,next) => {
    const id =req.params.orderId;
    Order.remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log("Error while deleting Order",err);
            res.status(500).json({error:err})
        })
    
    // res.status(200).json({
    //     message:"Deleted Order"
    // })
})

module.exports = router;