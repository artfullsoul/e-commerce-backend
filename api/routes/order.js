const express = require('express');
const router =  express.Router();

router.get("/",(req,res,next) => {
    res.status(200).json({
        message:"GET Order Working fine"
    })
})
router.post("/",(req,res,next) => {
    //Like here we are able to get data only due to bodyparser
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message:"Order was created",
        order:order
    })
})
router.get("/:orderId",(req,res,next) => {
    const id = req.params.orderId; 
    res.status(200).json({
        message:"GET Order by Id Working fine",
        id: id
    })
})
router.delete("/:orderId",(req,res,next) => {
    const id = req.params.orderId; 
    res.status(200).json({
        message:"Delete order",
        id: id
    })
})

module.exports = router;